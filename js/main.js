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
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
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
    
    
    // Smooth scrolling on the navbar links
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
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


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
    
    
    
    // Portfolio carousel
    var $portfolioCarousel = $('.portfolio-carousel');
    var portfolioAllItems = $portfolioCarousel.children('.portfolio-item').clone(true, true);

    function renderPortfolioCarousel(filterSelector) {
        if ($portfolioCarousel.hasClass('owl-loaded')) {
            $portfolioCarousel.trigger('destroy.owl.carousel');
            $portfolioCarousel
                .removeClass('owl-loaded owl-drag owl-hidden owl-responsive owl-center owl-loading owl-text-select-on owl-grab')
                .empty();
        }

        var itemsToShow = filterSelector === '*' ? portfolioAllItems : portfolioAllItems.filter(filterSelector);
        $portfolioCarousel.append(itemsToShow.clone(true, true));

        $portfolioCarousel.owlCarousel({
            center: true,
            loop: itemsToShow.length > 2,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            dots: true,
            nav: true,
            navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
            margin: 20,
            responsive: {
                0: { items: 1, nav: false },
                576: { items: 2, nav: false },
                768: { items: 2, nav: true },
                992: { items: 3, nav: true }
            }
        });
    }

    renderPortfolioCarousel('*');

    $('#portfolio-filter li').on('click', function () {
        $('#portfolio-filter li').removeClass('filter-active');
        $(this).addClass('filter-active');
        renderPortfolioCarousel($(this).data('filter'));
    });

})(jQuery);

