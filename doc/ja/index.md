<!---
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
-->

# org.apache.cordova.dialogs

This plugin provides access to some native dialog UI elements.

## インストール

    cordova plugin add org.apache.cordova.dialogs
    

## メソッド

*   `navigator.notification.alert`
*   `navigator.notification.confirm`
*   `navigator.notification.prompt`
*   `navigator.notification.beep`

## navigator.notification.alert

Shows a custom alert or dialog box. Most Cordova implementations use a native dialog box for this feature, but some platforms use the browser's `alert` function, which is typically less customizable.

    navigator.notification.alert(message, alertCallback, [title], [buttonName])
    

*   **メッセージ**: ダイアログ メッセージ。*(文字列)*

*   **alertCallback**: 警告ダイアログが閉じられたときに呼び出すコールバック。*(機能)*

*   **title**: Dialog title. *(String)* (Optional, defaults to `Alert`)

*   **buttonName**: ボタンの名前。*(文字列)*(省略可能、既定値は`OK`)

### 例

    function alertDismissed() {
        // do something
    }
    
    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
    

### サポートされているプラットフォーム

*   アマゾン火 OS
*   アンドロイド
*   ブラックベリー 10
*   Firefox の OS
*   iOS
*   Tizen
*   Windows Phone 7 と 8
*   Windows 8

### Windows Phone 7 と 8 癖

*   組み込みのブラウザー警告がない呼び出しを次のように 1 つをバインドすることができます `alert()` 、グローバル スコープで。
    
        window.alert = navigator.notification.alert;
        

*   両方の `alert` と `confirm` は非ブロッキング呼び出し、結果は非同期的にのみ利用できます。

### Firefox OS Quirks:

Both native-blocking `window.alert()` and non-blocking `navigator.notification.alert()` are available.

## navigator.notification.confirm

Displays a customizable confirmation dialog box.

    navigator.notification.confirm(message, confirmCallback, [title], [buttonLabels])
    

*   **メッセージ**: ダイアログ メッセージ。*(文字列)*

*   **confirmCallback**: インデックス (1、2、または 3) を押されたボタンまたはダイアログ ボックスは、ボタンを押す （0） なしに解雇されたときに呼び出すコールバック。*(機能)*

*   **タイトル**: ダイアログのタイトル。*(文字列)*(省略可能、既定値は`Confirm`)

*   **buttonLabels**: ボタンのラベルを指定する文字列の配列。*(配列)*(省略可能、既定値は [ `OK,Cancel` ])

### confirmCallback

The `confirmCallback` executes when the user presses one of the buttons in the confirmation dialog box.

The callback takes the argument `buttonIndex` *(Number)*, which is the index of the pressed button. Note that the index uses one-based indexing, so the value is `1`, `2`, `3`, etc.

### 例

    function onConfirm(buttonIndex) {
        alert('You selected button ' + buttonIndex);
    }
    
    navigator.notification.confirm(
        'You are the winner!', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Game Over',           // title
        ['Restart','Exit']     // buttonLabels
    );
    

### サポートされているプラットフォーム

*   アマゾン火 OS
*   アンドロイド
*   ブラックベリー 10
*   Firefox の OS
*   iOS
*   Tizen
*   Windows Phone 7 と 8
*   Windows 8

### Windows Phone 7 と 8 癖

*   組み込みブラウザーの機能はありません `window.confirm` が割り当てることによってバインドすることができます。
    
        window.confirm = navigator.notification.confirm;
        

*   呼び出しを `alert` と `confirm` では非ブロッキング、結果は非同期的にのみ使用できます。

### Firefox OS Quirks:

Both native-blocking `window.confirm()` and non-blocking `navigator.notification.confirm()` are available.

## navigator.notification.prompt

Displays a native dialog box that is more customizable than the browser's `prompt` function.

    navigator.notification.prompt(message, promptCallback, [title], [buttonLabels], [defaultText])
    

*   **メッセージ**: ダイアログ メッセージ。*(文字列)*

*   **promptCallback**： ボタンが押されたときに呼び出すコールバック。*(機能)*

*   **タイトル**: *(文字列)* (省略可能、既定値のタイトル] ダイアログ`Prompt`)

*   **buttonLabels**： ボタンを指定する文字列の配列*(配列)* (省略可能、既定値のラベル`["OK","Cancel"]`)

*   **これら**: 既定テキスト ボックスの入力値 ( `String` ) (省略可能、既定: 空の文字列)

### promptCallback

The `promptCallback` executes when the user presses one of the buttons in the prompt dialog box. The `results` object passed to the callback contains the following properties:

*   **buttonIndex**: 押されたボタンのインデックス。*(数)*メモこと、インデックスを使用して 1 ベースのインデックス化、ので、値は `1` 、 `2` 、 `3` 、等。

*   **input1**: プロンプト ダイアログ ボックスに入力したテキスト。*(文字列)*

### 例

    function onPrompt(results) {
        alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
    }
    
    navigator.notification.prompt(
        'Please enter your name',  // message
        onPrompt,                  // callback to invoke
        'Registration',            // title
        ['Ok','Exit'],             // buttonLabels
        'Jane Doe'                 // defaultText
    );
    

### サポートされているプラットフォーム

*   アマゾン火 OS
*   アンドロイド
*   Firefox の OS
*   iOS

### Android の癖

*   Android は最大 3 つのボタンをサポートしているし、それ以上無視します。

*   アンドロイド 3.0 と後、ホロのテーマを使用するデバイスを逆の順序でボタンが表示されます。

### Firefox OS Quirks:

Both native-blocking `window.prompt()` and non-blocking `navigator.notification.prompt()` are available.

## navigator.notification.beep

The device plays a beep sound.

    navigator.notification.beep(times);
    

*   **回**: ビープ音を繰り返す回数。*(数)*

### 例

    // Beep twice!
    navigator.notification.beep(2);
    

### サポートされているプラットフォーム

*   アマゾン火 OS
*   アンドロイド
*   ブラックベリー 10
*   iOS
*   Tizen
*   Windows Phone 7 と 8
*   Windows 8

### Amazon Fire OS Quirks

*   アマゾン火 OS デフォルト**設定/表示 ＆ サウンド**パネルの下に指定した**通知音**を果たしています。

### Android の癖

*   アンドロイド デフォルト**通知着信音****設定/サウンド ＆ ディスプレイ**パネルの下に指定を果たしています。

### Windows Phone 7 と 8 癖

*   コルドバ分布からジェネリック ビープ音ファイルに依存します。

### Tizen の癖

*   Tizen は、メディア API 経由でオーディオ ファイルを再生してビープ音を実装します。

*   ビープ音ファイルする必要があります短いである必要があります、 `sounds` 、アプリケーションのルート ディレクトリのサブディレクトリと命名する必要があります`beep.wav`.