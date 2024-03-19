import React, {useEffect, useState} from "react"; 
import ProductCard from '../../components/Card/ProductCard'; 
import {useQuery, gql} from '@apollo/client'

import {getAllProducts} from '../../graphql/Product/Queries'
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const {error, loading, data} =  useQuery(getAllProducts,{
    variables: { userId: "74f417d2-3c34-43b8-9fe3-168a09065750" },
  })
    const [products, setProducts] = useState([])
    
    useEffect(()=>{

        if(data){ 
          setProducts(data.getProductByUser)
          console.log(data)
        }
    },[data])
    const onProductClick=(data)=>{
      let path = `/editProduct?product=${data.id}`;
      navigate(path);
    }
  return (
    <div>
      {products.map((product, index) => (
        <ProductCard onClickHandler={onProductClick} key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
