var m = moment();

var currentDate = document.getElementById("currentDate");

var output = m.format("YYYY/MM/DD HH:mm dddd");
console.log(output);
$("#currentDate").text(output);

function displayWeatherInfo(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=77db0bed18b09bc55d1f42a05a90a275";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var cityName = $("#current-city").text(response.city.name);
    var icon = $("#icon").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[0].weather[0].icon +
        "@2x.png"
    );
    var cityTemp = $("#temp").text("Temprature: " + response.list[0].main.temp);
    var cityHumidity = $("#humidity").text(
      "Humidity: " + response.list[0].main.humidity
    );
    var cityWindSpeed = $("#windspeed").text(
      "Wind Speed: " + response.list[0].wind.speed
    );
    var cityUvindex = $("#uv").text("UV Index: " + response.list[0].main.uv);
    response.list.forEach((el, index) => {
      if (index % 8 !== 0) return;

      var card = $("<div>");
      card.addClass("card");
      card.css("width", "18rem");
      card.html(`<ul class="list-group list-group-flush">
      <li class="list-group-item">
      <img src=${"http://openweathermap.org/img/wn/" +
        el.weather[0].icon +
        "@2x.png"} />
      </li>
      <li class="list-group-item">${new Date(
        el.dt * 1000
      ).toLocaleString()}</li>
      <li class="list-group-item">Temp:  ${el.main.temp}</li>
      <li class="list-group-item">Humidity:  ${el.main.humidity}</li>
    </ul>`);
      $(".container-days").append(card);
    });

    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/uvi?" +
        "lat=" +
        response.city.coord.lat +
        "&lon=" +
        response.city.coord.lon +
        "&appid=77db0bed18b09bc55d1f42a05a90a275",
      method: "GET"
    }).then(function(response) {
      console.log("UV response", response);
      $("#uv").text("UV Index: " + response.value);
    });
  });
}

$("#submit").on("click", function(e) {
  e.preventDefault();
  var city = $("#city")
    .val()
    .trim();
  console.log(city);

  displayWeatherInfo(city);
});
