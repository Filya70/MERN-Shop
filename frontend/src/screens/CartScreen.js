import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap';

import { Message } from '../components';
import { addToCart, removeFromCart } from '../actions/cartActions';
import priceFormat from '../public/priceFormat';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const { cartItems } = useSelector(({ cart }) => cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const countItemsInCart = () => {
    return cartItems.reduce((acc, i) => acc + i.qty, 0);
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Корзина</h1>
          {cartItems.length === 0 ? (
            <Message>
              Корзина пуста <i>😔</i>
              <Link to="/">
                <br />
                <strong>Вернуться на главную страницу</strong>
              </Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{priceFormat(item.price)}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                        {[...Array(+item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}>
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  В корзине {countItemsInCart()}{' '}
                  {countItemsInCart() === 1
                    ? 'товар'
                    : countItemsInCart() < 5
                    ? 'товара'
                    : 'товаров'}
                </h2>
                На сумму: {priceFormat(cartItems.reduce((acc, i) => acc + i.qty * i.price, 0))}
              </ListGroup.Item>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}>
                  Оформить заказ
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
