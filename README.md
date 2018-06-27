---
title: Dialogs
description: Use native dialog UI elements
---
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

|AppVeyor|Travis CI|
|:-:|:-:|
|[![Build status](https://ci.appveyor.com/api/projects/status/github/apache/cordova-plugin-dialogs?branch=master)](https://ci.appveyor.com/project/ApacheSoftwareFoundation/cordova-plugin-dialogs)|[![Build Status](https://travis-ci.org/apache/cordova-plugin-dialogs.svg?branch=master)](https://travis-ci.org/apache/cordova-plugin-dialogs)|

# cordova-plugin-dialogs

This plugin provides access to some native dialog UI elements
via a global `navigator.notification` object.

Although the object is attached to the global scoped `navigator`, it is not available until after the `deviceready` event.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(navigator.notification);
    }

Report issues on the [Apache Cordova issue tracker](https://issues.apache.org/jira/issues/?jql=project%20%3D%20CB%20AND%20status%20in%20%28Open%2C%20%22In%20Progress%22%2C%20Reopened%29%20AND%20resolution%20%3D%20Unresolved%20AND%20component%20%3D%20%22Plugin%20Dialogs%22%20ORDER%20BY%20priority%20DESC%2C%20summary%20ASC%2C%20updatedDate%20DESC)

## Installation

    cordova plugin add cordova-plugin-dialogs

## Methods

- `navigator.notification.setAndroidStyleName`
- `navigator.notification.alert`
- `navigator.notification.confirm`
- `navigator.notification.prompt`
- `navigator.notification.beep`

## navigator.notification.setAndroidStyleName

For Android platforms, allows specifying a custom style name to use with the dialogs.
The style name can be defined within a `styles.xml` file. The `stles.xml` file
is referenced in your config.xml file as a `<resource-file>`.

    navigator.notification.setAndroidStyleName(styleName)

- __styleName__: Name of Android style. _(String)_


### Example

1. Create a `style.xml` with a custom dialog style (notice we give the style a name of `AlertDialogCustom` which will be used in our code later)(this file can go anywhere in your project, this example places it in the root):


    <!-- styles.xml file -->
    <color name="blue">#0000ff</color>
    <color name="white">#ffffff</color>
    <color name="black">#000000</color>
    <style name="AlertDialogCustom" parent="Theme.AppCompat.Light.Dialog.Alert">
        <!-- Used for button colors -->
        <item name="android:colorAccent">@color/blue</item>
        <!-- Used for the title and text -->
        <item name="android:textColorPrimary">@color/black</item>
        <!-- Used for the background -->
        <item name="android:background">@color/white</item>

        <!-- More styles could be added... -->
    </style>

2. Reference your `styles.xml` file in your `config.xml` file so it gets copied to the correct location (since we placed `styles.xml` in our root, we just put the filename with no path, otherwise `src` is relative to your `config.xml` directory)

    <!-- config.xml file -->
    <widget>
        <platform name="android">
            <resource-file src="styles.xml" target="app/src/main/res/values/styles.xml" />
        </platform>
    </widget>

3. In your code, set the dialog style name to the one you used in `styles.xml`:


    navigator.notification.setAndroidStyleName(
        'AlertDialogCustom'  // styleName
    );

### Supported Platforms

- Android

## navigator.notification.alert

Shows a custom alert or dialog box.  Most Cordova implementations use a native
dialog box for this feature, but some platforms use the browser's `alert`
function, which is typically less customizable.

    navigator.notification.alert(message, alertCallback, [title], [buttonName])

- __message__: Dialog message. _(String)_

- __alertCallback__: Callback to invoke when alert dialog is dismissed. _(Function)_

- __title__: Dialog title. _(String)_ (Optional, defaults to `Alert`)

- __buttonName__: Button name. _(String)_ (Optional, defaults to `OK`)


### Example

    function alertDismissed() {
        // do something
    }

    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );

### Supported Platforms

- Android
- Browser
- iOS
- Windows

## navigator.notification.confirm

Displays a customizable confirmation dialog box.

    navigator.notification.confirm(message, confirmCallback, [title], [buttonLabels])

- __message__: Dialog message. _(String)_

- __confirmCallback__: Callback to invoke with index of button pressed (1, 2, or 3) or when the dialog is dismissed without a button press (0). _(Function)_

- __title__: Dialog title. _(String)_ (Optional, defaults to `Confirm`)

- __buttonLabels__: Array of strings specifying button labels. _(Array)_  (Optional, defaults to [`OK,Cancel`])


### confirmCallback

The `confirmCallback` executes when the user presses one of the
buttons in the confirmation dialog box.

The callback takes the argument `buttonIndex` _(Number)_, which is the
index of the pressed button. Note that the index uses one-based
indexing, so the value is `1`, `2`, `3`, etc.

### Example

    function onConfirm(buttonIndex) {
        alert('You selected button ' + buttonIndex);
    }

    navigator.notification.confirm(
        'You are the winner!', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Game Over',           // title
        ['Restart','Exit']     // buttonLabels
    );

### Supported Platforms

- Android
- Browser
- iOS
- Windows

### Android Quirks

- Android supports a maximum of three buttons, and ignores any more than that.

### Windows Quirks

- On Windows8/8.1 it is not possible to add more than three buttons to MessageDialog instance.

- On Windows Phone 8.1 it's not possible to show dialog with more than two buttons.

## navigator.notification.prompt

Displays a native dialog box that is more customizable than the browser's `prompt` function.

    navigator.notification.prompt(message, promptCallback, [title], [buttonLabels], [defaultText])

- __message__: Dialog message. _(String)_

- __promptCallback__: Callback to invoke with index of button pressed (1, 2, or 3) or when the dialog is dismissed without a button press (0). _(Function)_

- __title__: Dialog title _(String)_ (Optional, defaults to `Prompt`)

- __buttonLabels__: Array of strings specifying button labels _(Array)_ (Optional, defaults to `["OK","Cancel"]`)

- __defaultText__: Default textbox input value (`String`) (Optional, Default: empty string)

### promptCallback

The `promptCallback` executes when the user presses one of the buttons
in the prompt dialog box. The `results` object passed to the callback
contains the following properties:

- __buttonIndex__: The index of the pressed button. _(Number)_ Note that the index uses one-based indexing, so the value is `1`, `2`, `3`, etc.



- __input1__: The text entered in the prompt dialog box. _(String)_

### Example

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

### Supported Platforms

- Android
- Browser
- iOS
- Windows

### Android Quirks

- Android supports a maximum of three buttons, and ignores any more than that.

- On Android 3.0 and later, buttons are displayed in reverse order for devices that use the Holo theme.

### Windows Quirks

- On Windows prompt dialog is html-based due to lack of such native api.

## navigator.notification.beep

The device plays a beep sound.

    navigator.notification.beep(times);

- __times__: The number of times to repeat the beep. _(Number)_

### Example

    // Beep twice!
    navigator.notification.beep(2);

### Supported Platforms

- Android
- Browser
- iOS
- Windows 8

### Android Quirks

- Android plays the default __Notification ringtone__ specified under the __Settings/Sound & Display__ panel.
