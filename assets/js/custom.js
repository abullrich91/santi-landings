/* ----- Custom Scripts for Destiny template ----- */

jQuery(function ($) {
    "use strict";

    // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
    var mainbottom = $('#main').offset().top;

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

    /*$('#contact-form').on('submit', function (e) {
        var obj = new Object();
        obj.fullName = document.getElementsByName('fullName')[0].value;
        obj.organization = document.getElementsByName('organization')[0].value;
        obj.email = document.getElementsByName('email')[0].value;
        obj.phone = document.getElementsByName('phone')[0].value;
        obj.message = document.getElementsByName('message')[0].value;


        var url = "http://localhost:8081/process-form";

        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(obj),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json;charset=UTF-8"
            },
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
        return false;
    });*/

    var apiKey = "443e19ec-3036-43fe-918c-987d81cf1756";

    $('#contact-form').on('submit', function (e) {

        var obj = new Object();
        obj.fullName = document.getElementsByName('fullName')[0].value;
        obj.organization = document.getElementsByName('organization')[0].value;
        obj.email = document.getElementsByName('email')[0].value;
        obj.phone = document.getElementsByName('phone')[0].value;
        obj.message = document.getElementsByName('message')[0].value;

        Email.send({
            SecureToken : apiKey,
            // Host : "smtp.elasticemail.com",
            // Username : "somostrueno@gmail.com",
            // Password : "macellari91",
            To : obj.email,
            From : "somostrueno@gmail.com",
            Subject : "Confirmación de contacto",
            Body : "Muchas gracias por contactarte con nosotros. \n" +
                "A la brevedad un representante de AllKom se comunicará con ud."
        }).then(
            message => alert(message)
        );

        return false;

    });

});
