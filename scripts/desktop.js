$(function() {
    // remove lick for mobile
    //$('#slick-mobile').remove();

    // Generate View Cart button (hidden by default)
    $('<button id="view-cart-link" class="btn view-cart-link button--rayen" data-text="VIEW CART" href="#cart" style="display:none;z-index:999999;">VIEW CART</button>').insertAfter('div[data-remodal-id="pre-order"]');
    // generate session reset btn if on local
    if (window.location.host == 'localhost') {
        $('#session-handler').html('<button class="btn btn-success" id="btn-page-reload">RELOAD PAGE</button><button class="btn btn-warning" id="btn-show-session">SHOW Sessions</button><button class="btn btn-danger" id="btn-flush-session">FLUSH Sessions</button>');
    }
    // initiate remodal plugin
    var modal = $('[data-remodal-id=pre-order]').remodal();
    $('<div class="close-btn" id="cd-close-btn" data-remodal-action="close"><i class="fa fa-times"></i></div>').appendTo('.remodal-wrapper');
    // Change DIV > Cart's z-index by default
    $('#cd-cart').css('z-index', '99999');
    $_window = $(window);
    $('.side').css({
        'height': $_window.height() / 2
    });

    var heightGlideBullets = $(window).height() * (21 / 100),
        heightGlideBulletsResult = $(window).height() - heightGlideBullets;
    $('.glide--horizontal .glide__bullets').css({
        'position': 'fixed',
        'bottom': -heightGlideBulletsResult,
    });


    // Initiate FullPage plugin
    $('#fullpage').fullpage({
        menu: '#menu',
        sectionsColor: ['#000', '#000', '#000'],
        anchors: ['home', 'product1', 'contact'],
        navigation: true,
        autoScrolling: true,
        scrollingSpeed: 1000,
        onLeave: function(index, nextIndex, direction) {
            var leavingSection = $(this);



            if (index == 2 && direction == 'up') {
                $('.btn-order-fixed button.btn-order').show();
                $('.btn-order-fixed button.btn-contact-us').hide();
            };

            if (index == 2 && direction == 'down') {
                $('.btn-order-fixed button.btn-order').hide();
                $('.btn-order-fixed button.btn-contact-us').show();
            };

            if (index == 3 && direction == 'up') {
                $('.btn-order-fixed button.btn-order').show();
                $('.btn-order-fixed button.btn-contact-us').hide();
            }

        },
        afterLoad: function(anchorLink, index) {
            var loadedSection = $(this);

            if (index == 2) {
                $('.slide-content-bandits h2.1 , .slide-content-bandits p.1').addClass('left');
            };

            if (index == 3) {
                $('.btn-order-fixed button.btn-order').hide();
                $('.btn-order-fixed button.btn-contact-us').show();
            };


        }
    });


    $('.logo').click(function() {
        $.fn.fullpage.moveTo(1);
    });

    // SLICK.JS PLUGIN
    /*$('.slide-content-bandits').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        dotsClass: 'slick-dots',
    });*/

    /*var index0 = $('.slide-content-bandits li[data-slick-index="0"] h2,.slide-content-bandits li[data-slick-index="0"] p');
    var index1 = $('.slide-content-bandits li[data-slick-index="1"] h2,.slide-content-bandits li[data-slick-index="1"] p');
    var index2 = $('.slide-content-bandits li[data-slick-index="2"] h2,.slide-content-bandits li[data-slick-index="2"] p');
    var index3 = $('.slide-content-bandits li[data-slick-index="3"] h2,.slide-content-bandits li[data-slick-index="3"] p');

    $('.slide-content-bandits').on('afterChange', function(e, slick, currentSlide, nextSlide) {

        console.log('current > ' + currentSlide);

        if (currentSlide == 0) {
            index0.removeClass('left');
            index1.removeClass('right');
            index2.removeClass('left');
            index3.removeClass('right');
            index0.addClass('left');
        } else if (currentSlide == 1) {
            index0.removeClass('left');
            index1.removeClass('right');
            index2.removeClass('left');
            index3.removeClass('right');
            index1.addClass('right');
        } else if (currentSlide == 2) {
            index0.removeClass('left');
            index1.removeClass('right');
            index2.removeClass('left');
            index3.removeClass('right');
            index2.addClass('left');
        } else if (currentSlide == 3) {
            index0.removeClass('left');
            index2.removeClass('left');
            index1.removeClass('right');
            index3.removeClass('right');
            index3.addClass('right');
        };

        e.preventDefault();
    });*/


    // Initiate qty spinner
    (function($) {
        $.fn.spinner = function() {
            this.each(function() {
                var el = $(this);
                // add elements
                el.wrap('<span class="spinner"></span>');
                el.before('<span class="add"><i class="fa fa-angle-up"></i></span>');
                el.after('<span class="sub"><i class="fa fa-angle-down"></i></span>');
                // substract
                el.parent().on('click', '.sub', function() {
                    if (el.val() > parseInt(el.attr('min'))) {
                        el.val(function(i, oldval) {
                            return --oldval;

                        });
                        var type = el.closest('li').attr('id');
                        log('Reducing ' + type + ' item qty into ' + el.val());
                        if (type == 'white-list') {
                            $('#white-item').trigger('change');
                        } else {
                            $('#black-item').trigger('change');
                        }
                    }
                });
                // increment
                el.parent().on('click', '.add', function() {
                    if (el.val() < parseInt(el.attr('max'))) {
                        el.val(function(i, oldval) {
                            return ++oldval;
                        });
                        var type = el.closest('li').attr('id');
                        log('Adding ' + type + ' item qty into ' + el.val());
                        if (type == 'white-list') {
                            $('#white-item').trigger('change');
                        } else {
                            $('#black-item').trigger('change');
                        }
                    }
                });
            });
        };
    })(jQuery);
    $('input[type=number]').spinner();


    // Validation Function
    $('#form-contact-us-desktop')
        .formValidation({
            framework: 'bootstrap'
        })
        .on('success.field.fv', function(e, data) {
            if (data.fv.getInvalidFields().length > 0) { // There is invalid field
                data.fv.disableSubmitButtons(true);
            }
        });

    // Generate log
    function log(msg) {
        var bar = new $.peekABar({
            autohide: false,
            closeOnClick: true,
            html: msg
        });
        // Display the log (development mode ONLY!)
        if (window.location.host == 'localhost') {
            //bar.show();
            console.log(msg);
        }
    }

    // Init Reset
    function resetInit() {
        $('#white-item').val(0);
        $('#white-amount').val(0);
        $('#white-total').html();
        $('#black-item').val(0);
        $('#black-amount').val(0);
        $('#black-total').html();
        $('#no-list').show();
        $('#white-list').show();
        $('#black-list').show();
        $('.cd-cart-total').show();
    }

    // Dummy Reset cart fields
    function resetAll() {
        $('#white-item').val(0);
        $('#white-total').html();
        $('#black-item').val(0);
        $('#black-total').html();
        $('#no-list').show();
        $('#white-list').show();
        $('#black-list').show();
        $('.cd-cart-total').show();
    }


    // Currency section +++++++++++++++
    fx.base = "SGD";
    fx.rates = {
        "IDR": 10000,
        "SGD": 1
    }

    // CountUp.js plugin function
    function countMe(target, sym, value) {
        if (sym == 'SGD') {
            var options = {  
                useEasing: true,
                  useGrouping: true,
                  separator: ',',
                  decimal: '.',
                prefix: '$ '
            };
            var dec = 2;
        } else if (sym == 'IDR') {
            var options = {  
                useEasing: true,
                  useGrouping: true,
                  separator: '.',
                  decimal: ',',
                prefix: 'Rp '
            };
            var dec = 0;
        }

        var counter = new CountUp(target, 0, parseInt(value), dec, 0.5, options);
        counter.start();
    }

    function getCurrencyValue() {
        var selectedVal = "";
        var selected = $(".currency_box input[type='radio']:checked");
        if (selected.length > 0) {
            selectedVal = selected.val();
        }
        return selectedVal;
    }

    function setCurrency(sym, conv) {
        var whtItem, blkItem, cartTot;
        // recalculating cart
        whtItem = parseInt($('#white-item').val());
        blkItem = parseInt($('#black-item').val());
        whtItem = whtItem * conv;
        blkItem = blkItem * conv;
        cartTot = whtItem + blkItem;
        // put currency symbol
        $('#currencyWht, #currencyBlk').html(sym);
        // Cart total adjustment
        countMe('white-total', sym, whtItem);
        countMe('black-total', sym, blkItem);
        countMe('cart-total', sym, cartTot);
        // save to session
        $.jStorage.set('cur', sym);
    }

    // Reading Currency session
    function readSessionCur() {
        if ($.jStorage.get('cur') == undefined) {
            setCurrency('SGD', 28);
        } else {
            if ($.jStorage.get('cur') == 'SGD') {
                setCurrency('SGD', 28);
            } else if ($.jStorage.get('cur') == 'IDR') {
                var val = fx.convert(28, {
                    from: "SGD",
                    to: "IDR"
                });
                setCurrency('IDR', val);
            }
            // adjusting checked radio button
            var sessCur = $.jStorage.get('cur');
            if (sessCur == 'SGD') {
                $('#radio1').prop('checked', true);
            } else {
                $('#radio2').prop('checked', true);
            }
        }
    }

    // Currency radio button
    $("input:radio[name=currency]").click(function() {
        var cur = $(this).val();
        var conv, sym;
        if (cur == 'SGD') {
            conv = 28;
            sym = 'SGD';
        } else {
            conv = fx.convert(28, {
                from: "SGD",
                to: "IDR"
            });
            sym = 'IDR';
        }
        // Apply changes
        setCurrency(sym, conv);
    });
    // EOF Currency section ++++++++++++++++
    // Count all items

    function cartCounter() {
        var w = parseInt($('#white-amount').val());
        var b = parseInt($('#black-amount').val());
        var t = w + b;
        if (t > 0) {
            //$('#add-to-cart-form').attr('action', 'http://getbandits-com.myshopify.com/cart/4181438916:' + w + ',4181438980:' + b);
            if ($('#cd-cart-trigger').attr('data-icon') == 'cart') {
                $('#cd-cart-trigger').addClass('items-added').find('span').html(t);
            }
            $('#no-list').hide();
            $('.cd-cart-total').fadeIn();
            $('#currency_box, #form-preorder').fadeIn();
            // Chaeck if modal is opened
            if (modal.getState() == 'opened') {
                $('#view-cart-link').fadeIn();
            } else {
                $('#view-cart-link').hide();
            }
        } else {
            $('#add-to-cart-form').attr('action', '');
            $('.cd-cart-total').hide();
            $('.cd-cart').removeClass('items-added');
            $('#view-cart-link').hide();
            $('#currency_box, #form-preorder').hide();
            $('#no-list').fadeIn();
        }
        // begin the currency converter
        var cur = getCurrencyValue();
        if (cur == 'SGD') {
            setCurrency(cur, 28);
        } else if (cur == 'IDR') {
            var val = fx.convert(28, {
                from: "SGD",
                to: "IDR"
            });
            setCurrency(cur, val);
        }
    }

    // Adding product to cart
    function addToCart() {
        var aw = parseInt($('#white-amount').val());
        var ab = parseInt($('#black-amount').val());
        if ((aw == 0) && (ab == 0)) { // if there are no items to add
            $('#white-list').hide();
            $('#black-list').hide();
            $('#currency_box, #form-preorder').hide();
            $('.cd-cart-total').hide();
        } else { // there are items to add
            $('#no-list').hide();
            $('#white-list').hide();
            $('#black-list').hide();
            // Count the white
            if (aw > 0) {
                $('#white-list').show();
                $('#white-item').val(aw);
            }
            // Count the black
            if (ab > 0) {
                $('#black-list').show();
                $('#black-item').val(ab);
            }

            $('#currency_box, #form-preorder').fadeIn();
            // adjusting checked radio button
            var sessCur = $.jStorage.get('cur');
            if (sessCur == 'SGD') {
                $('#radio1').prop('checked', true);
            } else {
                $('#radio2').prop('checked', true);
            }
            cartCounter();
        }
    }

    // Delete product in cart
    function delItem(item) {
        if (item == 'white') {
            $('#white-list').fadeOut();
            $('#white-amount').val(0);
            resetModal('white');
            // recalculating
            cartCounter();
        } else {
            $('#black-list').fadeOut();
            $('#black-amount').val(0);
            resetModal('black');
            // recalculating
            cartCounter();
        }
    }

    // Reset pre-order modal and notif counts
    function resetModal(type) {
        if (type == 'white') {
            $('#white-add').show();
            $('#white-added').hide();
        } else if (type == 'black') {
            $('#black-add').show();
            $('#black-added').hide();
        }
    }

    // Reading Cart Items session
    function readSessionItem() {
        var sessionWh = $.jStorage.get('4181438916');
        var sessionBl = $.jStorage.get('4181438980');
        var a, b;
        if (sessionWh != undefined) {
            $('#white-amount').val(sessionWh);
        }
        if (sessionBl != undefined) {
            $('#black-amount').val(sessionBl);
        }
    }

    // Set session handler
    function setSession() {
        $.jStorage.flush(); //dummy clear
        var x = parseInt($('#white-amount').val());
        var y = parseInt($('#black-amount').val());
        $.jStorage.set('4181438916', x);
        $.jStorage.set('4181438980', y);
        // Adjust cart icon notif
        if ($('#cd-cart-trigger').attr('data-icon') == 'cart') {
            $('#cd-cart-trigger').addClass('items-added');
        }
        $('#cd-cart-trigger > span').text(x + y);
    }

    // Put session handler
    function putSession() {
        var sessionWh = $.jStorage.get('4181438916');
        var sessionBl = $.jStorage.get('4181438980');
        var a, b;
        if (sessionWh != undefined) {
            $('#white-amount').val(sessionWh);
            a = parseInt(sessionWh);
        } else {
            a = 0;
        }
        if (sessionBl != undefined) {
            $('#black-amount').val(sessionBl);
            b = parseInt(sessionBl);
        } else {
            b = 0;
        }
        if (a + b > 0) {
            $('#cd-cart-trigger').addClass('items-added');
            $('#cd-cart-trigger > span').text(a + b);
        }
    }

    // generate cart icon
    function genIcon(type) {
        if (type == 'cart') { // generate close icon
            $('#cd-cart-trigger').find('.first').hide();
            $('#cd-cart-trigger').find('.second').addClass('line1');
            $('#cd-cart-trigger').find('.third').addClass('line2');
            $('#cd-cart-trigger').find('.fourth').hide();
            $('#cd-cart-trigger').attr('data-icon', 'close').removeClass('items-added');
        } else if (type == 'close') { // generate cart icon
            $('#cd-cart-trigger').find('.first').show();
            $('#cd-cart-trigger').find('.second').removeClass('line1');
            $('#cd-cart-trigger').find('.third').removeClass('line2');
            $('#cd-cart-trigger').find('.fourth').show();
            var iqty = parseInt($('#cd-cart-trigger > span').html());
            if (iqty > 0) {
                $('#cd-cart-trigger').attr('data-icon', 'cart').addClass('items-added');
            }
        } else {
            log('ERROR! Can\'t determine icon status');
        }
    }


    $(document).on('opening', '.remodal', function(e) {
        // check if cart is opened
        if ($('#cd-cart').hasClass('speed-in')) {
            $('#cd-cart').removeClass('speed-in');
        }
        // check if cart qty is not 0
        var w = parseInt($('#white-amount').val());
        var b = parseInt($('#black-amount').val());
        var totQty = w + b;
        if (totQty > 0) {
            if (w > 0) {
                $('#white-add').hide();
                $('#modal-qty-white').html(w);
                $('#white-added').show();
            }
            if (b > 0) {
                $('#black-add').hide();
                $('#modal-qty-black').html(b);
                $('#black-added').show();
            }
            $('#view-cart-link').fadeIn();
        } else {
            $('#view-cart-link').hide();
        }

        genIcon('close');
        $('#cd-cart-trigger').attr('data-icon', 'cart');
    });

    // Modal on closing event handler
    $(document).on('closing', '.remodal', function(e) {
        // Reason: 'confirmation', 'cancellation'
        $('.view-cart-link').hide();
        modal.close();
        $('#cd-shadow-layer').removeClass('is-visible');
    });

    // Pre order button handler
    $('.btn-order, .link-order').click(function() {
        modal.open();
    });

    // Pure-white initial add
    $('#white-add').click(function() {
        var w = 1;
        $('#white-amount').val(w);
        $(this).hide();
        $('#modal-qty-white').html(w);
        $('#white-added').show()
        setSession();
        cartCounter();
    });

    // Solid-black initial add
    $('#black-add').click(function() {
        var b = 1;
        $('#black-amount').val(b);
        $(this).hide();
        $('#modal-qty-black').html(b);
        $('#black-added').show()
        setSession();
        cartCounter();
    });

    // Change item qty on modal
    //White
    $('#btn-min-white').click(function() {
        var w = parseInt($('#modal-qty-white').html());
        w--;
        $('#white-amount').val(w);
        if (w == 0) {
            resetModal('white');
            $('#white-list').fadeOut();
        } else {
            $('#modal-qty-white').html(w);
        }
        setSession();
        cartCounter();
    });
    $('#btn-plus-white').click(function() {
        var w = parseInt($('#modal-qty-white').html());
        w++;
        $('#white-amount').val(w);
        $('#modal-qty-white').html(w);
        setSession();
        cartCounter();
    });
    //Black
    $('#btn-min-black').click(function() {
        var b = parseInt($('#modal-qty-black').html());
        b--;
        $('#black-amount').val(b);
        if (b == 0) {
            resetModal('black');
            $('#black-list').fadeOut();
        } else {
            $('#modal-qty-black').html(b);
        }
        setSession();
        cartCounter();
    });
    $('#btn-plus-black').click(function() {
        var b = parseInt($('#modal-qty-black').html());
        b++;
        $('#black-amount').val(b);
        $('#modal-qty-black').html(b);
        setSession();
        cartCounter();
    });
    // Change item qty on CART
    //White
    $('#white-item').bind("keyup change", function() {
        var x = parseInt($(this).val());
        $('#white-amount').val(x);
        if (x == 0) {
            resetModal('white');
            $('#white-list').fadeOut();
        } else {
            $('#modal-qty-white').html(x);
        }
        setSession();
        cartCounter();
    });
    //Black
    $('#black-item').bind("keyup change", function() {
        var x = parseInt($(this).val());
        $('#black-amount').val(x);
        if (x == 0) {
            resetModal('black');
            $('#black-list').fadeOut();
        } else {
            $('#modal-qty-black').html(x);
        }
        setSession();
        cartCounter();
    });

    // Cart handling functions
    $('#cd-shadow-layer').click(function() {
        if ($('#cd-cart').hasClass('speed-in')) {
            genIcon('cart');
        } else {
            genIcon('close');
        }
    });

    $('#cd-cart-trigger').attr('data-click-state', '1');
    $('#cd-cart-trigger').click(function() {

        if ($(this).attr('data-click-state') == 1) {
            $(this).attr('data-click-state', 0);
            $('.cart').addClass('open-modal');
        } else {
            $(this).attr('data-click-state', 1);
            $('.cart').removeClass('open-modal');
        }

        if (modal.getState() == 'opened') {
            modal.close();
        }
        // Do the logic only when cart is about to opened
        if ($('#cd-cart').hasClass('speed-in')) {
            $('#cd-shadow-layer').addClass('is-visible');
            genIcon('cart');
            resetAll(); // dummy reset
            addToCart(); // Let the magic begins...
        } else {
            genIcon('close');
        }
    });

    // View Cart Button
    $('#view-cart-link').click(function() {
        $("#cd-cart-trigger").trigger("click");
    })

    // Close modal handler
    $('.close-btn').click(function() {
        if ($_window.width() < 768) {
            $('.cart').show();
        }
    })

    // Session button
    $('#btn-show-session').click(function() {
        var m, n, o;
        if ($.jStorage.get('4181438916') == undefined) {
            m = 0;
        } else {
            m = $.jStorage.get('4181438916');
        }
        if ($.jStorage.get('4181438980') == undefined) {
            n = 0;
        } else {
            n = $.jStorage.get('4181438980');
        }
        if ($.jStorage.get('cur') == undefined) {
            o = 'No currency in session';
        } else {
            o = $.jStorage.get('cur');
        }
        log('### SESSIONS: White:' + m + '/Black:' + n + '/Currency:' + o + ' ###');
    })
    $('#btn-flush-session').click(function() {
        $.jStorage.flush();
        location.reload(true);
    })
    $('#btn-page-reload').click(function() {
        location.reload(true);
    });


    // trigger Contact Us button click
    $('#btn-contact-us-desktop').click(function() {
        $('#contact-us-desktop').addClass('dialog--open');
    });

    $('#contact-us-desktop > div.dialog__overlay').click(function() {
        var modal = $('#contact-us-desktop');
        if (modal.hasClass('dialog--open')) {
            modal.removeClass('dialog--open');
            modal.addClass('dialog__close');
        } else if (modal.hasClass('dialog__close')) {
            modal.removeClass('dialog--close');
            modal.addClass('open');
        }
    })


    // PHP Ajax submit buttons
    // Send email handler
    $('#btn-submit-desktop').click(function() {
        var data = {
            name: $("#form-name-desktop").val(),
            email: $("#form-email-desktop").val(),
            message: $("#form-message-desktop").val()
        };
        $.ajax({
            type: "POST",
            url: "contact.php",
            data: data,
            success: function(res) {
                // show the response
                // Clear the form
                if (res == 'done') {
                    $('#btn-submit-desktop').html("YOUR EMAIL IS SENT");
                } else {
                    $('#btn-submit-desktop').html("EMAIL FAILED TO SEND");
                }
            }
        });

        // to prevent refreshing the whole page page
        return false;
    });

    // Checkout handler
    $('#btn-checkout').click(function() {
        var wh = $("#white-item").val(),
            bl = $("#black-item").val();

        var link = 'http://getbandits-com.myshopify.com/cart/4181438916:' + wh + ',4181438980:' + bl;

        // fetch remote url
        /*$('div#checkout-modal').fadeOut('slow', function() {
            $('div#checkout-modal').load(link, function() {
                $('#cd-cart-trigger').trigger('click');
                $('div#checkout-modal').fadeIn('slow');
            });
        });*/
        window.location.href = link;

        //$('#checkout-modal').addClass('dialog--open');
        return false;
    });


    // play button video function
    /* var video_url = $('.box-video-url iframe').attr('src');
    var split_url = video_url.split("=");

    $('#play-video-btn').click(function() {
        $('.bg-overlay-video').fadeIn('fast');
        $('.box-video-url iframe').attr('src', split_url[0] + "=1");
    });
    $('.bg-overlay-video').click(function() {
        $(this).hide();
        $('.box-video-url iframe').attr('src', split_url[0] + "=0");
    });

    var heightVideo = $_window.height() - 100;

    $('.bg-overlay-video .box-video-url iframe').css({
        'height': heightVideo
    }); */


    function resize_function(widthSize) {
        $('.dialog__content').css({
            width: widthSize
        });
    }

    var heightViewCartLink = ($_window.height() - 514) / 4;

    // Window resize function
    $_window.resize(function() {
        var desktop = $('#btn-contact-us-desktop');
        var mobile = $('#btn-contact-us-mobile');

        if ($_window.width() <= 768) {
            $('.view-cart-link').css('bottom', '10px');
            $('.btn-order,.view-cart-link,.checkout-btn').removeClass('button--rayen');

            resize_function($_window.width());

        } else {
            $('.view-cart-link').css('bottom', heightViewCartLink);
            $('.btn-order,.view-cart-link,.checkout-btn').addClass('button--rayen');

            resize_function("560px");

        }

        // trigger button click
        $('#btn-contact-us-desktop').click(function() {
            $('#form-contact-us-desktop').formValidation('resetForm', true);
            $('#contact-us-desktop').addClass('dialog--open');
        })
        $('#btn-contact-us-mobile').click(function() {
            $('#form-contact-us-mobile').formValidation('resetForm', true);
            $('#contact-us-mobile').addClass('dialog--open');
        })

        $('#contact-us-desktop > div.dialog__overlay').click(function() {
            var modal = $('#contact-us-desktop');
            if (modal.hasClass('dialog--open')) {
                modal.removeClass('dialog--open');
                modal.addClass('dialog__close');
            } else if (modal.hasClass('dialog__close')) {
                modal.removeClass('dialog--close');
                modal.addClass('open');
            }
        })

        $('#dialog__close').click(function() {
            var modal = $('#contact-us-mobile');
            if (modal.hasClass('dialog--open')) {
                modal.removeClass('dialog--open');
                modal.addClass('dialog__close');
            } else if (modal.hasClass('dialog__close')) {
                modal.removeClass('dialog--close');
                modal.addClass('open');
            }
        })
    });

    // initiate dummy cart reset
    resetInit();
    // initiate session (if there is/are any session(s))
    putSession();
    // Status
    log('DESKTOP.js loaded!');
});
