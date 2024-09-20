import WeatherApp from "./Components/WeatherApp/WeatherApp";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
const App = () => {
  return (
    <div className="app-container">
      <WeatherApp />
    </div>
  );
};

export default App;
