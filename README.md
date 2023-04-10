# chatgpt-test

環境汚したくない人のためにDockerで動くようにしました。

## nodeディレクトリ配下

OpenAIの公式チュートリアルが動きます。

(https://platform.openai.com/docs/quickstart/build-your-application )

`.env.example` を `.env` にリネームし、自分のAPIキーを設定しておいてください。(もちろん直書きしないでOSの環境変数とか使って大丈夫です。)

`./node/` 配下で以下を叩くとNext.jsの開発サーバが動きます。

```
$ make up
```

## ライセンス

OpenAIの公式チュートリアルを含んでいるので、そのへんは公式の言うことに従ってください。

## 権限周り

適当です。よくわからないので調べて直してください。

## Author

アレちゃん
