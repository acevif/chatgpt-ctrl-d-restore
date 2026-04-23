# ChatGPT Ctrl-D restore

Simple userscript to restore normal `Ctrl-D` forward delete behavior on ChatGPT Web.

## Why

On macOS, `Ctrl-D` is a long-standing text-editing shortcut for deleting the character to the right of the caret. On ChatGPT Web, that key combo can trigger ChatGPT's voice input shortcut instead, which breaks the expected behavior while typing.

This userscript:

- runs only on ChatGPT Web
- intercepts `Ctrl-D`
- blocks ChatGPT's voice input shortcut
- performs forward delete in editable fields

## Install

> [!NOTE]
> Make sure [Tampermonkey](https://www.tampermonkey.net/) is already installed.

1. Open the following URL in your browser:
   <https://raw.githubusercontent.com/acevif/chatgpt-ctrl-d-restore/main/chatgpt-ctrl-d-restore.user.js>
2. When Tampermonkey opens the installation page, click `Install`.
3. Reload ChatGPT Web.

Installing from that URL also enables automatic updates in Tampermonkey.

## Scope

This is intentionally small and dependency-free. It only restores `Ctrl-D` on:

- `https://chatgpt.com/*`
- `https://chat.openai.com/*`

## License

MIT
