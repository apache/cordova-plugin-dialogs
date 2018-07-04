<!--
# license: Licensed to the Apache Software Foundation (ASF) under one
#         or more contributor license agreements.  See the NOTICE file
#         distributed with this work for additional information
#         regarding copyright ownership.  The ASF licenses this file
#         to you under the Apache License, Version 2.0 (the
#         "License"); you may not use this file except in compliance
#         with the License.  You may obtain a copy of the License at
#
#           http://www.apache.org/licenses/LICENSE-2.0
#
#         Unless required by applicable law or agreed to in writing,
#         software distributed under the License is distributed on an
#         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#         KIND, either express or implied.  See the License for the
#         specific language governing permissions and limitations
#         under the License.
-->

# cordova-plugin-dialogs

[![Build Status](https://travis-ci.org/apache/cordova-plugin-dialogs.svg)](https://travis-ci.org/apache/cordova-plugin-dialogs)

這個外掛程式提供對一些本機對話方塊使用者介面元素，通過全球 `navigator.notification` 物件的訪問。

雖然該物件附加到全球範圍內 `導航器`，它不可用直到 `deviceready` 事件之後。

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(navigator.notification);
    }
    

## 安裝

    cordova plugin add cordova-plugin-dialogs
    

## 方法

  * `navigator.notification.alert`
  * `navigator.notification.confirm`
  * `navigator.notification.prompt`
  * `navigator.notification.beep`

## navigator.notification.alert

顯示一個自訂的警報或對話方塊框。 大多數的科爾多瓦實現使用本機的對話方塊為此功能，但某些平臺上使用瀏覽器的 `alert` 功能，這是通常不那麼可自訂。

    navigator.notification.alert(message, alertCallback, [title], [buttonName])
    

  * **message**： 消息對話方塊。*（String）*

  * **alertCallback**： 當警報對話方塊的被解雇時要調用的回檔。*（函數）*

  * **title**： 標題對話方塊。*（String）*（可選，預設值為`Alert`)

  * **buttonName**： 按鈕名稱。*（字串）*（可選，預設值為`OK`)

### 示例

    function alertDismissed() {
        // do something
    }
    
    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
    

### 支援的平臺

  * 亞馬遜火 OS
  * Android 系統
  * 黑莓 10
  * 火狐瀏覽器作業系統
  * iOS
  * Tizen
  * Windows Phone 7 和 8
  * Windows 8
  * Windows

### Windows Phone 7 和 8 怪癖

  * 有沒有內置瀏覽器警報，但你可以綁定一個，如下所示調用 `alert()` 在全球範圍內：
    
        window.alert = navigator.notification.alert;
        

  * 兩個 `alert` 和 `confirm` 的非阻塞的調用，其中的結果才是可用的非同步。

### 火狐瀏覽器作業系統怪癖：

本機阻止 `window.alert()` 和非阻塞的 `navigator.notification.alert()` 都可。

### 黑莓 10 怪癖

`navigator.notification.alert ('message'、 confirmCallback、 'title'、 'buttonLabels')` 回檔參數被傳遞的數位 1。

## navigator.notification.confirm

顯示一個可自訂的確認對話方塊。

    navigator.notification.confirm(message, confirmCallback, [title], [buttonLabels])
    

  * **message**： 消息對話方塊。*（String）*

  * **confirmCallback**: 要用索引 （1、 2 或 3） 按下的按鈕，或者在沒有按下按鈕 (0) 駁回了對話方塊中時調用的回檔。*（函數）*

  * **title**： 標題對話方塊。*（字串）*（可選，預設值為`Confirm`)

  * **buttonLabels**： 指定按鈕標籤的字串陣列。*（陣列）*（可選，預設值為 [ `OK,Cancel` ])

### confirmCallback

當使用者按下確認對話方塊中的按鈕之一時，將執行 `confirmCallback`。

回檔需要參數 `buttonIndex` *（編號）*，即按下的按鈕的索引。 請注意索引使用一個基於索引，因此值 `1`、 `2`、 `3` 等。

### 示例

    function onConfirm(buttonIndex) {
        alert('You selected button ' + buttonIndex);
    }
    
    navigator.notification.confirm(
        'You are the winner!', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Game Over',           // title
        ['Restart','Exit']     // buttonLabels
    );
    

### 支援的平臺

  * 亞馬遜火 OS
  * Android 系統
  * 黑莓 10
  * 火狐瀏覽器作業系統
  * iOS
  * Tizen
  * Windows Phone 7 和 8
  * Windows 8
  * Windows

### Windows Phone 7 和 8 怪癖

  * 有沒有內置的瀏覽器功能的 `window.confirm` ，但你可以將它綁定通過分配：
    
        window.confirm = navigator.notification.confirm;
        

  * 調用到 `alert` 和 `confirm` 的非阻塞，所以結果就是只可用以非同步方式。

### Windows 的怪癖

  * 在 Windows8/8.1 它是不可能將超過三個按鈕添加到 MessageDialog 實例。

  * 在 Windows Phone 8.1 它是不可能顯示有超過兩個按鈕的對話方塊。

### 火狐瀏覽器作業系統怪癖：

本機阻止 `window.confirm()` 和非阻塞的 `navigator.notification.confirm()` 都可。

## navigator.notification.prompt

顯示本機的對話方塊，是可定制的比瀏覽器的 `prompt` 功能。

    navigator.notification.prompt(message, promptCallback, [title], [buttonLabels], [defaultText],[options])
    

  * **message**： 消息對話方塊。*（String）*

  * **promptCallback**： 要用指數 （1、 2 或 3） 按下的按鈕或對話方塊中解雇無 (0) 按下一個按鈕時調用的回檔。*（函數）*

  * **title**： 標題對話方塊。*（String）*（可選，預設值為`Alert`)

  * **buttonLabels**： 指定按鈕標籤 (可選，預設值為 `["OK"，"Cancel"]` *（陣列）* 的字串陣列)

  * **defaultText**: 預設文字方塊中輸入值 （`字串`） (可選，預設值： 空字串）
  
  * **options**: 只支持android<br/>
     {<br/>
      　placeholder:"提示"    --提示文字,<br/> 
      　placeholderColor:"#FFFFFF"    --提示文字颜色<br/> 
      　intDigits:2,整数位长度<br/>
      　decimalDigits:小数位长度<br/>
      　autofocus:true 是否自动弹出键盘<br/>
      　inputType:0输入框类型<br/>
     }
     
### inputType 
使用android的InputType
```Java
  /**
     * Mask of bits that determine the overall class
     * of text being given.  Currently supported classes are:
     * {@link #TYPE_CLASS_TEXT}, {@link #TYPE_CLASS_NUMBER},
     * {@link #TYPE_CLASS_PHONE}, {@link #TYPE_CLASS_DATETIME}.
     * <p>IME authors: If the class is not one you
     * understand, assume {@link #TYPE_CLASS_TEXT} with NO variation
     * or flags.<p>
     */
    public static final int TYPE_MASK_CLASS = 0x0000000f;

    /**
     * Mask of bits that determine the variation of
     * the base content class.
     */
    public static final int TYPE_MASK_VARIATION = 0x00000ff0;

    /**
     * Mask of bits that provide addition bit flags
     * of options.
     */
    public static final int TYPE_MASK_FLAGS = 0x00fff000;

    /**
     * Special content type for when no explicit type has been specified.
     * This should be interpreted to mean that the target input connection
     * is not rich, it can not process and show things like candidate text nor
     * retrieve the current text, so the input method will need to run in a
     * limited "generate key events" mode, if it supports it. Note that some
     * input methods may not support it, for example a voice-based input
     * method will likely not be able to generate key events even if this
     * flag is set.
     */
    public static final int TYPE_NULL = 0x00000000;

    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------

    /**
     * Class for normal text.  This class supports the following flags (only
     * one of which should be set):
     * {@link #TYPE_TEXT_FLAG_CAP_CHARACTERS},
     * {@link #TYPE_TEXT_FLAG_CAP_WORDS}, and.
     * {@link #TYPE_TEXT_FLAG_CAP_SENTENCES}.  It also supports the
     * following variations:
     * {@link #TYPE_TEXT_VARIATION_NORMAL}, and
     * {@link #TYPE_TEXT_VARIATION_URI}.  If you do not recognize the
     * variation, normal should be assumed.
     */
    public static final int TYPE_CLASS_TEXT = 0x00000001;

    /**
     * Flag for {@link #TYPE_CLASS_TEXT}: capitalize all characters.  Overrides
     * {@link #TYPE_TEXT_FLAG_CAP_WORDS} and
     * {@link #TYPE_TEXT_FLAG_CAP_SENTENCES}.  This value is explicitly defined
     * to be the same as {@link TextUtils#CAP_MODE_CHARACTERS}. Of course,
     * this only affects languages where there are upper-case and lower-case letters.
     */
    public static final int TYPE_TEXT_FLAG_CAP_CHARACTERS = 0x00001000;

    /**
     * Flag for {@link #TYPE_CLASS_TEXT}: capitalize the first character of
     * every word.  Overrides {@link #TYPE_TEXT_FLAG_CAP_SENTENCES}.  This
     * value is explicitly defined
     * to be the same as {@link TextUtils#CAP_MODE_WORDS}. Of course,
     * this only affects languages where there are upper-case and lower-case letters.
     */
    public static final int TYPE_TEXT_FLAG_CAP_WORDS = 0x00002000;

    /**
     * Flag for {@link #TYPE_CLASS_TEXT}: capitalize the first character of
     * each sentence.  This value is explicitly defined
     * to be the same as {@link TextUtils#CAP_MODE_SENTENCES}. For example
     * in English it means to capitalize after a period and a space (note that other
     * languages may have different characters for period, or not use spaces,
     * or use different grammatical rules). Of course,
     * this only affects languages where there are upper-case and lower-case letters.
     */
    public static final int TYPE_TEXT_FLAG_CAP_SENTENCES = 0x00004000;

    /**
     * Flag for {@link #TYPE_CLASS_TEXT}: the user is entering free-form
     * text that should have auto-correction applied to it. Without this flag,
     * the IME will not try to correct typos. You should always set this flag
     * unless you really expect users to type non-words in this field, for
     * example to choose a name for a character in a game.
     * Contrast this with {@link #TYPE_TEXT_FLAG_AUTO_COMPLETE} and
     * {@link #TYPE_TEXT_FLAG_NO_SUGGESTIONS}:
     * {@code TYPE_TEXT_FLAG_AUTO_CORRECT} means that the IME will try to
     * auto-correct typos as the user is typing, but does not define whether
     * the IME offers an interface to show suggestions.
     */
    public static final int TYPE_TEXT_FLAG_AUTO_CORRECT = 0x00008000;

    /**
     * Flag for {@link #TYPE_CLASS_TEXT}: the text editor (which means
     * the application) is performing auto-completion of the text being entered
     * based on its own semantics, which it will present to the user as they type.
     * This generally means that the input method should not be showing
     * candidates itself, but can expect the editor to supply its own
     * completions/candidates from
     * {@link android.view.inputmethod.InputMethodSession#displayCompletions
     * InputMethodSession.displayCompletions()} as a result of the editor calling
     * {@link android.view.inputmethod.InputMethodManager#displayCompletions
     * InputMethodManager.displayCompletions()}.
     * Note the contrast with {@link #TYPE_TEXT_FLAG_AUTO_CORRECT} and
     * {@link #TYPE_TEXT_FLAG_NO_SUGGESTIONS}:
     * {@code TYPE_TEXT_FLAG_AUTO_COMPLETE} means the editor should show an
     * interface for displaying suggestions, but instead of supplying its own
     * it will rely on the Editor to pass completions/corrections.
     */
    public static final int TYPE_TEXT_FLAG_AUTO_COMPLETE = 0x00010000;

    /**
     * Flag for {@link #TYPE_CLASS_TEXT}: multiple lines of text can be
     * entered into the field.  If this flag is not set, the text field
     * will be constrained to a single line. The IME may also choose not to
     * display an enter key when this flag is not set, as there should be no
     * need to create new lines.
     */
    public static final int TYPE_TEXT_FLAG_MULTI_LINE = 0x00020000;

    /**
     * Flag for {@link #TYPE_CLASS_TEXT}: the regular text view associated
     * with this should not be multi-line, but when a fullscreen input method
     * is providing text it should use multiple lines if it can.
     */
    public static final int TYPE_TEXT_FLAG_IME_MULTI_LINE = 0x00040000;

    /**
     * Flag for {@link #TYPE_CLASS_TEXT}: the input method does not need to
     * display any dictionary-based candidates. This is useful for text views that
     * do not contain words from the language and do not benefit from any
     * dictionary-based completions or corrections. It overrides the
     * {@link #TYPE_TEXT_FLAG_AUTO_CORRECT} value when set.
     * Please avoid using this unless you are certain this is what you want.
     * Many input methods need suggestions to work well, for example the ones
     * based on gesture typing. Consider clearing
     * {@link #TYPE_TEXT_FLAG_AUTO_CORRECT} instead if you just do not
     * want the IME to correct typos.
     * Note the contrast with {@link #TYPE_TEXT_FLAG_AUTO_CORRECT} and
     * {@link #TYPE_TEXT_FLAG_AUTO_COMPLETE}:
     * {@code TYPE_TEXT_FLAG_NO_SUGGESTIONS} means the IME should never
     * show an interface to display suggestions. Most IMEs will also take this to
     * mean they should not try to auto-correct what the user is typing.
     */
    public static final int TYPE_TEXT_FLAG_NO_SUGGESTIONS = 0x00080000;

    // ----------------------------------------------------------------------

    /**
     * Default variation of {@link #TYPE_CLASS_TEXT}: plain old normal text.
     */
    public static final int TYPE_TEXT_VARIATION_NORMAL = 0x00000000;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering a URI.
     */
    public static final int TYPE_TEXT_VARIATION_URI = 0x00000010;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering an e-mail address.
     */
    public static final int TYPE_TEXT_VARIATION_EMAIL_ADDRESS = 0x00000020;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering the subject line of
     * an e-mail.
     */
    public static final int TYPE_TEXT_VARIATION_EMAIL_SUBJECT = 0x00000030;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering a short, possibly informal
     * message such as an instant message or a text message.
     */
    public static final int TYPE_TEXT_VARIATION_SHORT_MESSAGE = 0x00000040;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering the content of a long, possibly
     * formal message such as the body of an e-mail.
     */
    public static final int TYPE_TEXT_VARIATION_LONG_MESSAGE = 0x00000050;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering the name of a person.
     */
    public static final int TYPE_TEXT_VARIATION_PERSON_NAME = 0x00000060;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering a postal mailing address.
     */
    public static final int TYPE_TEXT_VARIATION_POSTAL_ADDRESS = 0x00000070;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering a password.
     */
    public static final int TYPE_TEXT_VARIATION_PASSWORD = 0x00000080;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering a password, which should
     * be visible to the user.
     */
    public static final int TYPE_TEXT_VARIATION_VISIBLE_PASSWORD = 0x00000090;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering text inside of a web form.
     */
    public static final int TYPE_TEXT_VARIATION_WEB_EDIT_TEXT = 0x000000a0;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering text to filter contents
     * of a list etc.
     */
    public static final int TYPE_TEXT_VARIATION_FILTER = 0x000000b0;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering text for phonetic
     * pronunciation, such as a phonetic name field in contacts. This is mostly
     * useful for languages where one spelling may have several phonetic
     * readings, like Japanese.
     */
    public static final int TYPE_TEXT_VARIATION_PHONETIC = 0x000000c0;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering e-mail address inside
     * of a web form.  This was added in
     * {@link android.os.Build.VERSION_CODES#HONEYCOMB}.  An IME must target
     * this API version or later to see this input type; if it doesn't, a request
     * for this type will be seen as {@link #TYPE_TEXT_VARIATION_EMAIL_ADDRESS}
     * when passed through {@link android.view.inputmethod.EditorInfo#makeCompatible(int)
     * EditorInfo.makeCompatible(int)}.
     */
    public static final int TYPE_TEXT_VARIATION_WEB_EMAIL_ADDRESS = 0x000000d0;

    /**
     * Variation of {@link #TYPE_CLASS_TEXT}: entering password inside
     * of a web form.  This was added in
     * {@link android.os.Build.VERSION_CODES#HONEYCOMB}.  An IME must target
     * this API version or later to see this input type; if it doesn't, a request
     * for this type will be seen as {@link #TYPE_TEXT_VARIATION_PASSWORD}
     * when passed through {@link android.view.inputmethod.EditorInfo#makeCompatible(int)
     * EditorInfo.makeCompatible(int)}.
     */
    public static final int TYPE_TEXT_VARIATION_WEB_PASSWORD = 0x000000e0;

    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------

    /**
     * Class for numeric text.  This class supports the following flags:
     * {@link #TYPE_NUMBER_FLAG_SIGNED} and
     * {@link #TYPE_NUMBER_FLAG_DECIMAL}.  It also supports the following
     * variations: {@link #TYPE_NUMBER_VARIATION_NORMAL} and
     * {@link #TYPE_NUMBER_VARIATION_PASSWORD}.
     * <p>IME authors: If you do not recognize
     * the variation, normal should be assumed.</p>
     */
    public static final int TYPE_CLASS_NUMBER = 0x00000002;

    /**
     * Flag of {@link #TYPE_CLASS_NUMBER}: the number is signed, allowing
     * a positive or negative sign at the start.
     */
    public static final int TYPE_NUMBER_FLAG_SIGNED = 0x00001000;

    /**
     * Flag of {@link #TYPE_CLASS_NUMBER}: the number is decimal, allowing
     * a decimal point to provide fractional values.
     */
    public static final int TYPE_NUMBER_FLAG_DECIMAL = 0x00002000;

    // ----------------------------------------------------------------------

    /**
     * Default variation of {@link #TYPE_CLASS_NUMBER}: plain normal
     * numeric text.  This was added in
     * {@link android.os.Build.VERSION_CODES#HONEYCOMB}.  An IME must target
     * this API version or later to see this input type; if it doesn't, a request
     * for this type will be dropped when passed through
     * {@link android.view.inputmethod.EditorInfo#makeCompatible(int)
     * EditorInfo.makeCompatible(int)}.
     */
    public static final int TYPE_NUMBER_VARIATION_NORMAL = 0x00000000;

    /**
     * Variation of {@link #TYPE_CLASS_NUMBER}: entering a numeric password.
     * This was added in {@link android.os.Build.VERSION_CODES#HONEYCOMB}.  An
     * IME must target this API version or later to see this input type; if it
     * doesn't, a request for this type will be dropped when passed
     * through {@link android.view.inputmethod.EditorInfo#makeCompatible(int)
     * EditorInfo.makeCompatible(int)}.
     */
    public static final int TYPE_NUMBER_VARIATION_PASSWORD = 0x00000010;

    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------

    /**
     * Class for a phone number.  This class currently supports no variations
     * or flags.
     */
    public static final int TYPE_CLASS_PHONE = 0x00000003;

    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------

    /**
     * Class for dates and times.  It supports the
     * following variations:
     * {@link #TYPE_DATETIME_VARIATION_NORMAL}
     * {@link #TYPE_DATETIME_VARIATION_DATE}, and
     * {@link #TYPE_DATETIME_VARIATION_TIME}.
     */
    public static final int TYPE_CLASS_DATETIME = 0x00000004;

    /**
     * Default variation of {@link #TYPE_CLASS_DATETIME}: allows entering
     * both a date and time.
     */
    public static final int TYPE_DATETIME_VARIATION_NORMAL = 0x00000000;

    /**
     * Default variation of {@link #TYPE_CLASS_DATETIME}: allows entering
     * only a date.
     */
    public static final int TYPE_DATETIME_VARIATION_DATE = 0x00000010;

    /**
     * Default variation of {@link #TYPE_CLASS_DATETIME}: allows entering
     * only a time.
     */
    public static final int TYPE_DATETIME_VARIATION_TIME = 0x00000020;
```

### promptCallback

當使用者按下其中一個提示對話方塊中的按鈕時，將執行 `promptCallback`。傳遞給回檔的 `results` 物件包含以下屬性：

  * **buttonIndex**： 按下的按鈕的索引。*（數）*請注意索引使用一個基於索引，因此值 `1`、 `2`、 `3` 等。

  * **input1**： 在提示對話方塊中輸入的文本。*（字串）*

### 示例

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
    

### 支援的平臺

  * 亞馬遜火 OS
  * Android 系統
  * 火狐瀏覽器作業系統
  * iOS
  * Windows Phone 7 和 8
  * Windows 8
  * Windows

### Android 的怪癖

  * Android 支援最多的三個按鈕，並忽略任何更多。

  * 在 Android 3.0 及更高版本，使用全息主題的設備以相反的順序顯示按鈕。

### Windows 的怪癖

  * 在 Windows 上提示對話方塊是基於 html 的缺乏這種本機 api。

### 火狐瀏覽器作業系統怪癖：

本機阻止 `window.prompt()` 和非阻塞的 `navigator.notification.prompt()` 都可。

## navigator.notification.beep

該設備播放提示音的聲音。

    navigator.notification.beep(times);
    

  * **beep**： 次數重複在嗶嗶聲。*（數）*

### 示例

    // Beep twice!
    navigator.notification.beep(2);
    

### 支援的平臺

  * 亞馬遜火 OS
  * Android 系統
  * 黑莓 10
  * iOS
  * Tizen
  * Windows Phone 7 和 8
  * Windows 8

### 亞馬遜火 OS 怪癖

  * 亞馬遜火 OS 播放預設 **設置/顯示和聲音** 板下指定的 **通知聲音**。

### Android 的怪癖

  * 安卓系統播放預設 **通知鈴聲** **設置/聲音和顯示** 面板下指定。

### Windows Phone 7 和 8 怪癖

  * 依賴于泛型蜂鳴音檔從科爾多瓦分佈。

### Tizen 怪癖

  * Tizen 通過播放音訊檔通過媒體 API 實現的蜂鳴聲。

  * 蜂鳴音檔必須很短，必須位於應用程式的根目錄中，一個 `聲音` 子目錄和必須將命名為 `beep.wav`.