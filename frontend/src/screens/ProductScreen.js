import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Rating } from '../components/';
import priceFormat from '../public/priceFormat';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);

      setProduct(data);
    };

    fetchProduct();
  }, [match]);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        На главную
      </Link>
      <Row>
        <Col md="6">
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md="3">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} оценок`} />
            </ListGroup.Item>
            <ListGroup.Item>{priceFormat(product.price)}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md="3">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Цена:</strong>
                  </Col>
                  <Col>
                    <strong>{priceFormat(product.price)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Наличие:</Col>
                  <Col>{product.countInStock > 0 ? 'В наличии' : 'Товара нет в наличии'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                  В КОРЗИНУ
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
