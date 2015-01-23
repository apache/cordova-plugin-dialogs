module.exports = {
    alert: function(successCallback, errorCallback, args) {
        return this.confirm(successCallback, errorCallback, args);
    },

    confirm: function(successCallback, errorCallback, args) {
        var index = null,
            overlayElement = null,
            popup = null,
            element = null,
            titleString = null,
            messageString = null,
            buttonString = null,
            buttonsArray = null,

            message = args[0];
            title = args[1];
            buttonLabels = args[2];

        console.log ("message" , message);
        console.log ("successCallback" , successCallback);
        console.log ("title" , title);
        console.log ("buttonLabels" , buttonLabels);

        titleString = '<div class="popup-title"><p>' + title + '</p></div>';
        messageString = '<div class="popup-text"><p>' + message + '</p></div>';
        buttonString = '<div class="popup-button-bg"><ul>';

        switch(typeof(buttonLabels))
        {
        case "string":
            buttonsArray = buttonLabels.split(",");

            if (buttonsArray === null) {
                buttonsArray = buttonLabels;
            }

            for (index in buttonsArray) {
                buttonString += '<li><input id="popup-button-' + buttonsArray[index]+
                                '" type="button" value="' + buttonsArray[index] + '" /></li>';
                console.log ("index: ", index,"");
                console.log ("buttonsArray[index]: ", buttonsArray[index]);
                console.log ("buttonString: ", buttonString);
            }
            break;

        case "array":
            if (buttonsArray === null) {
                buttonsArray = buttonLabels;
            }

            for (index in buttonsArray) {
                buttonString += '<li><input id="popup-button-' + buttonsArray[index]+
                                '" type="button" value="' + buttonsArray[index] + '" /></li>';
                console.log ("index: ", index,"");
                console.log ("buttonsArray[index]: ", buttonsArray[index]);
                console.log ("buttonString: ", buttonString);
            }
            break;
        default:
            console.log ("cordova/plugin/tizen/Notification, default, buttonLabels: ", buttonLabels);
            break;
        }

        buttonString += '</ul></div>';

        overlayElement = document.createElement("div");
        overlayElement.className = 'ui-popupwindow-screen';

        overlayElement.style.zIndex = 1001;
        overlayElement.style.width = "100%";
        overlayElement.style.height = "100%";
        overlayElement.style.top = 0;
        overlayElement.style.left = 0;
        overlayElement.style.margin = 0;
        overlayElement.style.padding = 0;
        overlayElement.style.position = "absolute";

        popup = document.createElement("div");
        popup.className = "ui-popupwindow";
        popup.style.position = "fixed";
        popup.style.zIndex = 1002;
        popup.innerHTML = titleString + messageString + buttonString;

        document.body.appendChild(overlayElement);
        document.body.appendChild(popup);

        function createListener(button) {
            return function() {
                document.body.removeChild(overlayElement);
                document.body.removeChild(popup);
                successCallback(button.value);
            };
        }

       for (index in buttonsArray) {
           console.log ("index: ", index);

           element = document.getElementById("popup-button-" + buttonsArray[index]);
           element.addEventListener("click", createListener(element), false);
       }

    },
    prompt: function(successCallback, errorCallback, args) {
        //a temporary implementation using window.prompt()
        // note taht buttons are cancel ok (in that order)
        // gonna to return based on having OK  / Cancel
        // ok is 1, cancel is 2

        var result = prompt(message);

        if (successCallback && (typeof successCallback == "function")) {
            successCallback((result === null) ? 2 : 1, result);
        }
    }
};

require('cordova/tizen/commandProxy').add('Notification', module.exports);
