import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Row, Modal } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from './config';

const FifthPage = () => {
    const carouselRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
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
            <div className="carousel-card" ref={carouselRef}>
                {products.map((product) => (
                    <div
                        className="card-item"
                        key={product.id}
                        onClick={() => openModal(product)}
                    >
                        <div className="card-item-photo">
                            <img
                                src={`${backendURL}${product.image_url}`}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '5px',
                                }}
                            />
                        </div>
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

            <Modal
                title={selectedProduct?.name}
                visible={isModalOpen}
                onCancel={closeModal}
                footer={null}
                width={900}
                className="custom-modal"
            >
                {selectedProduct && (
                    <div>
                        <img
                            src={`${backendURL}${selectedProduct.image_url}`}
                            alt={selectedProduct.name}
                            style={{
                                width: '100%',
                                height: '400px',
                                objectFit: 'contain',
                                marginBottom: '16px',
                            }}
                        />
                        <p><strong>Описание:</strong> {selectedProduct.description || 'Описание отсутствует'}</p>
                        <p><strong>Цена:</strong> {selectedProduct.price ? `${selectedProduct.price} ₽` : 'Цена не указана'}</p>
                    </div>
                )}
            </Modal>

            <div className='fifth-text-colab'><i>Сайт создан во славу Божию, прихожанами Николо-Угрешского монастыря, духовными чадами и почитателями иеромонаха Стефана</i></div>

        </div>
    );
};

export default FifthPage;
