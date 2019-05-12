jQuery(function ($) {
    "use strict";

    var clientId = '740658211795-dcu6dmbanrrsfh6vmjf1cjv36tvr3ms9.apps.googleusercontent.com';
    var apiKey = 'urwDr9YFTNOAsn1pbxKA0GXP';
    var scopes = 'https://www.googleapis.com/auth/gmail.send';

    var obj = new Object();
    obj.fullName = document.getElementsByName('fullName')[0].value;
    obj.organization = document.getElementsByName('organization')[0].value;
    obj.email = document.getElementsByName('email')[0].value;
    obj.phone = document.getElementsByName('phone')[0].value;
    obj.message = document.getElementsByName('message')[0].value;

    $('#contact-form').on('submit', function (e) {

        sendMessage(
            {
                'To': obj.email,
                'Subject': 'Confirmación de contacto'
            },
            "Muchas gracias por contactarte con nosotros. " +
            "A la brevedad un representante de AllKom se comunicará con ud."
        );

        /*var url = "localhost:8081/process-form";

        $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(),
            success: function (data) {
                var messageAlert = 'alert-' + data.type;
                var messageText = data.message;

                var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                if (messageAlert && messageText) {
                    $('#contact-form').find('.messages').html(alertBox);
                    $('#contact-form')[0].reset();
                }
            }
        });
        return false;*/
        return false;
    });

    function sendMessage(headers_obj, message, callback) {
        var email = '';

        for (var header in headers_obj)
            email += header += ": " + headers_obj[header] + "\r\n";

        email += "\r\n" + message;

        var sendRequest = gapi.client.gmail.users.messages.send({
            'userId': 'me',
            'resource': {
                'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
            }
        });

        return sendRequest.execute(callback);
    }

    function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth, 1);
    }

    function checkAuth() {
        gapi.auth.authorize({
            client_id: clientId,
            scope: scopes,
            immediate: true
        }, loadGmailApi());
    }

    function loadGmailApi() {
        gapi.client.load('gmail', 'v1', displayInbox);
    }

});
