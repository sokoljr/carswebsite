$(document).ready(function() {
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
				widget.html("Eror - the city is not find").addClass('weather_result').css({'color': 'lightgray', 'font-size': '18px',});
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
});