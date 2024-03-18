import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ProductCard = ({ product }) => {
  const { title, category, description, price, rentPrice, rentType } = product;

  return (
    <Card sx={{ width: '60%', marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Category: {category}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
        <Typography variant="body1" color="primary">
          Price: ${price}
        </Typography>
        <Typography variant="body1" color="secondary">
          Rent Price: ${rentPrice} per {rentType}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
