import WeatherApp from "./Components/WeatherApp";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Welcome To My Weather App!</h1>
        <h2>Search a location</h2>
      </header>
      <div className="search-container">
        <WeatherApp />
      </div>
    </div>
  );
};

export default App;
