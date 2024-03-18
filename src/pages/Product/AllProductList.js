import React from 'react';
import ProductCard from '../../components/Card/ProductCard'; 
const products = [
  {
    title: 'Product A',
    category: 'Electronics',
    description: 'Lorem ipsum dolor sit amet...',
    price: 99.99,
    rentPrice: 10.99,
    rentType: 'daily',
  },
  {
    title: 'Product B',
    category: 'Furniture',
    description: 'Consectetur adipiscing elit...',
    price: 199.99,
    rentPrice: 18.99,
    rentType: 'weekly',
  },
  // Add more product objects as needed
];

const ProductList = () => {
  return (
    <div>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
