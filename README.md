# chatgpt-test

環境汚したくない人のためにDockerで動くようにしました。

## nodeディレクトリ配下

OpenAIの公式チュートリアルが動きます。

(https://platform.openai.com/docs/quickstart/build-your-application )

`./node/` 配下で以下を叩くとNext.jsの開発サーバが動きます。

```
$ make up
```

## pythonディレクトリ配下

私が作ったテストアプリが動きます。

`./python/` 配下で以下を叩くとCLIでチャットができるようになります。

```
$ make up
$ make app
```

`make up` するとPython3環境に`openai` ライブラリが `pip install` されます。

ライブラリを追加するときは `requirements.txt` に追記してください。

`make app` すると起動したコンテナに入りPythonアプリケーションに入ります。

コンテナは `-d` で立ち上がっているので使い終わったら以下を叩いておきましょう。

```
$ make down
```

## 後片付け

WSL2ユーザは、Dockerが作ったディレクトリ・ファイルの権限が変なんなります。(Macだと起きないっぽい?)

消せないディレクトリは適当に `sudo chmod 777` してください。

## ライセンス

OpenAIの公式チュートリアルを含んでいるので、そのへんは公式の言うことに従ってください。

## Author

アレちゃん
