import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home"
import DogDetails from "./components/DogDetails/DogDetails";
import FormAddDog from "./components/FormAddDog/FormAddDog";


function App() {
  return (
    <div className="App">

      <Routes>
        <Route exact path="/" element={<LandingPage />}/>
        <Route path="/home" element={<Home />}/>
        
        <Route path="/dog-detail/:id" element={<DogDetails />}/>
        <Route exact path="/dog" element={<FormAddDog />}/>
      </Routes>
    </div>
  );
}

export default App;
