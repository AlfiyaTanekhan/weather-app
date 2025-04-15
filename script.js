async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const card = document.getElementById("weatherCard");
    const error = document.getElementById("error");
  
    if (!city) {
      error.textContent = "Please enter a city name.";
      card.classList.add("hidden");
      return;
    }
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
  
      if (data.cod !== 200) {
        error.textContent = "City not found!";
        card.classList.add("hidden");
        return;
      }
  
      // Update UI
      error.textContent = "";
      document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").textContent = `${data.main.temp} °C`;
      document.getElementById("condition").textContent = `Weather: ${data.weather[0].main}`;
      document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;
  
      // Weather icon
      const iconCode = data.weather[0].icon;
      document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
      // Background color based on condition
      const mainCondition = data.weather[0].main.toLowerCase();
      let bg = "#f1f1f1";
      if (mainCondition.includes("cloud")) bg = "#d3d3d3";
      else if (mainCondition.includes("rain")) bg = "#a0c4ff";
      else if (mainCondition.includes("clear")) bg = "#fff176";
      else if (mainCondition.includes("snow")) bg = "#e0f7fa";
  
      card.style.backgroundColor = bg;
      card.classList.remove("hidden");
    } catch (e) {
      error.textContent = "Something went wrong!";
      card.classList.add("hidden");
    }
  }
  