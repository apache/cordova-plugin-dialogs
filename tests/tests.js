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

exports.defineAutoTests = function () {
    describe('Notification (navigator.notification)', function () {
        it("should exist", function () {
            expect(navigator.notification).toBeDefined();
        });

        it("should contain a beep function", function () {
            expect(typeof navigator.notification.beep).toBeDefined();
            expect(typeof navigator.notification.beep).toBe("function");
        });

        it("should contain an alert function", function () {
            expect(typeof navigator.notification.alert).toBeDefined();
            expect(typeof navigator.notification.alert).toBe("function");
        });

        it("should contain a confirm function", function () {
            expect(typeof navigator.notification.confirm).toBeDefined();
            expect(typeof navigator.notification.confirm).toBe("function");
        });

        it("should contain a prompt function", function () {
            expect(typeof navigator.notification.prompt).toBeDefined();
            expect(typeof navigator.notification.prompt).toBe("function");
        });
    });
};

/******************************************************************************/
/******************************************************************************/
/******************************************************************************/

exports.defineManualTests = function (contentEl, createActionButton) {
    var logMessage = function (message) {
        var log = document.getElementById('info');
        var logLine = document.createElement('div');
        logLine.innerHTML = message;
        log.appendChild(logLine);
    }

    var clearLog = function () {
        var log = document.getElementById('info');
        log.innerHTML = '';
    }

    var beep = function () {
        console.log("beep()");
        navigator.notification.beep(3);
    };

    var alertDialog = function (message, title, button) {
        console.log("alertDialog()");
        navigator.notification.alert(message,
            function () {
                console.log("Alert dismissed.");
            },
            title, button);
        console.log("After alert");
    };

    var confirmDialogA = function (message, title, buttons) {
        clearLog();
        navigator.notification.confirm(message,
            function (r) {
                if (r === 0) {
                    logMessage("Dismissed dialog without making a selection.");
                    console.log("Dismissed dialog without making a selection.");
                } else {
                    console.log("You selected " + r);
                    logMessage("You selected " + (buttons.split(","))[r - 1]);
                }
            },
            title,
            buttons);
    };

    var confirmDialogB = function (message, title, buttons) {
        clearLog();
        navigator.notification.confirm(message,
            function (r) {
                if (r === 0) {
                    logMessage("Dismissed dialog without making a selection.");
                    console.log("Dismissed dialog without making a selection.");
                } else {
                    console.log("You selected " + r);
                    logMessage("You selected " + buttons[r - 1]);
                }
            },
            title,
            buttons);
    };

    var promptDialog = function (message, title, buttons) {
        clearLog();
        navigator.notification.prompt(message,
            function (r) {
                if (r && r.buttonIndex === 0) {
                    var msg = "Dismissed dialog";
                    if (r.input1) {
                        msg += " with input: " + r.input1
                    }
                    logMessage(msg);
                    console.log(msg);
                } else {
                    console.log("You selected " + r.buttonIndex + " and entered: " + r.input1);
                    logMessage("You selected " + buttons[r.buttonIndex - 1] + " and entered: " + r.input1);
                }
            },
            title,
            buttons);
    };

    /******************************************************************************/

    contentEl.innerHTML = '<div id="info"></div>' +
        '<div id="actions"></div>';

    createActionButton('Beep', function () {
        beep();
    }, 'actions');

    createActionButton('Alert Dialog', function () {
        alertDialog('You pressed alert.', 'Alert Dialog', 'Continue');
    }, 'actions');

    createActionButton('Confirm Dialog - Deprecated', function () {
        confirmDialogA('You pressed confirm.', 'Confirm Dialog', 'Yes,No,Maybe');
    }, 'actions');

    createActionButton('Confirm Dialog', function () {
        confirmDialogB('You pressed confirm.', 'Confirm Dialog', ['Yes', 'No', 'Maybe, Not Sure']);
    }, 'actions');

    createActionButton('Prompt Dialog', function () {
        promptDialog('You pressed prompt.', 'Prompt Dialog', ['Yes', 'No', 'Maybe, Not Sure']);
    }, 'actions');

    createActionButton('Built-in Alert Dialog', function () {
        alert('You pressed alert');
    }, 'actions');

    createActionButton('Built-in Confirm Dialog', function () {
        confirm('You selected confirm');
    }, 'actions');

    createActionButton('Built-in Prompt Dialog', function () {
        prompt('This is a prompt', 'Default value');
    }, 'actions');
};
