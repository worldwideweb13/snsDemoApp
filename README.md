# snsDemoApp

# typeScript

### 概要
* 学習期間: 2022年4月~5月 
* 使用技術: TypeScript, Express, React,
* 使用API: GoogleMapAP

typeScriptの自学習用リポジトリ。"TS-プロジェクト名"でリポジトリを分けて、分野毎の学習しました。

---

### typeScript核学習ファイルの確認事項
* TSを動かす上で必要なnode-moduleは重いので、各プロジェクトファイルから抜いてあります。
対象ファイル直下でnode-moduleをインストールすることで動作確認が取れます。

node-module　のインストール
```
$ npm install
```
typeScript  の全ファイルの変化を監視する（ウォッチモード）
```
$ tsc -w
```

* TS-libs　TS-DemoApp ではwebpackを利用しています。これらのフォルダでは、webpackをインストールしてアプリケーションの実行環境を作っています。`npm install --save @types/google.maps`

* [TS-libs](TS-libs) プロジェクトの実行環境    ※これらのサードパーティライブラリーをインストールした際は、`npm start`でサーバー再起動をかけることで変更が適用されます 
  * [lodash](https://lodash.com/) のインストール　※webpackで利用するため `npm i --save lodash`
  * [@types/lodash](https://www.npmjs.com/package/@types/lodash/) のインストール `npm install --save-dev @types/lodash`
  * [class-transfer](https://www.npmjs.com/package/class-transformer#installation) のインストール
    * `npm install class-transformer --save`
    * `npm install reflect-metadata --save`
  * [class-validator](https://www.npmjs.com/package/class-validator) のインストール `npm install class-validator --save`

* [TS-mapApp](typeScript/TS-mapApp)...キーワード検索でGoogleMapを表示します。GoogleMapAPI,typeScriptで作成しました。
  * 動作をさせる際は、axiosをインストールします。　`npm install --save axios`
  * 型定義`type GoogleGeocrdingResponse = {...}`は、[GoogleMapAPI公式のレスポンス定義](https://developers.google.com/maps/documentation/geocoding/requests-geocoding)を参考に作成
  * [GoogleMapの@types](https://www.npmjs.com/package/@types/google.maps) を使うことでts環境でgooglemap関数の型補完を使えるようになります。

---
### Node.js & Express & typeScript の開発環境作成
ここでは[ts-node](ts-node) の実行環境に必要なパッケージ、サードパーティライブラリーを記載しておく
[本アプリケーション](ts-node)は、ExpressにてCRUD処理を実装したアプリケーションになります。[Postman](https://www.postman.com/)にて動作確認を行いました。

* プロジェクトファイルに package.json の作成 / typeScriptpプロジェクトとして初期化　※ [tsconfig.json](typeScript/ts-node/tsconfig.json) の設定はソース参照。
```
$ npm init
$ tsc --init
```
* expressフレームワーク/ body-parser のインストール　。　　body-parserはexpressサーバーで受け取ったリクエストパラメーターをパースするためのパッケージ
```
$ npm install --save express body-parser
```
* 開発環境で必要なパッケージのインストール nodemon...JSファイルをnode.jsで実行し、ファイルやフォルダの変更を監視。変更があった時にnode.js のアプリケーションサーバーを自動で再起動する（開発の効率化）
* nodemonを利用するにあたりpackage.jsonで追記が必要。詳細は[package.json](typeScript/ts-node/package.json) 参照。 
```
$ npm install --save-dev nodemon
```

* Node.js　express関数、型定義の読み込み　のため@typesをインストール　
```
$ npm install --save-dev @types/node
$ npm install --save-dev @types/express
```

```
$ npm install --save-dev webpack webpack-cli webpack -dev-server typescript ts-loader
```
