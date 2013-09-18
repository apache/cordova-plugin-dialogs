
var firefoxos = require('cordova/platform');

function modal(message, callback, tittle, buttonLabels, cancelButton) {
    // create a modal window
    var box = document.createElement('div');
    box.classList.add('fxos-modal-window');
    // add title
    if (tittle) {
        var boxTittle = document.createElement('h3');
        boxTittle.appendChild(document.createTextNode(tittle));
        box.appendChild(boxTittle);
    }
    // add message
    var boxMessage = document.createElement('p');
    boxMessage.appendChild(document.createTextNode(message));
    box.appendChild(boxMessage);
    // add buttons and assign callbackButton on click
    // TODO: find a way handle different languages
    if (cancelButton) {
        addButton('Cancel', -1, true);
        // TODO: listen escape key
    }
    if (buttonLabels.length == 0) {
        // only OK button
        addButton('OK');
        // TODO: listen to Enter Key
    } else {
        for (var index = 0; index < buttonLabels.length; index++) {
            // TODO: first button is the default one (listens to Enter
            // key)
            addButton(buttonLabels[index], index);
        }
    }
    document.body.appendChild(box);

    function addButton(label, index, cancelButton) {
        var button = document.createElement('button');
        button.appendChild(document.createTextNode(label));
        if (cancelButton) {
            button.classList.add('cancel');
        }
        if (!index) {
            index = 0;
        }
        if (cancelButton) {
            index = -1;
        }
        button.labelIndex = index;
        button.addEventListener('click', callbackButton, false);
        box.appendChild(button);
    }

    // call callback and destroy modal
    function callbackButton() {
        callback(this.labelIndex);
        // destroy window
        box.parentNode.removeChild(box);
    }
}

var Dialogs = {
    vibrate: function(milliseconds) {
        navigator.vibrate(milliseconds);
    },
    alert: function(message, alertCallback, tittle, buttonName) {
        // TODO: display tittle and buttonName
        modal(message, alertCallback, tittle, [buttonName]);
    },
    confirm: function(message, confirmCallback, tittle, buttonLabels) {
        // TODO: display tittle and multiple buttons
        modal(message, confirmCallback, tittle, buttonLabels, true);
    }
};

firefoxos.registerPlugin('Dialogs', Dialogs);
