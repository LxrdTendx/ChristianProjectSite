import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Row, Modal } from 'antd';
import { Link } from 'react-router-dom'; // Импортируем Link
import axios from 'axios';
import config from './config';

const FifthPage = () => {
    const carouselRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // Для хранения выбранного продукта
    const [isModalOpen, setIsModalOpen] = useState(false); // Для управления состоянием модального окна
    const backendURL = `${config.backendURL}/uploads/`;

    const handlePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft -= 600;
        }
    };

    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft += 600;
        }
    };

    const openModal = (product) => {
        setSelectedProduct(product); // Устанавливаем выбранный продукт
        setIsModalOpen(true); // Открываем модальное окно
    };

    const closeModal = () => {
        setSelectedProduct(null); // Сбрасываем выбранный продукт
        setIsModalOpen(false); // Закрываем модальное окно
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${config.backendURL}/products/`);
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке продуктов:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="fifthpage">
            <div className="info-navigation">
                <div className="services-link">[ Таинства и Богослужения ]</div>
                <div className="fifth-title">
                    Таинства и <span style={{ color: '#EDCB92' }}>Богослужения</span>
                </div>
                <Row justify="center" style={{ marginBottom: 16, marginLeft: 'auto', marginRight: '0' }}>
                    <Button
                        type="primary"
                        icon={<LeftOutlined />}
                        onClick={handlePrev}
                        style={{
                            border: '0.92px solid #EDCB92',
                            background: 'white',
                            color: '#EDCB92',
                            width: '50px',
                            height: '50px',
                        }}
                    />
                    <Button
                        type="primary"
                        icon={<RightOutlined />}
                        onClick={handleNext}
                        style={{
                            marginLeft: 8,
                            border: '0.92px solid #EDCB92',
                            background: 'white',
                            color: '#EDCB92',
                            width: '50px',
                            height: '50px',
                        }}
                    />
                </Row>
            </div>
            <div
                className="carousel-card"
                ref={carouselRef}
                style={{
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                }}
            >
                {products.map((product) => (
                    <div
                        className="card-item"
                        key={product.id}
                        onClick={() => openModal(product)} // Открываем модальное окно при клике
                    >
                        <div
                            className="card-item-photo"
                            style={{
                                backgroundImage: `url(${backendURL}${product.image_url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundColor: 'unset',
                            }}
                        />
                        <div className="card-name">{product.name}</div>
                        <Link 
                          to="/services" 
                          onClick={(e) => e.stopPropagation()} 
                          className="card-button"
                        >
                          записаться к нам 🡢
                        </Link>
                    </div>
                ))}
            </div>

            {/* Модальное окно с кастомными стилями */}
            <Modal
                title={selectedProduct?.name} // Название продукта в заголовке модального окна
                visible={isModalOpen}
                onCancel={closeModal} // Закрытие окна
                footer={null} // Убираем стандартные кнопки "ОК" и "Отмена"
                width={900}  // Увеличиваем ширину модального окна
                className="custom-modal"
            >
                {selectedProduct && (
                    <div>
                        <div
                            style={{
                                backgroundImage: `url(${backendURL}${selectedProduct.image_url})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                height: '400px',
                                marginBottom: '16px',
                            }}
                        />
                        <p><strong>Описание:</strong> {selectedProduct.description || 'Описание отсутствует'}</p>
                        <p><strong>Цена:</strong> {selectedProduct.price ? `${selectedProduct.price} ₽` : 'Цена не указана'}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default FifthPage;
