/* ----- Custom Scripts for Destiny template ----- */

jQuery(function ($) {
    "use strict";

    const firebaseConfig = {
        apiKey: "AIzaSyCGU8bpjC-jqv5rgn-SOhH68CdB5fxhiFM",
        authDomain: "at-allkom-cloud-users.firebaseapp.com",
        databaseURL: "https://at-allkom-cloud-users.firebaseio.com",
        projectId: "at-allkom-cloud-users",
        storageBucket: "at-allkom-cloud-users.appspot.com",
        messagingSenderId: "305026047824",
        appId: "1:305026047824:web:335a7962f3168f83"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
    var mainbottom = $('#main').offset().top;

    if (window.matchMedia("(max-width: 800px)").matches) {
        $("#header-logo").css("width", window.innerWidth * 0.5 + 'px');
        $("#footer-logo").css("width", window.innerWidth * 0.5 + 'px');
    }

    // on scroll,
    $(window).on('scroll', function () {

        // we round here to reduce a little workload
        stop = Math.round($(window).scrollTop());
        if (stop > mainbottom) {
            $('.navbar').addClass('past-main');
            $('.navbar').addClass('effect-main')
        } else {
            $('.navbar').removeClass('past-main');
        }

    });


    // Collapse navbar on click

    $(document).on('click.nav', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a')) {
            $(this).removeClass('in').addClass('collapse');
        }
    });

// Owl carousel init

    $(".testimonials").owlCarousel({

        slideSpeed: 200,
        items: 1,
        singleItem: true,
        autoPlay: true,
        pagination: false
    });

    /* ------ Clients Section Owl Carousel ----- */

    $(".clients").owlCarousel({
        slideSpeed: 200,
        items: 5,
        singleItem: false,
        autoPlay: true,
        pagination: false
    });

    /* ------ jQuery for Easing min -- */

    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    /* ----- Magnific Popup ----- */

    $('.popup').magnificPopup({
        disableOn: 0,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });


    /* ----- Jarallax Init ----- */

    $('.jarallax').jarallax({
        speed: 0.7
    });

    /* ----- Jarallax Personal Homepage Init ----- */

    $('.personal-jarallax').jarallax({
        speed: 0.7
    });


    /*----- Preloader ----- */

    $(window).load(function () {
        setTimeout(function () {
            $('#loading').fadeOut('slow', function () {
            });
        }, 3000);
    });


    /* --------- Wow Init -------*/

    new WOW().init();


    /* ----- Counter Up ----- */

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    /* ----- Countdown ----- */

    if ($.find('#countdown')[0]) {
        $('#countdown').countDown({
            targetDate: {
                'day': 14,
                'month': 7,
                'year': 2017,
                'hour': 11,
                'min': 13,
                'sec': 0
            },
            omitWeeks: true
        });
        //enter the count down date using the format year, month, day, time: hour, min, sec
        if ($('.day_field .top').html() == "0") $('.day_field').css('display', 'none');
    }


    /*-----------------------------------
    ----------- Scroll To Top -----------
    ------------------------------------*/

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1000) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-top').on('click', function () {
        $('#back-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 1500);
        return false;
    });

    /* ------ Animsition ----- */

    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
        loading: true,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading',
        loadingInner: '', // e.g '<img src="loading.svg" />'
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'body',
        transition: function (url) {
            window.location.href = url;
        }
    });


    /*----- Subscription Form ----- */

    $('.subscribe-form').submit(function (e) {
        e.preventDefault();
        var postdata = $('.subscribe-form').serialize();
        $.ajax({
            type: 'POST',
            url: 'assets/php/subscribe.php',
            data: postdata,
            dataType: 'json',
            success: function (json) {
                if (json.valid == 0) {
                    $('.success-message').hide();
                    $('.error-message').hide();
                    $('.error-message').html(json.message);
                    $('.error-message').fadeIn('fast', function () {
                        $('.subscribe-form').addClass('animated flash').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass('animated flash');
                        });
                    });
                } else {
                    $('.error-message').hide();
                    $('.success-message').hide();
                    $('.subscribe-form').hide();
                    $('.success-message').html(json.message);
                    $('.success-message').fadeIn('fast', function () {
                        $('.top-content').backstretch("resize");
                    });
                }
            }
        });
    });

    //Test
    // const apiKey = "443e19ec-3036-43fe-918c-987d81cf1756";

    // Alternative
    // const apiKey = 'ddc7423d-51cc-457c-8cf5-fd37ad3cc521';

    const apiKey = '1de04ebb-df03-423d-b1e3-0edab9856e2b';

    $('#contact-form').on('submit', function (e) {
        const formData = {};
        formData.fullName = document.getElementsByName('fullName')[0].value;
        formData.organization = document.getElementsByName('organization')[0].value;
        formData.email = document.getElementsByName('email')[0].value;
        formData.phone = document.getElementsByName('phone')[0].value;
        formData.message = document.getElementsByName('message')[0].value;

        const formButton = $("#formButton");
        formButton.prop("disabled", true);

        const responseText = $("#responseText");
        responseText.text("Su contacto ha sido enviado exitosamente. Un representante de Allkom se comunicará con ud. a la brevedad.");

        const formResponse = $("#formResponse");
        formResponse.css('display', 'none');
        responseText.css('color', 'green !important');

        $.ajax({
            type: "POST",
            url: 'emailSender.php',
            dataType: 'json',
            data: {
                to: formData.email,
                subject: "Confirmación de contacto",
                message: "Muchas gracias por contactarte con nosotros. \n" +
                    "A la brevedad un representante de AllKom se comunicará con ud."
            },

            success: function (obj, textstatus) {
                $.ajax({
                    type: "POST",
                    url: '/emailSender.php',
                    dataType: 'json',
                    data: {
                        to: "comercial@all-kom.com",
                        subject: "Registro Formulario Cloudbackup",
                        message: "Un nuevo usuario se ha registrado. \n" +
                            "\n Nombre Completo: " + formData.fullName +
                            "\n Email: " + formData.email +
                            "\n Empresa: " + formData.organization +
                            "\n Teléfono: " + formData.phone +
                            "\n Mensaje: " + formData.message
                    },

                    success: function (obj, textstatus) {
                        const fullDate = new Date();
                        const dateWithTimezone = new Date(fullDate.getTime() - fullDate.getTimezoneOffset() * 60000);
                        const date = dateWithTimezone.toISOString().split('T')[0];
                        const clock = dateWithTimezone.toISOString().split('T')[1].split('.')[0];

                        firebase.firestore().collection('cloud-users/').doc(date + " " + clock).set({
                            fullName: formData.fullName,
                            email: formData.email,
                            phone: formData.phone,
                            organization: formData.organization,
                            message: formData.message
                        });

                        toggleResponse();
                        formButton.prop("disabled", false);
                    }, error: function () {
                        toggleResponse();
                        formButton.prop("disabled", false);
                        responseText.text("Error inesperado. Por favor, vuelva a intentarlo más tarde.");
                        responseText.css('color', 'red !important');
                    }
                })
            }, error: function () {
                toggleResponse();
                formButton.prop("disabled", false);
                responseText.text("Error inesperado. Por favor, vuelva a intentarlo más tarde.");
                responseText.css('color', 'red !important');
            }
        });

        return false;
    });

    function toggleResponse() {
        const formResponse = document.getElementById("formResponse");
        if (formResponse.style.display === "none") {
            formResponse.style.display = "block";
        } else {
            formResponse.style.display = "none";
        }
    }
});
