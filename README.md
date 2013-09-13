jquery.observe.js
=================
##Overview

指定した要素の状態を監視し、変更があった場合「realtimechange」イベントを発生させます。

「$(selector).observe」以下に２つのメソッド「start」「end」を持ち、それぞれで監視を開始・終了します。

## Dependencies

Requires jQuery 1.8.x or higher.

##Usage

###`$.fn.observe`
セレクタで指定した要素の監視を制御するメソッド「start」「end」を保持したオブジェクト
```javascript
var observation = $(selector).observe
```
上記コードのようにobserveオブジェクトを変数に格納して任意のタイミングで監視を開始・終了します。
```javascript
observation.start()
...
observation.end()
```

###`$.fn.observe.start()`
セレクタで指定した要素の監視を開始します。
戻り値はjQueryオブジェクトです。
```javascript
$(selector).observe.start()
```
監視中の要素に変更があった場合、後述の「realtimechange」イベントが発生します。
検知される変更は要素の種類ごとに異なります。

要素の種類 | 検知内容 | 検知に使う関数
--- | --- | ---
input[type=text], textarea | 入力・選択された値 | $.fn.val()
input[type=radio], input[type=chackbox] | 選択・非選択 | $.fn.prop("checked")
other | 内包要素の状態 | $.fn.html()

###`$.fn.observe.end()`
セレクタで指定した要素の監視を終了します。
```javascript
$(selector).observe.end()
```

###Event
監視中に変更が検知された場合、「realtimechange」イベントが発生します。
```javascript
$(selector).on("realtimechange", function(event, previous, current){
  ...
})
```
ハンドラの受け取る引数は3つで、第二引数は変更前の値、第三引数は変更後（現在）の値です。
