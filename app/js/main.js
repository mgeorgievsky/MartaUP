document.addEventListener("DOMContentLoaded", function () {



	$('.header-slider').slick({
		arrows: false,
		vertical: true,
		swipe: true,
		verticalSwiping: true,
		dots: true,
		autoplay: 3000,
		dotsClass: 'header-slider__dots'
	});

	$('.menu__btn').on('click', function() {
		$('.menu__list').slideToggle();
	});

});
