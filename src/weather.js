const VISUAL_CROSSING_API_KEY = "DDYF2CLP5PMQK7Y4M3QT82AKK";

export async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${VISUAL_CROSSING_API_KEY}&contentType=json`,
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const data = await response.json();

    return {
      city: data.resolvedAddress,
      description: data.description,
      temperature: data.currentConditions.temp,
      feelsLike: data.currentConditions.feelslike,
      humidity: data.currentConditions.humidity,
      windSpeed: data.currentConditions.windspeed,
      condition: data.currentConditions.conditions,
      icon: data.currentConditions.icon,
    };
  } catch (error) {
    console.error(error);
  }
}
