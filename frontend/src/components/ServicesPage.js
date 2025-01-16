import React, { useState, useEffect } from 'react';
import '../App.css';
import logo from '../assets/logo.png';
import { Card, Pagination, Button, Drawer, Badge, List, Modal, notification, Input } from 'antd';
import { ShoppingCartOutlined, CloseCircleOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from './config';

const { Meta } = Card;

const ServicesPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // 4 колонки x 2 строки
  const [cart, setCart] = useState([]); // Корзина
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [productModal, setProductModal] = useState(null); // Товар для комментария
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState(''); // Комментарий к товару
  const [searchValue, setSearchValue] = useState('');

  const backendURL = `${config.backendURL}/uploads/`;

  // Получение списка товаров
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.backendURL}/products/`);
        setProducts(response.data);
        setFilteredProducts(response.data); // Сохраняем для фильтрации
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      }
    };
    fetchProducts();
  }, []);

  // Восстановление корзины из localStorage при загрузке компонента
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

  // Открыть модальное окно для комментария
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

  // Фильтрация товаров
  const handleSearch = (value) => {
    setSearchValue(value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Список товаров на текущей странице
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="servicepage">
      {/* Хедер */}
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-button">
            Главная
          </Link>
        </nav>
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
        <h1>Наши услуги</h1>
        <p>Ниже представлен список наших услуг.</p>

        {/* Поиск */}
        <Input.Search
          placeholder="Поиск товаров..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: '16px', maxWidth: '400px' }}
        />

        {/* Список товаров */}
        <div className="product-grid">
          {paginatedProducts.map((product) => {
            const inCart = cart.find((item) => item.id === product.id);

            return (
              <Card
                key={product.id}
                hoverable
                style={{ width: 240, margin: '16px' }}
                cover={
                  <div
                    style={{
                      backgroundImage: `url(${backendURL}${product.image_url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '150px',
                    }}
                  />
                }
                actions={[
                  <Button type="link" onClick={() => handleAddToCartWithComment(product)}>
                    Подробнее
                  </Button>,
                  inCart ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                  ),
                ]}
              >
                <Meta title={product.name} description={`${product.price || 'Цена не указана'} ₽`} />
              </Card>
            );
          })}
        </div>

        {/* Пагинация */}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredProducts.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ textAlign: 'center', marginTop: '16px' }}
        />
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
              saveCartToLocalStorage([]);
              notification.success({ message: 'Покупка завершена!', description: 'Спасибо за ваш заказ.' });
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
              <List.Item
                actions={[
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => decreaseCartQuantity(item.id)}
                  />,
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => addToCart(item)}
                  />,
                  <Button
                    icon={<CloseCircleOutlined />}
                    onClick={() => removeFromCart(item.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`${item.price} ₽ (x${item.quantity})`}
                />
                {item.comment && <p>Комментарий: {item.comment}</p>}
              </List.Item>
            )}
          />
        ) : (
          <p>Корзина пуста</p>
        )}
      </Drawer>

      {/* Модальное окно для комментария */}
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
