/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

/* global cordova */

exports.defineAutoTests = function () {
    describe('Notification (navigator.notification)', function () {
        it('should exist', function () {
            expect(navigator.notification).toBeDefined();
        });

        it('should contain a beep function', function () {
            expect(typeof navigator.notification.beep).toBeDefined();
            expect(typeof navigator.notification.beep).toBe('function');
        });

        it('should contain an alert function', function () {
            expect(typeof navigator.notification.alert).toBeDefined();
            expect(typeof navigator.notification.alert).toBe('function');
        });

        it('should contain a confirm function', function () {
            expect(typeof navigator.notification.confirm).toBeDefined();
            expect(typeof navigator.notification.confirm).toBe('function');
        });

        it('should contain a prompt function', function () {
            expect(typeof navigator.notification.prompt).toBeDefined();
            expect(typeof navigator.notification.prompt).toBe('function');
        });

        it('should contain a dismissPrevious function', function () {
            expect(typeof navigator.notification.dismissPrevious).toBeDefined();
            expect(typeof navigator.notification.dismissPrevious).toBe('function');
        });

        it('should contain a dismissAll function', function () {
            expect(typeof navigator.notification.dismissAll).toBeDefined();
            expect(typeof navigator.notification.dismissAll).toBe('function');
        });
    });
};

/******************************************************************************/
/******************************************************************************/
/******************************************************************************/

exports.defineManualTests = function (contentEl, createActionButton) {
    const logMessage = function (message) {
        const log = document.getElementById('info');
        const logLine = document.createElement('div');
        logLine.innerHTML = message;
        log.appendChild(logLine);
    };

    const clearLog = function () {
        const log = document.getElementById('info');
        log.innerHTML = '';
    };

    const beep = function () {
        console.log('beep()');
        navigator.notification.beep(3);
    };

    const alertDialog = function (message, title, button) {
        console.log('alertDialog()');
        navigator.notification.alert(
            message,
            function () {
                console.log('Alert dismissed.');
            },
            title,
            button
        );
        console.log('After alert');
    };

    const confirmDialogA = function (message, title, buttons) {
        clearLog();
        navigator.notification.confirm(
            message,
            function (r) {
                if (r === 0) {
                    logMessage('Dismissed dialog without making a selection.');
                    console.log('Dismissed dialog without making a selection.');
                } else {
                    console.log('You selected ' + r);
                    logMessage('You selected ' + buttons.split(',')[r - 1]);
                }
            },
            title,
            buttons
        );
    };

    const confirmDialogB = function (message, title, buttons) {
        clearLog();
        navigator.notification.confirm(
            message,
            function (r) {
                if (r === 0) {
                    logMessage('Dismissed dialog without making a selection.');
                    console.log('Dismissed dialog without making a selection.');
                } else {
                    console.log('You selected ' + r);
                    logMessage('You selected ' + buttons[r - 1]);
                }
            },
            title,
            buttons
        );
    };

    const promptDialog = function (message, title, buttons, defaultText) {
        clearLog();
        navigator.notification.prompt(
            message,
            function (r) {
                if (r && r.buttonIndex === 0) {
                    let msg = 'Dismissed dialog';
                    if (r.input1) {
                        msg += ' with input: ' + r.input1;
                    }
                    logMessage(msg);
                    console.log(msg);
                } else {
                    console.log('You selected ' + r.buttonIndex + ' and entered: ' + r.input1);
                    logMessage('You selected ' + buttons[r.buttonIndex - 1] + ' and entered: ' + r.input1);
                }
            },
            title,
            buttons,
            defaultText
        );
    };

    const dismissPrevious = function (successCallback, errorCallback) {
        console.log('dismissPrevious()');
        navigator.notification.dismissPrevious(successCallback, errorCallback);
    };

    const dismissAll = function (successCallback, errorCallback) {
        console.log('dismissAll()');
        navigator.notification.dismissAll(successCallback, errorCallback);
    };

    /******************************************************************************/
    const isRunningOnAndroid = cordova.platformId === 'android';
    const isRunningOniOS = cordova.platformId === 'ios';

    let dialogs_tests =
        '<div id="beep"></div>' +
        'Expected result: Device will beep (unless device is on silent). Nothing will get updated in status box.' +
        '<h2>Dialog Tests</h2>' +
        '<h3>Dialog boxes will pop up for each of the following tests</h3>' +
        '<p/> <div id="alert"></div>' +
        'Expected result: Dialog will say "You pressed alert". Press continue to close dialog. Nothing will get updated in status box.' +
        '<p/> <div id="confirm_deprecated"></div>' +
        'Expected result: Dialog will say "You pressed confirm". Press Yes, No, or Maybe to close dialog. Status box will tell you what option you selected.' +
        '<p/> <div id="confirm"></div>' +
        'Expected result: Dialog will say "You pressed confirm". Press Yes, No, or Maybe, Not Sure to close dialog. Status box will tell you what option you selected, and should use 1-based indexing.' +
        '<p/> <div id="prompt"></div>' +
        'Expected result: Dialog will say "You pressed prompt". Enter any message and press Yes, No, or Maybe, Not Sure to close dialog. Status box will tell you what option you selected and message you entered or if empty, it will display "Default Text", and should use 1-based indexing.' +
        '<p/> <div id="built_in_alert"></div>' +
        'Expected result: Dialog will have title "index.html" and say "You pressed alert" Press OK to close dialog. Nothing will get updated in status box.' +
        '<p/> <div id="built_in_confirm"></div>' +
        'Expected result: Dialog will have title "index.html" and say "You selected confirm". Press Cancel or OK to close dialog. Nothing will get updated in status box.' +
        '<p/> <div id="built_in_prompt"></div>' +
        'Expected result: Dialog will have title "index.html" and say "This is a prompt". "Default value" will be in text box. Press Cancel or OK to close dialog. Nothing will get updated in status box.' +
        '<p/> <h3>CB-8947 Tests</h3><div id="cb8947"></div>' +
        'Expected results: Dialogs will not crash iOS';

    if (isRunningOnAndroid || isRunningOniOS) {
        dialogs_tests += '<h3>Dismissable dialogs</h3>' +
            '<p/> <div id="dismiss_previous"></div>' +
            'Expected results: 2 dialogs will open; one will automatically dismiss after 5 seconds' +
            '<p/> <div id="dismiss_all"></div>' +
            'Expected results: 2 dialogs will open; both will automatically dismiss after 5 seconds';
    }

    contentEl.innerHTML = '<div id="info"></div>' + dialogs_tests;

    createActionButton(
        'Beep',
        function () {
            beep();
        },
        'beep'
    );

    createActionButton(
        'Alert Dialog',
        function () {
            alertDialog('You pressed alert.', 'Alert Dialog', 'Continue');
        },
        'alert'
    );

    createActionButton(
        'Confirm Dialog - Deprecated',
        function () {
            const buttons = 'Yes,No,Maybe';
            confirmDialogA('You pressed confirm.', 'Confirm Dialog', buttons);
        },
        'confirm_deprecated'
    );

    createActionButton(
        'Confirm Dialog',
        function () {
            const buttons = ['Yes', 'No', 'Maybe, Not Sure'];
            confirmDialogB('You pressed confirm.', 'Confirm Dialog', buttons);
        },
        'confirm'
    );

    createActionButton(
        'Prompt Dialog',
        function () {
            promptDialog('You pressed prompt.', 'Prompt Dialog', ['Yes', 'No', 'Maybe, Not Sure'], 'Default Text');
        },
        'prompt'
    );

    createActionButton(
        'Prompt Dialog - no default',
        function () {
            promptDialog('You pressed prompt.', 'Prompt Dialog', ['Yes', 'No']);
        },
        'prompt'
    );

    createActionButton(
        'Built-in Alert Dialog',
        function () {
            if (typeof alert === 'function') {
                alert('You pressed alert');
            }
        },
        'built_in_alert'
    );

    createActionButton(
        'Built-in Confirm Dialog',
        function () {
            if (typeof confirm === 'function') {
                confirm('You selected confirm');
            }
        },
        'built_in_confirm'
    );

    createActionButton(
        'Built-in Prompt Dialog',
        function () {
            if (typeof prompt === 'function') {
                prompt('This is a prompt', 'Default value');
            }
        },
        'built_in_prompt'
    );

    // CB-8947 - ensure number messages don't crash iOS
    createActionButton(
        'Alert Dialog with Number',
        function () {
            const callback = function () {
                clearLog();
                console.log('Test passed');
            };
            navigator.notification.alert(17, callback);
        },
        'cb8947'
    );

    // CB-8947 - ensure object messages don't crash iOS
    createActionButton(
        'Alert Dialog with Object',
        function () {
            const object = { number: 42, message: "Make sure an object doesn't crash iOS", issue: 'CB-8947' };
            const callback = function () {
                clearLog();
                console.log('Test passed');
            };
            navigator.notification.alert(object, callback);
        },
        'cb8947'
    );

    // CB-8947 - ensure object messages don't crash iOS
    createActionButton(
        'Confirm Dialog with Object',
        function () {
            const object = { number: 42, message: "Make sure an object doesn't crash iOS", issue: 'CB-8947' };
            const callback = function () {
                clearLog();
                console.log('Test passed');
            };
            navigator.notification.confirm(object, callback);
        },
        'cb8947'
    );

    // CB-8947 - ensure object messages don't crash iOS
    createActionButton(
        'Prompt Dialog with Object',
        function () {
            const object = { number: 42, message: "Make sure an object doesn't crash iOS", issue: 'CB-8947' };
            const callback = function () {
                clearLog();
                console.log('Test passed');
            };
            navigator.notification.prompt(object, callback);
        },
        'cb8947'
    );

    // Dismissable dialogs (supported on Android & iOS only)
    if (isRunningOnAndroid || isRunningOniOS) {
        const open2Dialogs = function () {
            const openDialogs = function () {
                alertDialog('Alert Dialog 1 pressed', 'Alert Dialog 1', 'Continue');
                alertDialog('Alert Dialog 2 pressed', 'Alert Dialog 2', 'Continue');
            };
            // dismiss any currently open dialogs first
            dismissAll(openDialogs, openDialogs);
        };

        createActionButton(
            'Dismiss Previous',
            function () {
                open2Dialogs();
                setTimeout(function () {
                    dismissPrevious(function () {
                        console.log('Successfully dismissed previous dialog');
                    }, function (error) {
                        console.error('Failed to dismiss previous dialog: ' + error);
                    });
                }, 5000);
            },
            'dismiss_previous'
        );

        createActionButton(
            'Dismiss All',
            function () {
                open2Dialogs();
                setTimeout(function () {
                    dismissAll(function () {
                        console.log('Successfully dismissed all open dialogs');
                    }, function (error) {
                        console.error('Failed to dismiss all open dialogs: ' + error);
                    });
                }, 5000);
            },
            'dismiss_all'
        );
    }
};
