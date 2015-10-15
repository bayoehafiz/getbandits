$(function() {

    $_window = $(window);
    $_height = $_window.height();
    $('.side').css({
        'height': $_window.height() / 2
    });
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

        }
    });

    // generate order modal's text
    $('span#white-add, span#black-add').html('<b>TAP TO ADD</b>');

    // click on logo
    $('.logo').click(function() {
        $.fn.fullpage.moveTo(1);
    });

    // generate session reset btn if on local
    function generateSubmit(host) {
        $('.cd-cart-total').html('<button type="submit" class="checkout-btn">CHECKOUT</button>');
    }

    // generate popup on mobile
    function generatePopup() {
        $('<div data-role="popup" id="mobilePopup"><p>This is a completely basic popup, no options set.</p></div>').appendTo('body');
    }

    // Generate log
    function log(msg) {
        var bar = new $.peekABar({
            autohide: true,
            delay: 3000,
            closeOnClick: true,
            html: msg
        });
        // Display the log (development mode ONLY!)
        if (window.location.host == 'localhost') {
            //bar.show(msg);
            console.log(msg);
        }
    }

    // Currency section +++++++++++++++
    fx.base = "SGD";
    fx.rates = {
        "IDR": 10000,
        "SGD": 1
    }

    Number.prototype.formatMoney = function(c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    function countMe(target, sym, value) { // Special mobile fn
        var target = $('#' + target);
        var val = parseInt(value);
        if (sym == 'SGD') {
            var prefix = '$ ';
            var fSize = '1.5';
            var formattedMoney = (val).formatMoney(2, '.', ',');
        } else if (sym == 'IDR') {
            var prefix = 'Rp ';
            var fSize = '1.2';
            var formattedMoney = (val).formatMoney(0, ',', '.');
        }
        target.html('<span style="font-size:' + fSize + 'em">' + prefix + formattedMoney + '</span>');
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
    // End of currency section +++++++++++++++


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

    // Reading session on DOM
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
    log('Currency status > ' + $.jStorage.get('cur'))

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
        log('Changing currency into ' + sym + '...');
        // Apply changes
        setCurrency(sym, conv);
    });


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
    // Reset pre-order modal and notif counts
    function resetModal(type) {
        log('resetting modal...')
        if (type == 'white') {
            $('#white-add').show();
            $('#white-added').hide();
        } else if (type == 'black') {
            $('#black-add').show();
            $('#black-added').hide();
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
    // Cart counter
    function cartCounter() {
        var w = parseInt($('#white-amount').val());
        var b = parseInt($('#black-amount').val());
        var t = w + b;
        if (t > 0) {
            if (window.location.hostname != 'localhost') {
                $('#add-to-cart-form').attr('action', 'http://getbandits-com.myshopify.com/cart/4181438916:' + w + ',4181438980:' + b);
            }
            if ($('#cd-cart-trigger').attr('data-icon') == 'cart') {
                $('#cd-cart-trigger').addClass('items-added').find('span').html(t);
            }
            $('.cd-cart-total').fadeIn();
            $('#currency_box, #form-preorder').fadeIn();
            $('#no-list').hide();
            // Chaeck if modal is opened
            if (modal.getState() == 'opened') {
                $('#view-cart-link').fadeIn();
            } else {
                $('#view-cart-link').hide();
            }
        } else {
            $('.cd-cart-total').hide();
            $('.no-list').fadeIn();
            $('#add-to-cart-form').attr('action', '');
            $('.cd-cart').removeClass('items-added');
            $('#view-cart-link').hide();
            $('#currency_box, #form-preorder').hide();
            $('#no-list').fadeIn();
        }

        // Generate button based on environment
        var env = window.location.host;
        //generateSubmit(env);

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
        log('Calculating..');
        if ((aw == 0) && (ab == 0)) {
            log('No item added');
            $('#white-list').hide();
            $('#black-list').hide();
            $('.cd-cart-total').hide();
            $('#currency_box, #form-preorder').hide();
        } else {
            $('#no-list').hide();
            $('#white-list').hide();
            $('#black-list').hide();
            // Count the white
            if (aw > 0) {
                log('Adding ' + aw + ' white items into cart...');
                $('#white-list').show();
                wtot = aw * 28;
                $('#white-item').val(aw);
                $('#white-total').text(wtot);
            }
            // Count the black
            if (ab > 0) {
                log('Adding ' + ab + ' black items into cart...');
                $('#black-list').show();
                btot = ab * 28;
                $('#black-item').val(ab);
                $('#black-total').text(btot);
            }
            $('#currency_box, #form-preorder').fadeIn();
            cartCounter();
        }
    }

    // Swipe delete
    function swipeleftHandler(event) {
        log('closing modal....!!!');
        modal.close();
    }

    $("div.remodal-wrapper, div.remodal-overlay").on("swipeleft", swipeleftHandler);

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

    // initiate pre-order modal
    var modal = $('[data-remodal-id=pre-order]').remodal();
    $('<button id="view-cart-link" class="btn view-cart-link button--rayen" data-text="VIEW CART" href="#cart">VIEW CART</button>').insertAfter('div[data-remodal-id="pre-order"]');
    $('<div class="close-btn" id="cd-close-btn" data-remodal-action="close"><div class="box-close-preorder"><div class="close-preorder first"></div><div class="close-preorder second"></div></div></div>').appendTo('.remodal-wrapper');
    $('.logo').show();
    genIcon('close');

    // Modal opening 
    $(document).on('opening', '.remodal', function() {
        // btn view cart hide
        $('#view-cart-link').hide();

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
    });
    $(document).on('closing', '.remodal', function() {
        $('.cart').show();
        if ($('#cd-cart').hasClass('speed-in')) {
            $('.cart').hide();
        };
    });
    $('.link-order').click(function() {
        $("#cd-cart-trigger").trigger("click");
    });
    // Pre order button handler
    $('.btn-order, .link-order').click(function() {
        var cart = $('#cd-cart');
        if (cart.hasClass('speed-in')) {
            $('#cd-cart').removeClass('speed-in');
        }
        cartCounter();
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
    $('div#image-item-white').on('tap', function() {
        console.log('WHITE TAPPED!');
    })
    // Solid-black initial add
    $('#black-add').click(function() {
        var b = 1;
        $('#black-amount').val(b);
        $(this).hide();
        $('#modal-qty-black').html(b);
        $('#black-added').show();
        setSession();
        cartCounter();
    });
    $('div#image-item-black').on('tap', function() {
        console.log('BLACK TAPPED!');
    })

    // Change item qty on modal
    //White
    $('#btn-min-white').click(function() {
        var w = parseInt($('#modal-qty-white').html());
        w--;
        $('#white-amount').val(w);
        if (w == 0) {
            resetModal('white');
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
    $('#black-item').bind("keyup change", function() {
        var x = parseInt($(this).val());
        $('#black-amount').val(x);
        if (x == 0) {
            resetModal('black');
            $('#black-list').fadeOut();
        } else {
            $('#modal-qty-white').html(x);
        }
        setSession();
        cartCounter();
    });
    $('#white-item').bind("keyup change", function() {
        var x = parseInt($(this).val());
        $('#white-amount').val(x);
        if (x == 0) {
            resetModal('white');
            $('#white-list').fadeOut();
        } else {
            $('#modal-qty-black').html(x);
        }
        setSession();
        cartCounter();
    });
    // Shopping cart handler
    $('#cd-cart-trigger').attr('data-click-state', '1');
    $('#cd-cart-trigger').click(function() {
        if ($(this).attr('data-click-state') == 1) {
            $(this).attr('data-click-state', 0);
            $('.cart').addClass('open-modal');
            $(this).children('div:nth-child(1)').hide();
            $(this).children('div:nth-child(2)').addClass('line1');
            $(this).children('div:nth-child(3)').addClass('line2');
            $(this).children('div:nth-child(4)').hide();
            $('.cd-cart.items-added span').hide();
        } else {
            $(this).attr('data-click-state', 1);
            $('.cart').removeClass('open-modal');
            $(this).children('div:nth-child(1)').show();
            $(this).children('div:nth-child(2)').removeClass('line1');
            $(this).children('div:nth-child(3)').removeClass('line2');
            $(this).children('div:nth-child(4)').show();
            $('.cd-cart.items-added span').show();
        }
        // Do the logic only when cart is about to open
        if ($('#cd-cart').hasClass('speed-in')) {
            resetAll(); // dummy reset
            addToCart(); // Let the magic begins...
            $('.logo').hide();
        } else {
            $('.logo').show();
            resetAll();
        }
    });
    // View Cart Button
    $('#view-cart-link').click(function() {
            log('Opening cart from modal..');
            $("#cd-cart-trigger").trigger("click");
            modal.close();
            $('.cart').show();
        })
        // Close modal handler
    $('.close-btn').click(function() {
            log('Close button pressed!');
            if ($_window.width() < 768) {
                $('.cart').show();
                log('cart 4 show');
            }
        })
        /*$('.cd-cart').css({
        'background': 'url(img/cd-icon-cart-grey-mobile.svg) no-repeat center center'
        });*/

    if (modal.getState() == 'opening') {
        $('.cart').hide();
        log('cart 6 hide');
    } else {
        $('.cart').show();
        log('cart 7 show');
    }

    $('#play-video-btn').click(function() {
        $('.bg-overlay-video').fadeIn('fast');
    });
    $('.bg-overlay-video').click(function() {
        $(this).hide();
    });


    // Contact us button trigger
    $('#btn-contact-us-mobile').click(function() {
        $('#contact-us-mobile').addClass('dialog--open');
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

    // Contact us submit button
    var l = Ladda.create(document.querySelector('#btn-submit-mobile'));
    // Send email handler
    $('#btn-submit-mobile').click(function() {
        var data = {
            name: $("#form-name-mobile").val(),
            email: $("#form-email-mobile").val(),
            message: $("#form-message-mobile").val()
        };
        l.start();
        $.ajax({
                type: "POST",
                url: "contact.php",
                data: data
            })
            .done(function(data) {
                // show the response
                $('#btn-submit-mobile > span.ladda-label').html('EMAIL SENT!');
                l.stop();
            });
        // to prevent refreshing the whole page page
        return false;
    });

    // Send email handler
    $('#btn-checkout').click(function() {
        var wh = $("#white-item").val(),
            bl = $("#black-item").val();

        // redirect to shopify
        window.location = 'http://getbandits-com.myshopify.com/cart/4181438916:' + wh + ',4181438980:' + bl;

        return false;
    });


    // Session buttons
    $('#btn-show-session').click(function() {
        var m, n, o;
        if ($.jStorage.get('4181438916') == undefined) {
            m = 'NULL';
        } else {
            m = $.jStorage.get('4181438916');
        }
        if ($.jStorage.get('4181438980') == undefined) {
            n = 'NULL';
        } else {
            n = $.jStorage.get('4181438980');
        }
        if ($.jStorage.get('cur') == undefined) {
            o = 'NOT SET';
        } else {
            o = $.jStorage.get('cur');
        }
        log('### SESSIONS: <br/>- White: ' + m + ' <br/>- Black: ' + n + ' <br/>- Currency: ' + o);
    })
    $('#btn-flush-session').click(function() {
        $.jStorage.flush();
        location.reload(true);
    })
    $('#btn-page-reload').click(function() {
        location.reload(true);
    });

    $('.btn-order,.view-cart-link,.checkout-btn').removeClass('button--rayen');

    function resize_function(widthSize) {
        $('.dialog__content').css({
            width: widthSize
        });
    }

    var heightViewCartLink = ($_window.height() - 514) / 4;

    resize_function($_window.width());


    $_window.resize(function() {
        var desktop = $('#btn-contact-us-mobile');
        var mobile = $('#btn-contact-us-mobile');

        if ($_window.width() <= 768) {

            $('.view-cart-link').css('bottom', '10px');
            $('.btn-order,.view-cart-link,.checkout-btn').removeClass('button--rayen');

            // Contact us button handler
            mobile.attr('data-dialog', 'contact-us-mobile');
            desktop.removeAttr('data-dialog');
            console.log('Desktop: ' + desktop.attr('data-dialog') + ', Mobile: ' + mobile.attr('data-dialog'));

            resize_function($_window.width());
        } else {

            $('.view-cart-link').css('bottom', heightViewCartLink);
            $('.btn-order,.view-cart-link,.checkout-btn').addClass('button--rayen');

            // Contact us button handler
            desktop.attr('data-dialog', 'contact-us-mobile');
            mobile.removeAttr('data-dialog');
            console.log('Desktop: ' + desktop.attr('data-dialog') + ', Mobile: ' + mobile.attr('data-dialog'));

            resize_function("560px");
        }

        // trigger button click
        $('#btn-contact-us-mobile').click(function() {
            $('#contact-us-mobile').addClass('dialog--open');
        })
        $('#btn-contact-us-mobile').click(function() {
            $('#contact-us-mobile').addClass('dialog--open');
        })

        $('#contact-us-mobile > div.dialog__overlay').click(function() {
            var modal = $('#contact-us-mobile');
            if (modal.hasClass('dialog--open')) {
                modal.removeClass('dialog--open');
                modal.addClass('dialog__close');
            } else if (modal.hasClass('dialog__close')) {
                modal.removeClass('dialog--close');
                modal.addClass('open');
            }
        })

        $('#dialog__close').click(function() {
            log('About to close this damn dialog...!!!')
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


    /*(function() {

        var dlgtrigger = document.querySelector('[data-dialog]'),
            somedialog = document.getElementById(dlgtrigger.getAttribute('data-dialog')),
            dlg = new DialogFx(somedialog);

        dlgtrigger.addEventListener('click', dlg.toggle.bind(dlg));

    })();*/

    // initiate dummy cart reset
    resetInit();
    // initiate session (if there is/are any session(s))
    putSession();
    // read items session
    readSessionItem();

    // Status
    log('Mobile.js loaded!');
});
