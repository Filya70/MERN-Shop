import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Rating } from './';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-1 rounded">
      <Link to={`product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} оценок`} color="red" />
        </Card.Text>
        <Card.Text as="h4">{product.price}&#8381;</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
