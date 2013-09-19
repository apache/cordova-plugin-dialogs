
var firefoxos = require('cordova/platform');

function _empty() {}

function modal(message, callback, title, buttonLabels) {
    // create a modal window
    var box = document.createElement('div');
    box.classList.add('fxos-modal-window');
    // add title
    if (title) {
        var boxtitle = document.createElement('h3');
        boxtitle.appendChild(document.createTextNode(title));
        box.appendChild(boxtitle);
    }
    // add message
    var boxMessage = document.createElement('p');
    boxMessage.appendChild(document.createTextNode(message));
    box.appendChild(boxMessage);
    // add buttons and assign callbackButton on click
    for (var index = 0; index < buttonLabels.length; index++) {
        // TODO: first button is the default one (listens to Enter
        // key)
        // TODO: last button listens to the cancel key
        addButton(buttonLabels[index], index);
    }
    document.body.appendChild(box);

    function addButton(label, index) {
        var button = document.createElement('button');
        button.appendChild(document.createTextNode(label));
        button.labelIndex = index;
        button.addEventListener('click', callbackButton, false);
        box.appendChild(button);
    }

    // call callback and destroy modal
    function callbackButton() {
        callback(this.labelIndex);
        box.parentNode.removeChild(box);
    }
}

var Notification = {
    vibrate: function(milliseconds) {
        navigator.vibrate(milliseconds);
    },
    alert: function(successCallback, errorCallback, message, title, buttonName) {
        var _callback = (successCallback || _empty);
        var _buttonLabels = [buttonName];
        modal(message, _callback, title, _buttonLabels);
    },
    confirm: function(successCallback, errorCallback, message, title, buttonLabels) {
        var _callback = (successCallback || _empty);
        modal(message, _callback, title, buttonLabels);
    }
};

firefoxos.registerPlugin('Notification', Notification);
