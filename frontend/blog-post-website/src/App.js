import logo from './logo.svg';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import DisplayArticle from './Pages/DisplayArticle/DisplayArticle';
import Signup from './Pages/AuthPage/Signup';
import Login from './Pages/AuthPage/Login';
import AddPost from './Pages/AddPost/AddPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="/auth" element={<Signup />}/>
        <Route path="/auth/signup" element={<Signup />}/>
        <Route path="/auth/login" element={<Login />}/>
        <Route path="/add-post" element={<AddPost />}/>
        <Route path="/article/:id" element={<DisplayArticle/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
