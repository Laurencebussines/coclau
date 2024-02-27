(function ($) {
	("use strict");

	/*------------- preloader js --------------*/
	function loader() {
		$(window).on("load", function () {
			$("#ctn-preloader").addClass("loaded");
			$("#loading").fadeOut(500);
			// Una vez haya terminado el preloader aparezca el scroll

			if ($("#ctn-preloader").hasClass("loaded")) {
				// Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
				$("#preloader")
					.delay(900)
					.queue(function () {
						$(this).remove();
					});
			}
		});
	}
	loader();

	$(".category-toggle-btn").click(function () {
		$(".category-list").slideToggle();
	});

	// meanmenu
	$("#mobile-menu").meanmenu({
		meanMenuContainer: ".mobile-menu",
		meanScreenWidth: "992",
	});

	$(".open-mobile-menu").on("click", function () {
		$(".side-info").addClass("info-open");
		$(".offcanvas-overlay").addClass("overlay-open");
	});

	$(
		".side-info-close,.offcanvas-overlay,.mobile_one_page li.menu-item a.nav-link"
	).on("click", function () {
		$(".side-info").removeClass("info-open");
		$(".offcanvas-overlay").removeClass("overlay-open");
	});

	// wishlist-action
	$(".view-wishlist-button").on("click", function (event) {
		event.preventDefault();
		$(".product-action-sidebar-wishlist").addClass("active");
		$(".offcanvas-overlay").addClass("overlay-open");
	});
	$(".offcanvas-overlay").on("click", function (event) {
		event.preventDefault();
		$(".product-action-sidebar-wishlist").removeClass("active");
		$(".offcanvas-overlay").removeClass("overlay-open");
	});

	// cart-action
	$(".view-cart-button").on("click", function (event) {
		event.preventDefault();
		$(".product-action-sidebar-cart").addClass("active");
		$(".offcanvas-overlay").addClass("overlay-open");
	});
	$(".offcanvas-overlay").on("click", function (event) {
		event.preventDefault();
		$(".product-action-sidebar-cart").removeClass("active");
		$(".offcanvas-overlay").removeClass("overlay-open");
	});

	$(window).on("scroll", function () {
		var scroll = $(window).scrollTop();
		if (scroll < 245) {
			$("#header-sticky").removeClass("sticky-header");
		} else {
			$("#header-sticky").addClass("sticky-header");
		}
	});

	// data - background
	$("[data-background]").each(function () {
		$(this).css(
			"background-image",
			"url(" + $(this).attr("data-background") + ")"
		);
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});

	// menu-last class
	$("ul.basic-menu > li").slice(-2).addClass("menu-last");

	/* Search
	-------------------------------------------------------*/
	var $searchWrap = $(".search-wrap");
	var $navSearch = $(".nav-search");
	var $searchClose = $("#search-close");

	$(".search-trigger").on("click", function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: "toggle" }, 500);
		$navSearch.add($searchClose).addClass("open");
	});

	$(".search-close").on("click", function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: "toggle" }, 500);
		$navSearch.add($searchClose).removeClass("open");
	});

	function closeSearch() {
		$searchWrap.fadeOut(200);
		$navSearch.add($searchClose).removeClass("open");
	}

	$(document.body).on("click", function (e) {
		closeSearch();
	});

	$(".search-trigger, .main-search-input").on("click", function (e) {
		e.stopPropagation();
	});

	// Activate rtl slider
	let rtl_setting = $("body").hasClass("rtl") ? true : false;

	// mainSlider
	function mainSlider() {
		var CarouselWidgetHandler = function () {
			$("[data-background]").each(function () {
				$(this).css(
					"background-image",
					"url(" + $(this).attr("data-background") + ")"
				);
			});

			var BasicSlider = $(".slider-active");
			BasicSlider.on("init", function (e, slick) {
				var $firstAnimatingElements = $(
					".single-slider:first-child"
				).find("[data-animation]");
				doAnimations($firstAnimatingElements);
			});
			BasicSlider.on(
				"beforeChange",
				function (e, slick, currentSlide, nextSlide) {
					var $animatingElements = $(
						'.single-slider[data-slick-index="' + nextSlide + '"]'
					).find("[data-animation]");
					doAnimations($animatingElements);
				}
			);
			BasicSlider.slick({
				autoplay: false,
				autoplaySpeed: 10000,
				dots: false,
				fade: true,
				arrows: true,
				rtl: rtl_setting,
				focusOnSelect: false,
				prevArrow:
					'<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
				nextArrow:
					'<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							infinite: true,
						},
					},
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							arrows: false,
						},
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							arrows: false,
						},
					},
				],
			});
		};

		function doAnimations(elements) {
			var animationEndEvents =
				"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
			elements.each(function () {
				var $this = $(this);
				var $animationDelay = $this.data("delay");
				var $animationType = "animated " + $this.data("animation");
				$this.css({
					"animation-delay": $animationDelay,
					"-webkit-animation-delay": $animationDelay,
				});
				$this
					.addClass($animationType)
					.one(animationEndEvents, function () {
						$this.removeClass($animationType);
					});
			});
		}

		//# Make sure you run this code under Elementor..
		$(window).on("elementor/frontend/init", function () {
			elementorFrontend.hooks.addAction(
				"frontend/element_ready/bdevs-slider.default",
				CarouselWidgetHandler
			);
		});
	}
	mainSlider();

	var MembershipWidgetHandler = function () {
		// test-active
		$(".test-active").owlCarousel({
			loop: true,
			margin: 30,
			items: 1,
			navText: [
				'<i class="fa fa-angle-left"></i>',
				'<i class="fa fa-angle-right"></i>',
			],
			nav: false,
			dots: false,
			rtl: rtl_setting,
			responsive: {
				0: {
					items: 1,
				},
				767: {
					items: 1,
				},
				992: {
					items: 2,
				},
				1200: {
					items: 3,
				},
			},
		});
	};

	//# Make sure you run this code under Elementor..
	$(window).on("elementor/frontend/init", function () {
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/bdevs-premium-membership.default",
			MembershipWidgetHandler
		);
	});

	var TestWidgetHandler = function () {
		// testimonials-active-2
		$(".testimonials-activation-2").slick({
			dots: false,
			arrows: false,
			infinite: false,
			speed: 300,
			slidesToShow: 1,
			focusOnSelect: false,
			rtl: rtl_setting,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
						dots: false,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 2,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
			],
		});

		// testimonials-active
		$(".testimonials-activation").slick({
			dots: false,
			arrows: false,
			infinite: false,
			speed: 300,
			slidesToShow: 2,
			focusOnSelect: false,
			rtl: rtl_setting,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
						dots: false,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 2,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
			],
		});
	};

	//# Make sure you run this code under Elementor..
	$(window).on("elementor/frontend/init", function () {
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/bdevs-testimonials.default",
			TestWidgetHandler
		);
	});

	// review-box8-activation
	$(".review-box8-active").slick({
		dots: true,
		arrows: true,
		infinite: false,
		speed: 300,
		slidesToShow: 1,
		focusOnSelect: false,
		slidesToScroll: 1,
		prevArrow:
			'<button type="button" class="slick-prev slide8-button"><i class="fal fa-angle-left"></i></button>',
		nextArrow:
			'<button type="button" class="slick-next slide8-button"><i class="fal fa-angle-right"></i></button>',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		],
	});

	var BrandWidgetHandler = function () {
		// owlCarousel
		$(".brand-active").owlCarousel({
			loop: true,
			margin: 30,
			items: 1,
			navText: [
				'<i class="fa fa-angle-left"></i>',
				'<i class="fa fa-angle-right"></i>',
			],
			nav: false,
			rtl: rtl_setting,
			dots: false,
			responsive: {
				0: {
					items: 2,
				},
				767: {
					items: 4,
				},
				992: {
					items: 5,
				},
				1200: {
					items: 5,
				},
			},
		});
	};

	// owlCarousel
	$(".brand-active2").owlCarousel({
		loop: true,
		margin: 30,
		items: 1,
		navText: [
			'<i class="fa fa-angle-left"></i>',
			'<i class="fa fa-angle-right"></i>',
		],
		nav: false,
		rtl: rtl_setting,
		dots: false,
		responsive: {
			0: {
				items: 2,
			},
			767: {
				items: 4,
			},
			992: {
				items: 5,
			},
			1200: {
				items: 6,
			},
		},
	});

	// owlCarousel
	$(".brand-active3").owlCarousel({
		loop: true,
		margin: 30,
		items: 1,
		navText: [
			'<i class="fa fa-angle-left"></i>',
			'<i class="fa fa-angle-right"></i>',
		],
		nav: false,
		rtl: rtl_setting,
		dots: false,
		responsive: {
			0: {
				items: 2,
			},
			767: {
				items: 4,
			},
			992: {
				items: 5,
			},
			1200: {
				items: 6,
			},
		},
	});

	//# Make sure you run this code under Elementor..
	$(window).on("elementor/frontend/init", function () {
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/bdevs-brand.default",
			BrandWidgetHandler
		);
	});

	// blog - active
	$(".postbox__gallery").slick({
		dots: false,
		arrows: true,
		infinite: true,
		speed: 300,
		prevArrow:
			'<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
		nextArrow:
			'<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
		slidesToShow: 1,
		slidesToScroll: 1,
		rtl: rtl_setting,
		focusOnSelect: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	});

	var ServiceWidgetHandler = function () {
		// h4service - active
		$(".h4service-active").slick({
			dots: true,
			arrows: true,
			infinite: true,
			speed: 300,
			prevArrow:
				'<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
			nextArrow:
				'<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
			slidesToShow: 3,
			focusOnSelect: false,
			rtl: rtl_setting,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true,
						arrows: false,
					},
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
					},
				},
			],
		});
	};
	//# Make sure you run this code under Elementor..
	$(window).on("elementor/frontend/init", function () {
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/bdevs-service-post.default",
			ServiceWidgetHandler
		);
	});

	var GalleryWidgetHandler = function () {
		// h4gallery - active
		$(".h4gallery-active").slick({
			dots: true,
			arrows: true,
			infinite: true,
			speed: 300,
			prevArrow:
				'<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
			nextArrow:
				'<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
			slidesToShow: 2,
			focusOnSelect: false,
			rtl: rtl_setting,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true,
					},
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
					},
				},
			],
		});

		// h4gallery-three-active
		$(".gallery-slider-active").slick({
			dots: false,
			arrows: true,
			infinite: true,
			speed: 300,
			prevArrow:
				'<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
			nextArrow:
				'<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
			slidesToShow: 4,
			focusOnSelect: false,
			rtl: rtl_setting,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true,
						arrows: true,
					},
				},
				{
					breakpoint: 1400,
					settings: {
						slidesToShow: 3,
						arrows: true,
					},
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 2,
						arrows: true,
					},
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						arrows: true,
					},
				},
			],
		});
	};
	//# Make sure you run this code under Elementor..
	$(window).on("elementor/frontend/init", function () {
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/bdevs-carousel.default",
			GalleryWidgetHandler
		);
	});

	$(".product-active").slick({
		dots: false,
		arrows: false,
		infinite: false,
		speed: 300,
		prevArrow:
			'<button type="button" class="slick-prev"><i class="fas fa-long-arrow-alt-left"></i><span>next</span></button>',
		nextArrow:
			'<button type="button" class="slick-next"><i class="fas fa-long-arrow-alt-right"></i><span>prev</span></button>',
		slidesToShow: 4,
		rtl: rtl_setting,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	/* magnificPopup video view */
	$(".popup-video").magnificPopup({
		type: "iframe",
	});

	// isotop
	$(".blog-masonry").imagesLoaded(function () {
		// init Isotope
		var $grid = $(".blog-masonry").isotope({
			itemSelector: ".grid-item",
			percentPosition: true,
			masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: ".grid-item",
			},
		});
	});

	// isotop
	$(".row-portfolio").imagesLoaded(function () {
		// init Isotope
		var $grid = $(".row-portfolio").isotope({
			itemSelector: ".grid-item",
			percentPosition: true,
			masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: ".grid-sizer",
			},
		});

		// filter items on button click
		$(".portfolio-filter").on("click", "button", function () {
			var filterValue = $(this).attr("data-filter");
			$grid.isotope({ filter: filterValue });
		});
	});

	// isotop
	$(".gallery-portfolio").imagesLoaded(function () {
		// init Isotope
		var $grid = $(".gallery-portfolio").isotope({
			itemSelector: ".grid-gallery",
			percentPosition: true,
		});
		// filter items on button click
		$(".gallery-filter").on("click", "button", function () {
			var filterValue = $(this).attr("data-filter");
			$grid.isotope({ filter: filterValue });
		});
		//for menu active class
		$(".gallery-filter button").on("click", function (event) {
			$(this).siblings(".active").removeClass("active");
			$(this).addClass("active");
			event.preventDefault();
		});
	});

	// isotop
	$(".gallery8-portfolio").imagesLoaded(function () {
		// init Isotope
		var $grid = $(".gallery8-portfolio").isotope({
			itemSelector: ".grid-gallery",
			percentPosition: true,
		});
		// filter items on button click
		$(".gallery8-filter").on("click", "button", function () {
			var filterValue = $(this).attr("data-filter");
			$grid.isotope({ filter: filterValue });
		});
		//for menu active class
		$(".gallery8-filter button").on("click", function (event) {
			$(this).siblings(".active").removeClass("active");
			$(this).addClass("active");
			event.preventDefault();
		});
	});

	//for menu active class
	$(".portfolio-filter button").on("click", function (event) {
		$(this).siblings(".active").removeClass("active");
		$(this).addClass("active");
		event.preventDefault();
	});

	// counterUP
	$(".counter").counterUp({
		delay: 10,
		time: 1000,
	});

	var TeamWidgetHandler = function () {
		// team-active
		$(".team-activation").slick({
			dots: true,
			infinite: false,
			speed: 300,
			arrows: false,
			slidesToShow: 6,
			focusOnSelect: false,
			rtl: rtl_setting,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
						infinite: true,
						dots: true,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 2,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					},
				},
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
			],
		});
	};

	//# Make sure you run this code under Elementor..
	$(window).on("elementor/frontend/init", function () {
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/bdevs-member-post.default",
			TeamWidgetHandler
		);
	});

	//best-sell-products-slider
	$(".best-sell-products-active").slick({
		infinite: false,
		arrows: true,
		autoplay: false,
		dots: false,
		speed: 700,
		autoplaySpeed: 3000,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow:
			'<button type="button" class="slick-prev sl-btn-circle"><i class="fal fa-angle-left"></i></button>',
		nextArrow:
			'<button type="button" class="slick-next sl-btn-circle"><i class="fal fa-angle-right"></i></button>',
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				},
			},
		],
	});

	//category-tab-slider
	$(".category-tab-active").slick({
		infinite: false,
		arrows: true,
		autoplay: true,
		dots: false,
		speed: 700,
		autoplaySpeed: 3000,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow:
			'<button type="button" class="slick-prev sl-btn-circle"><i class="fal fa-angle-left"></i></button>',
		nextArrow:
			'<button type="button" class="slick-next sl-btn-circle"><i class="fal fa-angle-right"></i></button>',
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				},
			},
		],
	});

	//producs-available-slider
	$(".product-available-active").slick({
		infinite: false,
		arrows: true,
		autoplay: true,
		dots: false,
		speed: 700,
		autoplaySpeed: 3000,
		slidesToShow: 5,
		slidesToScroll: 1,
		prevArrow:
			'<button type="button" class="slick-prev sl-btn-circle"><i class="fal fa-angle-left"></i></button>',
		nextArrow:
			'<button type="button" class="slick-next sl-btn-circle"><i class="fal fa-angle-right"></i></button>',
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
				},
			},
		],
	});

	//top-rated-products-slider
	$(".top-rated-products-active").slick({
		infinite: false,
		arrows: true,
		autoplay: true,
		dots: false,
		speed: 700,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		rows: 3,
		slidesToScroll: 1,
		prevArrow:
			'<button type="button" class="slick-prev sl-btn-small"><i class="fal fa-angle-left"></i></button>',
		nextArrow:
			'<button type="button" class="slick-next sl-btn-small"><i class="fal fa-angle-right"></i></button>',
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	//top-rated-products-slider
	$(".top-seller-products-active").slick({
		infinite: false,
		arrows: true,
		autoplay: true,
		dots: false,
		speed: 700,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow:
			'<button type="button" class="slick-prev sl-btn-small"><i class="fal fa-angle-left"></i></button>',
		nextArrow:
			'<button type="button" class="slick-next sl-btn-small"><i class="fal fa-angle-right"></i></button>',
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	//top-rated-products-slider
	$(".feedback-active").slick({
		infinite: false,
		arrows: true,
		autoplay: true,
		dots: false,
		speed: 700,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow:
			'<button type="button" class="slick-prev sl-btn-small"><i class="fal fa-angle-left"></i></button>',
		nextArrow:
			'<button type="button" class="slick-next sl-btn-small"><i class="fal fa-angle-right"></i></button>',
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	//dotd-product-active-slider
	$(".dotd-product-active").slick({
		infinite: false,
		arrows: true,
		autoplay: true,
		dots: false,
		speed: 700,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow:
			'<button type="button" class="slick-prev sl-btn-circle"><i class="fal fa-angle-left"></i></button>',
		nextArrow:
			'<button type="button" class="slick-next sl-btn-circle"><i class="fal fa-angle-right"></i></button>',
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	// scrollToTop
	$.scrollUp({
		scrollName: "scrollUp", // Element ID
		topDistance: "300", // Distance from top before showing element (px)
		topSpeed: 300, // Speed back to top (ms)
		animation: "fade", // Fade, slide, none
		animationInSpeed: 200, // Animation in speed (ms)
		animationOutSpeed: 200, // Animation out speed (ms)
		scrollText: '<i class="fas fa-chevron-up"></i>', // Text for element
		activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	});

	// WOW active
	new WOW().init();

	/*-------------------------
		showlogin toggle function
	--------------------------*/
	$("#showlogin").on("click", function () {
		$("#checkout-login").slideToggle(900);
	});

	/*-------------------------
		showcoupon toggle function
	--------------------------*/
	$("#showcoupon").on("click", function () {
		$("#checkout_coupon").slideToggle(900);
	});

	/*-------------------------
		Create an account toggle function
	--------------------------*/
	$("#cbox").on("click", function () {
		$("#cbox_info").slideToggle(900);
	});

	/*-------------------------
		Create an account toggle function
	--------------------------*/
	$("#ship-box").on("click", function () {
		$("#ship-box-info").slideToggle(1000);
	});

	// cart-plus-minus
	$(".cart-plus-minus").append(
		'<div class="qtybutton minus">-</div><div class="qtybutton plus">+</div>'
	);

	$(".cart-plus-minus").on(
		"click",
		".qtybutton.plus, .qtybutton.minus",
		function () {
			// Get current quantity values
			var qty = $(this).closest(".cart-plus-minus").find(".qty");
			var val = parseFloat(qty.val());
			var max = parseFloat(qty.attr("max"));
			var min = parseFloat(qty.attr("min"));
			var step = parseFloat(qty.attr("step"));

			// Change the value if plus or minus
			if ($(this).is(".plus")) {
				if (max && max <= val) {
					qty.val(max);
				} else {
					qty.val(val + step).trigger("change");
				}
			} else {
				if (min && min >= val) {
					qty.val(min);
				} else if (val > 1) {
					qty.val(val - step).trigger("change");
				}
			}
		}
	);

	// map
	function basicmap() {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 11,
			scrollwheel: false,
			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(40.67, -73.94), // New York
			// This is where you would paste any style found on Snazzy Maps.
			styles: [
				{ stylers: [{ hue: "#dd0d0d" }] },
				{
					featureType: "road",
					elementType: "labels",
					stylers: [{ visibility: "off" }],
				},
				{
					featureType: "road",
					elementType: "geometry",
					stylers: [{ lightness: 100 }, { visibility: "simplified" }],
				},
			],
		};
		// Get the HTML DOM element that will contain your map
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById("contact-map");

		// Create the Google Map using our element and options defined above
		var map = new google.maps.Map(mapElement, mapOptions);

		// Let's also add a marker while we're at it
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(40.67, -73.94),
			map: map,
			title: "Cryptox",
		});
	}
	if ($("#contact-map").length != 0) {
		google.maps.event.addDomListener(window, "load", basicmap);
	}

	$("[data-countdown]").each(function () {
		var $this = $(this),
			finalDate = $(this).data("countdown");
		$this.countdown(finalDate, function (event) {
			$this.html(
				event.strftime(
					'<div class="count_down">%D<span></span></div><div class="count_down">%H<span></span></div><div class="count_down">%M<span></span></div><div class="count_down">%S<span></span></div>'
				)
			);
		});
	});
})(jQuery);