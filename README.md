# snsDemoApp

# typeScript

### 概要
* 学習期間: 2022年4月~5月 
* 使用技術: TypeScript, Express, React,
* 使用API: GoogleMapAP

typeScriptの自学習用リポジトリ。"TS-プロジェクト名"でリポジトリを分けて、分野毎の学習しました。

---

### express環境設定

expressm mongoose(node.jsとmongoDBを連携するためのライブラリー), nodemon　(node.jsサーバーの自動再リロード), helmet(アプリの脆弱性を上げるためのライブラリー) のインストール

```
$ npm i express mongoose nodemon helmet
```

.envファイルに必要な環境変数を設定を記述(mongoDBのパスワードなど)し、.envを読み込むように記述しています。
```
$ npm i env
```


[package.json](package.json)
"scripts"　欄にコードを記述することで`npm run name` で登録名(name)でコマンド実行が可能になる。 
