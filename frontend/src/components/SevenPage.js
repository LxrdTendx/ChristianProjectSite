
import '../App.css';
import { Button, Divider, Flex, Radio } from 'antd';
import logo from '../assets/logo.png'; // Импорт логотипа

const SevenPage = () => {
    return (
      <div className='sevenpage'>
            <div className='map'>
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa0187beb572af82d595d7349957221dc9ba7008e762f67316052ba60afae77bd&amp;source=constructor" width="1920" height="681" frameborder="0"></iframe>
                <div className="map-overlay"></div>
                <div className="map-content">
                    <div className='content-info'>
                        <div className='info-text'>наши контакты:</div>

                        <ul className="contact-items">
                            <li className="contact-item">+7 (999) 000 00-00</li>
                            <li className="contact-item">Святителя Николая пл., 1, Дзержинский, Московская обл</li>
                            <li className="contact-item">mail100@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>
           <div className='footer'>
           
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <nav className="nav">
                <button className="nav-button">о монастыре</button>
                <button className="nav-button">услуги</button>
                <button className="nav-button">о настоятеле</button>
                <button className="nav-button">контакты</button>
            </nav>
            <div className='copyright'>
                В оформлении сайта использованы работы<br/>
                фотографа Евгения Тихонова ©
            </div>
                
        
            
           </div>
      </div>
    );
  };
  
  export default SevenPage;