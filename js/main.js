var APPID = "3683fd5c08a236e764c341199eea76cf";

var apiAddress = "http://api.openweathermap.org/data/2.5/weather?";
var metric = "&units=metric";
var imperial = "&units=imperial";




// Code to pass user input from search bar into variable called searchText
$(document).ready(function() 
{
	$('#searchForm').on('submit', function(e)
	{
		let searchText = $('#searchText').val();
		updateByCity(searchText);
		sessionStorage.setItem('savedInput', searchText);

		//changes screen to weather.html after pressing enter
		window.location='weather.html';
		return false;

		e.preventDefault();
	});
});



//code to set the url based on a city search
function updateByCity(city)
{
	var inputCity = sessionStorage.getItem('savedInput');
	var url = apiAddress + "q=" + inputCity + "&APPID=" + APPID + metric;
	update(url);
}


function degreesToDirection(degrees)
{
	var range = 360/16;
	var low = 360 - range/2;
	var high = (low + range) % 360;
	var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	for(i in angles)
	{
		if(degrees >= low && degrees < high)

			return angles[i];

			low = (low + range) % 360;
			high = (high + range) % 360;
	}
}


function update(url)
{
	axios.get(url)
	.then((response) => 
	{
		console.log(response);

			var output = document.getElementById('outputName');
			output.innerHTML = response.data.name + response.data.sys.country.fontsize(6).fontcolor("LightSkyBlue");

			var output = document.getElementById('outputTemp');
			output.innerHTML = Math.round(response.data.main.temp) + "&deg;";

			// var output = document.getElementById('outputTempMin');
			// output.innerHTML = response.data.main.temp_min + "&deg;";

			// var output = document.getElementById('outputTempMax')
			// output.innerHTML = response.data.main.temp_max + "&deg;";

			var output = document.getElementById('outputHumidity');
			output.innerHTML = response.data.main.humidity + "%";

			var output = document.getElementById('outputWindSpeed')
			output.innerHTML = Math.round(response.data.wind.speed) + " mph";

			var output = document.getElementById('outputWeatherDesc');
			output.innerHTML = response.data.weather[0].description;

			
			// sets the weather id to the var weatherID
			var weatherID = response.data.weather[0].id;
			console.log(weatherID);
			sessionStorage.setItem('savedImageCode', weatherID);
			getImagePath(weatherID);


	})
	.catch((err) =>
	{
		console.log(err);
	});
		
}

function getImagePath(weatherID)
{
	var hour = new Date().getHours();
	var largeImageNumber = '';

	if(weatherID >= 200 && weatherID < 240)
	{
		largeImageNumber ="937";
	}
	else if (weatherID >= 300 && weatherID <=310)
	{
		largeImageNumber = "911";
	}
	else if ((weatherID >= 311  && weatherID <=313) || weatherID == 321 || weatherID == 500 || weatherID == 520)
	{
		largeImageNumber = "921";
	}
	else if (weatherID == 314 || weatherID == 501 || weatherID == 521 || weatherID == 531)
	{
		largeImageNumber = "923";
	}
	else if ((weatherID >= 502  && weatherID <= 504) || weatherID == 522)
	{
		largeImageNumber = "925";
	}
	else if (weatherID == 511 || weatherID == 600 || weatherID == 601 || weatherID == 615 || weatherID == 616)
	{
		largeImageNumber = "927";
	}
	else if ((weatherID >= 602  && weatherID <= 612) || (weatherID >= 620  && weatherID <= 622))
	{
		largeImageNumber = "929";
	}
	else if (weatherID >= 701  && weatherID <= 721)
	{
		largeImageNumber = "931";
	}
	else if (weatherID >= 731  && weatherID <= 781)
	{
		largeImageNumber = "933";
	}
	else if (weatherID == 800)
	{
		if(hour >= 6 && hour <= 21)
		{
			largeImageNumber = "901";
		}
		else
		{
			largeImageNumber = "903";
		}
	}
	else if (weatherID == 801)
	{
		largeImageNumber = "905";
	}
	else if (weatherID == 802 || weatherID == 804)
	{
		largeImageNumber = "913";
	}
	else if (weatherID == 803)
	{
		largeImageNumber = "907";
	}
	else 
	{
		largeImageNumber = "000";
	}

	console.log(hour);
	console.log(largeImageNumber);
	sessionStorage.setItem('savedImageNumber', largeImageNumber);
	updateForecast();

}

function updateForecast()
{
	var inputCity = sessionStorage.getItem('savedInput');
	var forecastURL = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + inputCity + "&key=db615eb88daf4e3c960af5d95c07bb9b&days=8";
	getForecast(forecastURL);
}

function getForecast(forecastURL)
{
	axios.get(forecastURL)
	.then((responsef) => 
	{
		console.log(responsef);

			var outputf = document.getElementById('outputTempMin');
			outputf.innerHTML = Math.round(responsef.data.data[0].min_temp) + "&deg;";

			var outputf = document.getElementById('outputTempMax')
			outputf.innerHTML = Math.round(responsef.data.data[0].max_temp) + "&deg;";




			var outputf = document.getElementById('outputfIcon0');
			outputf.innerHTML = responsef.data.data[0].weather.description;
			var outputf = document.getElementById('outputfMax0');
			outputf.innerHTML = Math.round(responsef.data.data[0].max_temp) + "&deg;";
			var outputf = document.getElementById('outputfMin0');
			outputf.innerHTML = Math.round(responsef.data.data[0].min_temp) + "&deg;";



		var dayTemp1 = new Date(responsef.data.data[1].datetime);
		var dayFormat1 = dayTemp1.getDate();
		var monthTemp1 = new Date(responsef.data.data[1].datetime);
      	var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];
      	var monthFormat1 = months[monthTemp1.getMonth()];

			var outputf = document.getElementById('outputfDay1');
			outputf.innerHTML = dayFormat1 + " " + monthFormat1;
			var outputf = document.getElementById('outputfIcon1');
			outputf.innerHTML = responsef.data.data[1].weather.description;
			var outputf = document.getElementById('outputfMax1');
			outputf.innerHTML = Math.round(responsef.data.data[1].max_temp) + "&deg;";
			var outputf = document.getElementById('outputfMin1');
			outputf.innerHTML = Math.round(responsef.data.data[1].min_temp) + "&deg;";



		var dayTemp2 = new Date(responsef.data.data[2].datetime);
		var dayFormat2 = dayTemp2.getDate();
		var monthTemp2 = new Date(responsef.data.data[2].datetime);
      	var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];
      	var monthFormat2 = months[monthTemp2.getMonth()];

			var outputf = document.getElementById('outputfDay2');
			outputf.innerHTML = dayFormat2 + " " + monthFormat2;
			var outputf = document.getElementById('outputfIcon2');
			outputf.innerHTML = responsef.data.data[2].weather.description;
			var outputf = document.getElementById('outputfMax2');
			outputf.innerHTML = Math.round(responsef.data.data[2].max_temp) + "&deg;";
			var outputf = document.getElementById('outputfMin2');
			outputf.innerHTML = Math.round(responsef.data.data[2].min_temp) + "&deg;";



		var dayTemp3 = new Date(responsef.data.data[3].datetime);
		var dayFormat3 = dayTemp3.getDate();
		var monthTemp3 = new Date(responsef.data.data[3].datetime);
      	var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];
      	var monthFormat3 = months[monthTemp3.getMonth()];

			var outputf = document.getElementById('outputfDay3');
			outputf.innerHTML = dayFormat3 + " " + monthFormat3;
			var outputf = document.getElementById('outputfIcon3');
			outputf.innerHTML = responsef.data.data[3].weather.description;
			var outputf = document.getElementById('outputfMax3');
			outputf.innerHTML = Math.round(responsef.data.data[3].max_temp) + "&deg;";
			var outputf = document.getElementById('outputfMin3');
			outputf.innerHTML = Math.round(responsef.data.data[3].min_temp) + "&deg;";



		var dayTemp4 = new Date(responsef.data.data[4].datetime);
		var dayFormat4 = dayTemp4.getDate();
		var monthTemp4 = new Date(responsef.data.data[4].datetime);
      	var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];
      	var monthFormat4 = months[monthTemp4.getMonth()];

			var outputf = document.getElementById('outputfDay4');
			outputf.innerHTML = dayFormat4 + " " + monthFormat4;
			var outputf = document.getElementById('outputfIcon4');
			outputf.innerHTML = responsef.data.data[4].weather.description;
			var outputf = document.getElementById('outputfMax4');
			outputf.innerHTML = Math.round(responsef.data.data[4].max_temp) + "&deg;";
			var outputf = document.getElementById('outputfMin4');
			outputf.innerHTML = Math.round(responsef.data.data[4].min_temp) + "&deg;";



		var dayTemp5 = new Date(responsef.data.data[5].datetime);
		var dayFormat5 = dayTemp5.getDate();
		var monthTemp5 = new Date(responsef.data.data[5].datetime);
      	var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];
      	var monthFormat5 = months[monthTemp5.getMonth()];
			var outputf = document.getElementById('outputfDay5');
			outputf.innerHTML = dayFormat5 + " " + monthFormat5;
			var outputf = document.getElementById('outputfIcon5');
			outputf.innerHTML = responsef.data.data[5].weather.description;
			var outputf = document.getElementById('outputfMax5');
			outputf.innerHTML = Math.round(responsef.data.data[5].max_temp) + "&deg;";
			var outputf = document.getElementById('outputfMin5');
			outputf.innerHTML = Math.round(responsef.data.data[5].min_temp) + "&deg;";



		var dayTemp6 = new Date(responsef.data.data[6].datetime);
		var dayFormat6 = dayTemp6.getDate();
		var monthTemp6 = new Date(responsef.data.data[6].datetime);
      	var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];
      	var monthFormat6 = months[monthTemp6.getMonth()];

			var outputf = document.getElementById('outputfDay6');
			outputf.innerHTML = dayFormat6 + " " + monthFormat6;
			var outputf = document.getElementById('outputfIcon6');
			outputf.innerHTML = responsef.data.data[6].weather.description;
			var outputf = document.getElementById('outputfMax6');
			outputf.innerHTML = Math.round(responsef.data.data[6].max_temp) + "&deg;";
			var outputf = document.getElementById('outputfMin6');
			outputf.innerHTML = Math.round(responsef.data.data[6].min_temp) + "&deg;";



		var dayTemp7 = new Date(responsef.data.data[7].datetime);
		var dayFormat7 = dayTemp7.getDate();
		var monthTemp7 = new Date(responsef.data.data[7].datetime);
      	var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];
      	var monthFormat7 = months[monthTemp7.getMonth()];

			var outputf = document.getElementById('outputfDay7');
			outputf.innerHTML = dayFormat7 + " " + monthFormat7;
			var outputf = document.getElementById('outputfIcon7');
			outputf.innerHTML = responsef.data.data[7].weather.description;
			var outputf = document.getElementById('outputfMax7');
			outputf.innerHTML = Math.round(responsef.data.data[7].max_temp) + "&deg;";
			var outputf = document.getElementById('outputfMin7');
			outputf.innerHTML = Math.round(responsef.data.data[7].min_temp) + "&deg;";
			
	})
	.catch((err) =>
	{
		console.log(err);
	});
}