import React, { useState, useEffect } from 'react';
import '../App.css';
import logo from '../assets/logo.png';
import { Button, Drawer, Badge, List, Modal, notification, Input } from 'antd';
import { ShoppingCartOutlined, CloseCircleOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from './config';

/* 1. Импорт LazyLoadImage */
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Стили для эффекта blur

const ServicesPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]); // Корзина
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Состояния для модального окна комментария (при добавлении товара в корзину)
  const [productModal, setProductModal] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');

  // Состояния для модального окна с описанием товара (Подробнее)
  const [selectedProductForDetails, setSelectedProductForDetails] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const backendURL = `${config.backendURL}/uploads/`;

  // Уведомления в левом нижнем углу
  useEffect(() => {
    notification.config({
      placement: 'bottomLeft',
    });
  }, []);

  // Получение списка товаров
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.backendURL}/products/`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      }
    };
    fetchProducts();
  }, []);

  // Восстановление корзины из localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Сохранение корзины в localStorage
  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Добавление товара в корзину
  const addToCart = (product, comment = '') => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    const isNewProduct = !cart.some((item) => item.id === product.id);
    if (isNewProduct) {
      updatedCart.push({ ...product, quantity: 1, comment });
    }
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    notification.success({
      message: 'Товар добавлен в корзину',
      description: `${product.name} добавлен в корзину.`,
    });
  };

  // Уменьшение количества товара в корзине
  const decreaseCartQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    notification.info({ message: 'Количество товара уменьшено' });
  };

  // Удаление товара из корзины
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    notification.info({ message: 'Товар удален из корзины' });
  };

  // Открыть модальное окно для добавления товара с комментарием
  const handleAddToCartWithComment = (product) => {
    setProductModal(product);
    setIsCommentModalOpen(true);
  };

  // Подтвердить добавление с комментарием
  const handleConfirmAddToCart = () => {
    if (productModal) {
      addToCart(productModal, comment);
    }
    setComment('');
    setIsCommentModalOpen(false);
  };

  // Открыть модальное окно с описанием товара
  const handleShowDetails = (product) => {
    setSelectedProductForDetails(product);
    setIsDetailsModalOpen(true);
  };

  // Фильтрация товаров по поисковому запросу
  const handleSearch = (value) => {
    setSearchValue(value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="servicepage">
      {/* Хедер */}
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        {/* <nav className="nav">
          <Link to="/" className="nav-button">
            Главная
          </Link>
        </nav> */}
        <Badge count={cart.reduce((acc, item) => acc + item.quantity, 0)} size="small">
          <Button
            type="text"
            icon={<ShoppingCartOutlined style={{ fontSize: '24px', color: '#bda57e' }} />}
            onClick={() => setDrawerVisible(true)}
          />
        </Badge>
      </header>

      <hr />

      <div className="services-content">
        {/* Поиск */}
        <Input.Search
          className="sv-search"
          placeholder="Поиск товаров..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: '16px', maxWidth: '400px' }}
        />

        {/* Список товаров с кастомной карточкой */}
        <div className="product-grid">
          {filteredProducts.map((product) => {
            const inCart = cart.find((item) => item.id === product.id);

            return (
              <div className="sv-card-item" key={product.id}>
                {/* 2. Используем LazyLoadImage вместо background-image */}
                <LazyLoadImage
                  className="sv-card-item-photo"
                  src={`${backendURL}${product.image_url}`}
                  effect="blur"               // эффект размытия при загрузке
                  placeholderSrc="/placeholder.png" 
                  // ↑ placeholderSrc - путь к вашей заглушке (по желанию)
                  // или можно не указывать, тогда будет просто размытие
                />

                <div className="sv-card-name">{product.name}</div>
                <div className="sv-card-price">{product.price || 'Цена не указана'} ₽</div>
                <div className="sv-card-actions">
                  <Button
                    type="link"
                    className="sv-card-more"
                    onClick={() => handleShowDetails(product)}
                  >
                    Подробнее
                  </Button>
                  {inCart ? (
                    <div className="sv-card-cart-controls">
                      <Button
                        icon={<MinusOutlined />}
                        onClick={() => decreaseCartQuantity(product.id)}
                      />
                      <span>{inCart.quantity}</span>
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() => addToCart(product)}
                      />
                    </div>
                  ) : (
                    <Button type="primary" onClick={() => handleAddToCartWithComment(product)}>
                      Добавить
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Корзина */}
      <Drawer
        title="Корзина"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        footer={
          <Button
            type="primary"
            onClick={() => {
              setCart([]);
              localStorage.removeItem('cart');
              notification.success({
                message: 'Покупка завершена!',
                description: 'Спасибо за ваш заказ.',
              });
            }}
          >
            Оформить заказ
          </Button>
        }
      >
        {cart.length > 0 ? (
          <List
            dataSource={cart}
            renderItem={(item) => (
              <List.Item>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'flex-start',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ marginBottom: '4px' }}>
                      {item.price} ₽ (x{item.quantity})
                    </div>
                    {item.comment && (
                      <div style={{ marginBottom: '4px' }}>
                        <strong>Комментарий:</strong> {item.comment}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => decreaseCartQuantity(item.id)}
                    />
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => addToCart(item)}
                    />
                    <Button
                      icon={<CloseCircleOutlined />}
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <p>Корзина пуста</p>
        )}
      </Drawer>

      {/* Модальное окно с описанием товара */}
      <Modal
        title={selectedProductForDetails ? selectedProductForDetails.name : ''}
        open={isDetailsModalOpen}
        onCancel={() => setIsDetailsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailsModalOpen(false)}>
            Закрыть
          </Button>,
        ]}
        className="sv-modal"
        width={900}
      >
        {selectedProductForDetails && (
          <>
            <div
              className="sv-modal-image"
              style={{
                backgroundImage: `url(${backendURL}${selectedProductForDetails.image_url})`,
              }}
            />
            <p className="sv-modal-price">
              Цена: {selectedProductForDetails.price || 'Цена не указана'} ₽
            </p>
            {selectedProductForDetails.description && (
              <p className="sv-modal-description">
                {selectedProductForDetails.description}
              </p>
            )}
          </>
        )}
      </Modal>

      {/* Модальное окно для ввода комментария */}
      <Modal
        title="Добавить комментарий"
        open={isCommentModalOpen}
        onCancel={() => setIsCommentModalOpen(false)}
        onOk={handleConfirmAddToCart}
      >
        <Input.TextArea
          placeholder="Введите комментарий (необязательно)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </Modal>
    </div>
  );
};

export default ServicesPage;
