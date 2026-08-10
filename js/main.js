(function ($) {
    "use strict";

    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();


    // Initiate the wowjs
    new WOW().init();


    // Back to top button + Hire Me floating CTA + Scroll progress bar
    var $backToTop = $('.back-to-top');
    var $hireFloat = $('.hire-float-btn');
    var $progressBar = $('#scrollProgressBar');

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var docHeight = $(document).height() - $(window).height();
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if ($progressBar.length) {
            $progressBar.css('width', progress + '%');
        }

        if (scrollTop > 200) {
            $backToTop.fadeIn('slow');
        } else {
            $backToTop.fadeOut('slow');
        }

        if (scrollTop > 600) {
            $hireFloat.addClass('show');
        } else {
            $hireFloat.removeClass('show');
        }
    });

    $backToTop.click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });


    // Smooth scrolling on the navbar links + close mobile menu on click
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }

            var $collapse = $('#navbarCollapse');
            if ($collapse.hasClass('show')) {
                $collapse.collapse('hide');
            }
        }
    });


    // Typed Initiate
    if ($('.hero .hero-text h2').length == 1) {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Skills - animate bar width and percentage counter together
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });

        $('.skill-percent').each(function () {
            var $el = $(this);
            var target = parseInt($el.attr('data-value'), 10) || 0;
            $({ count: 0 }).animate({ count: target }, {
                duration: 1400,
                easing: 'swing',
                step: function () {
                    $el.text(Math.ceil(this.count) + '%');
                },
                complete: function () {
                    $el.text(target + '%');
                }
            });
        });
    }, {offset: '80%'});


    // Hero stat counters (7+ years, 9+ apps, 6 companies)
    $('.hero-stats').waypoint(function () {
        $('.hero-stat h3').each(function () {
            var $el = $(this);
            var target = parseInt($el.attr('data-count'), 10) || 0;
            $({ count: 0 }).animate({ count: target }, {
                duration: 1600,
                easing: 'swing',
                step: function () {
                    $el.text(Math.ceil(this.count) + '+');
                },
                complete: function () {
                    $el.text(target + '+');
                }
            });
        });
        this.destroy();
    }, {offset: '90%'});


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            }
        }
    });



    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Magnetic hover effect for CTA buttons (desktop / fine-pointer only)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        $('.magnetic').each(function () {
            var $el = $(this);
            $el.on('mousemove', function (e) {
                var rect = this.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                $el.css('transform', 'translate(' + (x * 0.25) + 'px, ' + (y * 0.35) + 'px)');
            });
            $el.on('mouseleave', function () {
                $el.css('transform', 'translate(0, 0)');
            });
        });

        // Tilt effect for cards
        $('.portfolio-wrap, .service-item, .certificate-item, .experience .timeline-text').each(function () {
            var $card = $(this);
            $card.css('will-change', 'transform');
            $card.on('mousemove', function (e) {
                var rect = this.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width - 0.5;
                var y = (e.clientY - rect.top) / rect.height - 0.5;
                var rotateX = (y * -6).toFixed(2);
                var rotateY = (x * 8).toFixed(2);
                $card.css('transform', 'perspective(900px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)');
            });
            $card.on('mouseleave', function () {
                $card.css('transform', '');
            });
        });
    }

})(jQuery);
