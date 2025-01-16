import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import logo from './assets/logo.png'; // Импорт логотипа
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage.js';
import ThirdPage from './components/ThirdPage.js';
import ForthPage from './components/ForthPage.js';
import FifthPage from './components/FifthPage.js';
import SixPage from './components/SixPage.js';
import SevenPage from './components/SevenPage.js';
import ServicesPage from './components/ServicesPage'; // Импорт новой страницы


function App() {
  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route
          path="/"
          element={
            <div className="App">
              <div className="fixed-width-container">
                <FirstPage />

                <div id="second-page">
                  <SecondPage />
                </div>

                <div id="third-page">
                  <ThirdPage />
                </div>
              
                <ForthPage />

                <div id='fifth-page'>
                  <FifthPage />
                </div>
                
                <SixPage />
                <div id='seven-page'>
                  <SevenPage />
                </div>
                
              </div>
            </div>
          }
        />

      {/* Страница "Услуги" */}
      <Route path="/services" element={<ServicesPage />} />
        </Routes>
    </Router>
  );
}
console.log(process.env.REACT_APP_BACKEND_URL);

window.onerror = function (message, source, lineno, colno, error) {
  // Логировать ошибку или отправить на сервер
  console.log("Ошибка произошла, но она не будет показана пользователю.");
  // Возвращаем true, чтобы ошибка не была выведена в консоль
  return true;
};

export default App;
