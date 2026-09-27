# Are You Still Online?

一個以「AI 上網交友 → 搜尋訊號 → 失聯」為敘事核心的 Web MV 實驗。

目前 Prototype v0.1：

- 0–11 秒：BOOT / CONNECTING
- 11–26 秒：CHAT
- 26–30 秒：Are you still online?
- 可拖曳時間軸
- 有歌曲時，以 audio.currentTime 作為唯一主時間軸
- 沒有歌曲時，自動切換成 30 秒展示模式

## 本機執行

```bash
npm install
npm run dev
```

歌曲請放在：

```text
public/song.mp3
```

## GitHub Pages

此專案已包含 GitHub Actions 部署流程。

預計網址：

https://twinklestars1029.github.io/Are-You-Still-Online-/

