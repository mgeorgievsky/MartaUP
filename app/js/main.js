document.addEventListener("DOMContentLoaded", function () {

	const sliderTransitionDelay = 500;                              // Set the transition delay here
	const autoPlaySpeed = 3000;                                     // 0 for disabled
	const slidesNumber = $('.header-slider').children().length;     // get the number of slides
	let timeoutHandler;                                             // variable for handling the timeouts

	console.log(slidesNumber);

	$('.header-slider').slick({
		arrows: false,
		vertical: false,
		swipe: false,
		dots: false,
		autoplay: autoPlaySpeed,
	});

	$('.header-slider').append('<ul class="header-slider__dots"></ul>');
	for (let i = 0; i < slidesNumber; i++) {
		let dot = '<li><button class="header-slider__dot" data-slide-index="' + i + '">' + i + '</button></li>';
		$('.header-slider__dots').append(dot);
	}

	// Changing the slide by clicking the dot
	// BUG: if current dot is clicked it stops autoplay (cuz timeout is cleared)
	$('.header-slider__dot').click(function (e) {

		clearTimeout(timeoutHandler);   // Clearing timeout for preventing unwanted slide transitions and animations.

		let currentSlideIndex = $('.header-slider').slick('slickCurrentSlide'),
			targetSlideIndex = $(e.target).attr('data-slide-index');    // Getting an index of a target slide

		// Doing some actions here, i.e. animations
		if (targetSlideIndex != currentSlideIndex) {    // changing the slide only when clicking not current dot
			$('.header-slider__item-content')
				.removeClass('animate__animated animate__backInUp')
				.hide()
				.addClass('animate__animated animate__backOutUp')
				.show();

			// Delay until the slide is changed
			setTimeout(() => {
				$('.header-slider').slick('slickGoTo', targetSlideIndex);
			}, sliderTransitionDelay)
		}

	});

	let dotCurrent = $('.header-slider__dots li button').first();  // Initial dot
	dotCurrent.addClass('header-slider__dot--current');

	// First slide when autoplay is enabled
	if (autoPlaySpeed != 0) {
		$('.header-slider').slick('slickPause');
		setTimeout(() => {
			$('.header-slider__item-content')
				.removeClass('animate__animated animate__backInUp')
				.hide()
				.addClass('animate__animated animate__backOutUp')
				.show();
		}, autoPlaySpeed)
		setTimeout(() => {
			$('.header-slider').slick('slickNext');
		}, autoPlaySpeed + sliderTransitionDelay)
	}

	// Some actions after slide is changed
	$('.header-slider').on('afterChange', (event, slick, direction) => {

		if (autoPlaySpeed != 0) $('.header-slider__inner').slick('slickPause');

		// Changing the active dot
		let currentSlide = $('.header-slider').slick('slickCurrentSlide');
		dotCurrent.removeClass('header-slider__dot--current');
		$('.header-slider__dots li button').eq(currentSlide).addClass('header-slider__dot--current');
		dotCurrent = $('.header-slider__dots li button').eq(currentSlide);

		$('.header-slider__item-content')
			.removeClass('animate__animated animate__backOutUp')
			.hide()
			.addClass('animate__animated animate__backInUp')
			.show();


		if (autoPlaySpeed != 0) {   //
			timeoutHandler = setTimeout(() => {
				$('.header-slider__item-content')
					.removeClass('animate__animated animate__backInUp')
					.hide()
					.addClass('animate__animated animate__backOutUp')
					.show();
				console.log('transition started');
				setTimeout(() => {
					$('.header-slider').slick('slickNext');
				}, sliderTransitionDelay)
			}, autoPlaySpeed)
		}


	})

});
