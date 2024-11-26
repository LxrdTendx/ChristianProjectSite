import React from 'react';
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


function App() {
  return (
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
  );
}


export default App;
