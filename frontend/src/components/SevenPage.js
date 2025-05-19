
import '../App.css';
import { Button, Divider, Flex, Radio } from 'antd';
import logo from '../assets/logo_foot.png'; // Импорт логотипа
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

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
                <ScrollLink
                    to="second-page"
                    smooth={true}
                    duration={500}
                    className="nav-button"
                >
                    О монастыре
                </ScrollLink>

                <RouterLink to="/services" className="nav-button">
                    Таинства и Богослужения
                </RouterLink>

                <ScrollLink
                    to="third-page"
                    smooth={true}
                    duration={500}
                    className="nav-button"
                >
                    О священнике
                </ScrollLink>

                <ScrollLink
                    to="seven-page"
                    smooth={true}
                    duration={500}
                    className="nav-button"
                >
                    Контакты
                </ScrollLink>
            </nav>
            <div className='copyright'>
                В оформлении сайта использованы работы <br/>
                фотографа Евгения Тихонова ©
            </div>
                
        
            
           </div>
      </div>
    );
  };
  
  export default SevenPage;