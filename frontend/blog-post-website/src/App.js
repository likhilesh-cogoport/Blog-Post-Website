import logo from './logo.svg';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import DisplayArticle from './Pages/DisplayArticle/DisplayArticle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="/article/:id" element={<DisplayArticle/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
