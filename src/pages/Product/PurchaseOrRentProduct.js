import React from 'react';
import Button from "@mui/material/Button";

const PurchaseOrRent = ({ product }) => {
    product = {
        title: 'Product A',
        category: 'Electronics',
        description: 'Lorem ipsum dolor sit amet...',
        price: 99.99,
        rentPrice: 10.99,
        rentType: 'daily',
      }
  const { title,category, description, price,rentPrice } = product;

  const handlePurchase = () => {
    // Implement purchase logic here
    console.log('Product purchased!');
  };

  const handleRent = () => {
    // Implement rent logic here
    console.log('Product rented!');
  };

  return (
    <div className="product-details">
      <h1 className="product-title">{title}</h1>
      <p className="product-description">{description}</p>
      
      <p className="product-price">${price}</p>
      <div className="product-actions">
      <Button variant="contained">Purchase</Button>
      <Button variant="contained">Rent</Button>
      </div>
    </div>
  );
};

export default PurchaseOrRent;
