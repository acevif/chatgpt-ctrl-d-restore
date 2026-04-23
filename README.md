# chatgpt-ctrl-d-restore

Minimal userscript to restore normal `Ctrl-D` forward delete behavior on ChatGPT Web.

## Why

On macOS, `Ctrl-D` is a long-standing text-editing shortcut for deleting the character to the right of the caret. ChatGPT Web intercepts that shortcut, which breaks the expected behavior while typing.

This userscript:

- runs only on ChatGPT Web
- intercepts `Ctrl-D`
- blocks ChatGPT's shortcut
- performs forward delete in editable fields

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. Open `chatgpt-ctrl-d-restore.user.js` locally to install it during development.
3. After publishing the repository, install or update it from:

```text
https://raw.githubusercontent.com/acevif/chatgpt-ctrl-d-restore/main/chatgpt-ctrl-d-restore.user.js
```

## Scope

This is intentionally small and dependency-free. It only restores `Ctrl-D` on:

- `https://chatgpt.com/*`
- `https://chat.openai.com/*`

## License

MIT
