$(document).ready(function() {

	$("body").css("display","none").fadeIn(1000);
	
	var $fixedMenu = $("#fixedMenu");
	$(window).scroll(function() {
		if ($(this).scrollTop() > 440 && $fixedMenu.hasClass("normalize")) {
			$fixedMenu.fadeOut(200,function() {
				$(this).removeClass("normalize")
				.addClass("fixed")
				.fadeIn(200);
			});
		} else if ($(this).scrollTop() <= 240 && $fixedMenu.hasClass("fixed")) {
			$fixedMenu.fadeOut(200,function()	{
				$(this).removeClass("fixed")
					.addClass("normalize")
					.fadeIn(200);
			});
		}
	});

	/*$('#dropdown').has('.dropdown-menu').mouseover(function() {
    	$(this).children('.dropdown-menu').stop().show(300);
    	})
    .mouseout(function() {
    	$(this).children('.dropdown-menu').stop().hide(300);
    	});*/

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
		if ($(document).scrollTop() > 300) {
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

	$( function() {
    	$( "#accordion" ).accordion ({
    	heightStyle: "content"
    	});
  	});

  	$('#slick_slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		speed: 1000,
		focusOnSelect: true,
		prevArrow: $(".slider_disign .slider_controls.left"),
		nextArrow: $(".slider_disign .slider_controls.right"),
	});

	//weather widzet begin
	var api = 'http://api.openweathermap.org/data/2.5/weather'; //адресс погоды
	var appId = '0ba0663593a8a52f4b0a146c9dc36aaf'; // мой апи ключ
	var widget = $('#main_weather'); //переменная виджета

	$('#get_weather').on('click', weather); // поставили обработчик событий на кнопку
	$('#city_name').on('keypress', function(e) { // ? 
		if (e.which == 13)
			return weather();
	});

	function weather() { // функция погоды
		$.ajax({    // делаем запрос на сервер с помощью метода GET
			method: 'GET',
			url: api + "?APPID=" + appId + "&q=" + $('input[name="city_name"]').val() + "&units=metric&lang=ru"
		})
		.done(function(msg) { // Проверка кода - условие
			widget.empty();
			if (msg.cod !== 200) {
				widget.html("Eror - city is not found").addClass('col-md-12 weather_result').css({'color': 'red', 'font-size': '18px',});
				$('#google_map').css('display', 'none');
			} 
			else {
				widget.empty();
				var result = {
					city : msg.name,
					country : msg.sys.country,
					coord_lat : msg.coord.lat,
					coord_lon : msg.coord.lon,
					temp : msg.main.temp,
					date : msg.dt,
					sunrise : msg.sys.sunrise,
					sunset : msg.sys.sunset,
					icon : msg.weather[0].icon,
					wind : msg.wind.speed
				}

				var date = new Date(result.date * 1000);
				var sunrise = new Date(result.sunrise * 1000);
				var sunset = new Date(result.sunset * 1000);
				var iconUrl = 'http://openweathermap.org/img/w/' + result.icon + '.png';

				function format(date) { // Корректируем время и дату
					var hours = date.getHours();
					var minutes = date.getMinutes();
					var seconds = date.getSeconds();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					var year = date.getFullYear();

					if (hours < 10) hours = '0' + hours; 
					if (minutes < 10) minutes = '0' + minutes;
					if (seconds < 10) seconds = '0' + seconds;
 					if (month < 10) month = '0' + month; 
					if (day < 10) day = '0' + day; 
					
					var formatDate = {
						time : hours + ':' + minutes + ':' + seconds,
						date : day + '.' + month + '.' + year
					}
					return formatDate;
				};

				var dateTime = format(date);
				var sunrizeTime = format(sunrise);
				var sunsetTime = format(sunset);

				widget.addClass('weather_result'); // Добавляем в новый класс параграфы с данными
				widget.append('<p>' + result.city + ', ' + result.country + '</p>');
				widget.append('<p>' + '<img src=" ' + iconUrl  +' ">' + ' ' + Math.round(result.temp) + '&deg;С</p>');
				widget.append('<p>Time: ' + dateTime.time + ', Date: ' + dateTime.date + '</p>');
				widget.append('<p>Wind: ' + result.wind +' m/с</p>');
				widget.append('<p>Sunrise: ' + sunrizeTime.time + '</p>');
				widget.append('<p>Sunset: ' + sunsetTime.time + '</p>');
				widget.append('<p>Coord: [' + result.coord_lat +' lat , ' + result.coord_lon  +' lon]</p>');

				$('#google_map').css('display', 'block');
				initMap(result.coord_lat, result.coord_lon);
			}
		})
		.fail(function(msg) {
			widget.html(msg.status + ": " + msg.statusText).addClass('weather_result');
		});
	}

	function initMap(lat, lon) {
		var map, lat, lng, marker, mapProp;
		var myCenter = {lat: lat, lng: lon};
		 mapProp = { 
			center: myCenter,
			zoom: 6
		};

		map = new google.maps.Map(document.getElementById('google_map'),mapProp);
		marker = new google.maps.Marker ({
  			position: myCenter,
  			animation: google.maps.Animation.BOUNCE
  		});
  		marker.setMap(map)
	}
	//end of weather widzet
});