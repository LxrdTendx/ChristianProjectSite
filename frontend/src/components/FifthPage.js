import React, { useRef } from 'react';
import '../App.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';

const FifthPage = () => {
    const carouselRef = useRef(null); // Ссылка на контейнер карусели

    // Обработчик кнопки "Влево"
    const handlePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft -= 600; // Прокрутка влево на 600px
        }
    };

    // Обработчик кнопки "Вправо"
    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft += 600; // Прокрутка вправо на 600px
        }
    };

    return (
        <div className="fifthpage">
            <div className="info-navigation">
                <div className="services-link">[ услуги ]</div>
                <div className="fifth-title">
                    Таинства и <span style={{ color: '#bda57e' }}>Богослужения</span>
                </div>
                <Row justify="center" style={{ marginBottom: 16, marginLeft: 'auto', marginRight: '0' }}>
                    <Button
                        type="primary"
                        icon={<LeftOutlined />}
                        onClick={handlePrev}
                        style={{
                            border: '0.92px solid rgba(168, 145, 107, 0.82)',
                            background: 'black',
                            color: 'rgba(168, 145, 107, 0.82)',
                            width: '50px',
                            height: '50px',
                        }}
                    ></Button>
                    <Button
                        type="primary"
                        icon={<RightOutlined />}
                        onClick={handleNext}
                        style={{
                            marginLeft: 8,
                            border: '0.92px solid rgba(168, 145, 107, 0.82)',
                            background: 'black',
                            color: 'rgba(168, 145, 107, 0.82)',
                            width: '50px',
                            height: '50px',
                        }}
                    ></Button>
                </Row>
            </div>

            {/* Карусельный контейнер */}
            <div
                className="carousel-card"
                ref={carouselRef} // Привязываем ссылку на контейнер
                style={{
                    
                    overflowX: 'auto', // Включаем горизонтальную прокрутку
                    scrollBehavior: 'smooth', // Добавляем плавность прокрутки
                
                }}
            >
                {/* Карточка 1 */}
                <div className="card-item">
                    <div
                        className="card-item-photo"
                        style={{
                            backgroundColor: 'gray',
                        
                        }}
                    ></div>
                    <div className="card-name">Совершение таинства крещения в храме</div>
                    <Button type="link" className="card-button">
                        записаться к нам 🡢
                    </Button>
                </div>

                {/* Карточка 2 */}
                <div className="card-item" >
                    <div
                        className="card-item-photo"
                        style={{
                            backgroundColor: 'gray',
                            
                        }}
                    ></div>
                    <div className="card-name">Совершение таинства крещения в храме</div>
                    <Button type="link" className="card-button">
                        записаться к нам 🡢
                    </Button>
                </div>

                {/* Карточка 3 */}
                <div className="card-item">
                    <div
                        className="card-item-photo"
                        style={{
                            backgroundColor: 'gray',
                            
                        }}
                    ></div>
                    <div className="card-name">Совершение таинства крещения в храме</div>
                    <Button type="link" className="card-button">
                        записаться к нам 🡢
                    </Button>
                </div>
                <div className="card-item">
                    <div
                        className="card-item-photo"
                        style={{
                            backgroundColor: 'gray',
                            
                        }}
                    ></div>
                    <div className="card-name">Совершение таинства крещения в храме</div>
                    <Button type="link" className="card-button">
                        записаться к нам 🡢
                    </Button>
                </div>
                <div className="card-item">
                    <div
                        className="card-item-photo"
                        style={{
                            backgroundColor: 'gray',
                            
                        }}
                    ></div>
                    <div className="card-name">Совершение таинства крещения в храме</div>
                    <Button type="link" className="card-button">
                        записаться к нам 🡢
                    </Button>
                </div>
                
                
            </div>
        </div>
    );
};

export default FifthPage;
