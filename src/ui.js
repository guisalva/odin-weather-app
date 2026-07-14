import { fahrenheitToCelsius } from "./utils.js";
import { getWeatherData } from "./weather.js";
import { icons } from "./icons.js";

let currentWeather = null;
let currentUnit = "F";

export function setupUI() {
  const searchForm = document.querySelector("#search-form");
  const cityInput = document.querySelector("#city");
  const toggleButton = document.querySelector("#toggle-unit");

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const searchValue = cityInput.value.trim();

    if (!searchValue) return;

    const weatherInfo = await getWeatherData(searchValue);

    if (!weatherInfo) {
      window.alert("Not found");
      return;
    }

    currentWeather = weatherInfo;

    renderWeather(weatherInfo);
  });

  toggleButton.addEventListener("click", () => {
    if (!currentWeather) return;

    currentUnit = currentUnit === "F" ? "C" : "F";

    toggleButton.textContent = `°${currentUnit}`;

    renderWeather(currentWeather);
  });
}

function renderWeather(info) {
  const container = document.querySelector("#container");

  clearWeather();

  const card = createWheaterInfoCard(info);

  container.appendChild(card);
}

function clearWeather() {
  const container = document.querySelector("#container");

  container.replaceChildren();
}

function createWheaterInfoCard(info) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.append(createCardHeader(info), createCardBody(info));

  return card;
}

function createCardHeader(info) {
  // Header
  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");

  const cityElement = document.createElement("h2");
  cityElement.textContent = info.city;

  const iconElement = document.createElement("img");
  iconElement.src = icons[info.icon];
  iconElement.alt = info.condition;
  iconElement.width = 50;

  cardTitle.append(cityElement, iconElement);

  return cardTitle;
}

function createCardBody(info) {
  // Body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const conditionElement = document.createElement("p");
  conditionElement.textContent = info.condition;

  const temperature =
    currentUnit === "F"
      ? info.temperature
      : fahrenheitToCelsius(info.temperature).toFixed(1);

  const feelsLike =
    currentUnit === "F"
      ? info.feelsLike
      : fahrenheitToCelsius(info.feelsLike).toFixed(1);

  const unit = currentUnit === "F" ? "°F" : "°C";

  const temperatureElement = document.createElement("p");
  temperatureElement.textContent = `🌡️ ${temperature} ${unit}`;

  const feelsLikeElement = document.createElement("p");
  feelsLikeElement.textContent = `🤗 Feels Like: ${feelsLike} ${unit}`;

  const humidityElement = document.createElement("p");
  humidityElement.textContent = `💧 Humidity: ${info.humidity}%`;

  const windSpeedElement = document.createElement("p");
  windSpeedElement.textContent = `💨 Wind: ${info.windSpeed} mph`;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = info.description;

  cardBody.append(
    conditionElement,
    descriptionElement,
    temperatureElement,
    feelsLikeElement,
    humidityElement,
    windSpeedElement,
  );

  return cardBody;
}
