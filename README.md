# Weather App ☀️

A simple and elegant weather application built with React and TypeScript. This app allows users to fetch weather information based on their current location or search for weather details by city name.

## Features ⚙️

- Fetch weather information based on user's current location.
- Search for weather details by city name.
- Display weather details including temperature, humidity, wind speed, and cloudiness.
- Responsive design for a seamless experience on both desktop and mobile devices.

## Installation ⬇️

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/weather-app.git
    cd weather-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
    ```env
    VITE_API_KEY=your_openweathermap_api_key
    ```

## Usage 📂

1. Start the development server:
    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Use the app to fetch weather information based on your location or search for weather details by city name.

## Project Structure 🩻

```
/src
  /components
    AccessLocation.tsx
    ButtonTab.tsx
    Header.tsx
    Heading.tsx
    Home.tsx
    Loader.tsx
    SearchPage.tsx
    WeatherDetails.tsx
  /utils
    fetchWeatherInfo.ts
    getFromSessionStorage.ts
  App.tsx
  main.tsx
  index.css
```

## Acknowledgments 📒

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API.
- [React](https://reactjs.org/) for the powerful UI library.
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.
