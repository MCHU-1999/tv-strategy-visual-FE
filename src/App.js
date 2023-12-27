import process from 'process';
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Toaster />
        <Routes>
          <Route path="/" element={ <Home/> }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
