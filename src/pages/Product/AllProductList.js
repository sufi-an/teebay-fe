import React, {useEffect, useState} from "react"; 
import ProductCard from '../../components/Card/ProductCard'; 
import {useQuery, gql} from '@apollo/client'
import Button from '@mui/material/Button';
import {getAllProducts} from '../../graphql/Product/Queries'
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const {error, loading, data} =  useQuery(getAllProducts)
    const [products, setProducts] = useState([])
    useEffect(()=>{

        if(data){ 
          setProducts(data.getProductByUser)
       
        }
    },[data])

    const onProductClick=(data)=>{
      let path = `/purchaseOrRent?product=${data.id}`;
      navigate(path);
    }
  return (
    <div >
      <Link
           to={'/products'}
          >
            My Products
          </Link>
      <Link
           to={'/report'}
          >
            Report
      </Link>
      {products.map((product, index) => (
        <ProductCard onClickHandler={onProductClick} key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
