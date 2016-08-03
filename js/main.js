$(document).ready(function() {
	
	var $myNavbar = $("#fixedMenu");
	$(window).scroll(function() {
		if ($(this).scrollTop() > 240 && $myNavbar.hasClass("normalize")) {
			$myNavbar.fadeOut(300,function() {
				$(this).removeClass("normalize")
				.addClass("fixed")
				.fadeIn(300);
			});
		} else if ($(this).scrollTop() <= 240 && $myNavbar.hasClass("fixed")) {
			$myNavbar.fadeOut(300,function()	{
				$(this).removeClass("fixed")
					.addClass("normalize")
					.fadeIn(300);
			});
		}
	});			


	$('.carousel').carousel({
        interval: 3000
    });

    $('#scrollup img').mouseover( function scrollUp() {
		$(scrollUp()).animate( {
			opacity: 0.65
		},100);
	}).mouseout( function() {
		$(scrollUp()).animate( {
			opacity: 1
		},100);
	}).click( function scrollUp() {
		$('body,html').animate( { 
			scrollTop: 0 
		}, 400);
		return false;
	});

	$(window).scroll(function() {
		if ($(document).scrollTop() > 0) {
			$('#scrollup').fadeIn('fast');
		} else {
			$('#scrollup').fadeOut('fast');
		}
	});

	var $yourWeather = $('html, body');
	$('a[href*="#your_weather"]').click(function() {
    	$yourWeather.animate( {
        	scrollTop: $($.attr(this, 'href')).offset().top
    	}, 600);
    	return false;
	});
});