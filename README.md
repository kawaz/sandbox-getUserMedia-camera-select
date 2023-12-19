# sandbox-getUserMedia-camera-select

ブラウザでカメラを使うサンプル。複数カメラが利用可能な場合はカメラを切り替えられるようにした。

以下は実際に試してみた際のハマりポイントメモ

- パーミッションチェック
- パーミッションが granted になる前だとデバイス一覧の取得が不正確（複数あっても一つだけしか取れない＆デバイスIDやラベルも取れない）なので、パーミッションが granted になったタイミングでデバイス一覧を再取得する必要がある。これは Permission.onchange や MediaDevices.ondevicechange イベントのリスナで行うのが良い。
- パーミッションの取得は実際に getUserMedia を実行することでしか得られないのでリスト取得の為に一度実行することが必要
- 同じデバイスかつactiveなものに対して2度めの getUserMedia を実行するとエラーになるのも多少注意が必要。

## Usage
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
# 以下のようにすればホットリロードが出来る
bun run --hot index.ts
```
