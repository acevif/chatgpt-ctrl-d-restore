# chatgpt-ctrl-d-restore

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

1. Open `chatgpt-ctrl-d-restore.user.js` locally to install it during development.
2. After publishing the repository, install or update it from:

```text
https://raw.githubusercontent.com/acevif/chatgpt-ctrl-d-restore/main/chatgpt-ctrl-d-restore.user.js
```

Installing from that URL also enables automatic updates in Tampermonkey.

## Scope

This is intentionally small and dependency-free. It only restores `Ctrl-D` on:

- `https://chatgpt.com/*`
- `https://chat.openai.com/*`

## License

MIT
