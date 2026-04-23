// ==UserScript==
// @name         ChatGPT Ctrl-D restore
// @namespace    https://acevif.github.io
// @version      1.0.2
// @author       acevif
// @description  Restore Ctrl-D forward delete behavior on ChatGPT Web
// @homepageURL  https://github.com/acevif/chatgpt-ctrl-d-restore
// @supportURL   https://github.com/acevif/chatgpt-ctrl-d-restore/issues
// @updateURL    https://raw.githubusercontent.com/acevif/chatgpt-ctrl-d-restore/main/chatgpt-ctrl-d-restore.user.js
// @downloadURL  https://raw.githubusercontent.com/acevif/chatgpt-ctrl-d-restore/main/chatgpt-ctrl-d-restore.user.js
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  function isTextInput(el) {
    return !!el && (
      el.tagName === 'TEXTAREA' ||
      (
        el.tagName === 'INPUT' &&
        /^(text|search|url|tel|password|email|number)$/i.test(el.type || 'text')
      )
    );
  }

  function findEditable(el) {
    if (!el || !(el instanceof Element)) return null;
    if (isTextInput(el)) return el;
    if (el.isContentEditable) return el;
    return el.closest('textarea, input, [contenteditable="true"], [contenteditable="plaintext-only"]');
  }

  function fireInputEvent(el) {
    el.dispatchEvent(new InputEvent('input', {
      bubbles: true,
      cancelable: false,
      inputType: 'deleteContentForward',
      data: null
    }));
  }

  function deleteForwardInTextInput(el) {
    const start = el.selectionStart;
    const end = el.selectionEnd;
    if (start == null || end == null) return;

    if (start !== end) {
      el.setRangeText('', start, end, 'start');
      fireInputEvent(el);
      return;
    }

    if (end >= el.value.length) return;

    el.setRangeText('', start, end + 1, 'start');
    fireInputEvent(el);
  }

  function deleteForwardInContentEditable(el) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    if (!el.contains(sel.anchorNode)) return;

    if (sel.isCollapsed) {
      try {
        sel.modify('extend', 'forward', 'character');
      } catch (_) {
        return;
      }
    }

    if (sel.rangeCount === 0 || sel.isCollapsed) return;

    const range = sel.getRangeAt(0);
    range.deleteContents();
    sel.collapseToStart();
    fireInputEvent(el);
  }

  document.addEventListener('keydown', (e) => {
    if (!(e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'd')) {
      return;
    }

    const target = e.target instanceof Element ? e.target : document.activeElement;
    const el = findEditable(target) || findEditable(document.activeElement);
    if (!el) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    if (isTextInput(el)) {
      deleteForwardInTextInput(el);
    } else {
      deleteForwardInContentEditable(el);
    }
  }, true);
})();
