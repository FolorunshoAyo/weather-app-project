(function () {
    const formEl = $("#formEl");
    const inputEl = $('#inputEl');
    const cityNameEl = $('.city_name');
    const temperatureEl = $('.temperature');
    const descriptionEl = $('.description');
    const state_imageEl = $('#state_image');
    const weather_descriptionEl = $('.weather_description');

    formEl.on("submit", function (e) {
        e.preventDefault();
        let city = inputEl.val();

        if (!city) {
            alert("Please enter a city name");
        } else {
            $.ajax({
                type: $(this).attr("method"),
                url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4e6faa13b8477578ce9621dfaed3b2e`,
                timeout: 2000,
                success: function (response) {
                    let tempInFahrenheit = response.main.temp;
                    let weather_description = response.weather[0].description;
                    let description = response.weather[0].main;
                    let icon = response.weather[0].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
                    let temperatureInCelsius = convertToDegrees(tempInFahrenheit);

                    cityNameEl.text(city);
                    temperatureEl.text(temperatureInCelsius + "\u00B0C");
                    descriptionEl.text(description);
                    state_imageEl.attr("src", iconurl);
                    weather_descriptionEl.text(weather_description);
                },
                error: function(){
                    alert("Results not found, try another search")
                }
            });
        }
    });
    function convertToDegrees(valueInKelvin) {
        let calculation = valueInKelvin - 273.15;
        let estimatedValue = calculation.toFixed(1);

        return estimatedValue;
    }
}());