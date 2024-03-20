import React from 'react';
import Card from '@mui/material/Card';
import Button from "@mui/material/Button";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getCategoryString } from '../../utils/productUtils';



const ProductCard = ({ product,onClickHandler,onDeleteHandler }) => {
  
  const { title, category, description, price, rentPrice, rentType } = product;
  let categories = getCategoryString(category)
  

  const handleOnClick=()=>{
    onClickHandler(product)
  }
  const handleOnDelete=()=>{
    onDeleteHandler(product)
  }
  return (
    <Card  sx={{ width: '60%', marginBottom: '16px' }}>
      
      <CardContent onClick={handleOnClick}>
        
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Category: {categories}
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
      <Button
          
          onClick={handleOnDelete}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="error"
          >
            Delete
          </Button>
    </Card>
  );
};

export default ProductCard;
