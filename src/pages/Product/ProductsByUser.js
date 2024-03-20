import React, { useEffect, useState } from "react";
import DeletableProductCard from "../../components/Card/DeletableProductCard";
import { useQuery, gql, useMutation } from "@apollo/client";

import { getAllProducts } from "../../graphql/Product/Queries";
import { Link, useNavigate } from "react-router-dom";
import ConfirmPopup from "../../components/dialog/ConfirmPopup";
import { deleteProductMutation } from "../../graphql/Product/Mutations";
import { getLoggedInUser } from "../../utils/auth";

const ProductList = () => {
  // to navigate to other pages
  const navigate = useNavigate();

  // graphql query
  const { error, loading, data } = useQuery(getAllProducts, {
    variables: { userId: getLoggedInUser() },
  });

  // graphql mutation
  const [deleteProduct, { updateError }] = useMutation(deleteProductMutation);

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    if (data) {
      setProducts(data.getProductByUser);
    }
  }, [data]);


  const onProductClick = (data) => {
    let path = `/editProduct?product=${data.id}`;
    navigate(path);
  };


  const onProductDelete = (product) => {
    // save product to state
    setProduct(product);
    setOpenPopUp(true);
  };
  const handleDeleteSubmit = (e) => {
    // implement deletion logic here
    deleteProduct({
      variables: {
        deleteProductId: product.id,
      },
    });
    if (updateError) {
      console.log(updateError);
    }
    setOpenPopUp(false);
  };
  return (
    <div>
      <Link to={"/create"}>Add Product</Link>
      
      {products.map((product, index) => (
        <DeletableProductCard
          onDeleteHandler={onProductDelete}
          onClickHandler={onProductClick}
          key={index}
          product={product}
        />
      ))}

      <ConfirmPopup
        setOpen={setOpenPopUp}
        open={openPopUp}
        inputHandler={handleDeleteSubmit}
      />
    </div>
  );
};

export default ProductList;
