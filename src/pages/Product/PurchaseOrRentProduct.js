import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useQuery, gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { GetProductById } from "../../graphql/Product/Queries";
import { getCategoryString } from "../../utils/productUtils";
import ConfirmPopup from "../../components/dialog/ConfirmPopup";
import { useMutation } from "@apollo/client";
import { rentProductMutation,purchaseProductMutation } from "../../graphql/Product/Mutations";

const PurchaseOrRent = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get("product");
  const productData = useQuery(GetProductById, {
    variables: { id: productId },
  });
  const [product, setProduct] = useState("");
  const [categories, setCategories] = useState("");
  const [openPopUp, setOpenPopUp] = React.useState(false);

  const [purchaseProduct, { errorPurchase }] = useMutation(purchaseProductMutation);
  const [rentProduct, { errorRent }] = useMutation(rentProductMutation);
  useEffect(() => {
    if (productData.data) {
      setProduct(productData.data.getProductById);
      setCategories(getCategoryString(productData.data.getProductById.category));
    }
  }, [productData.data]);

  const handlePurchase = () => {
    
    // Implement purchase logic here
    purchaseProduct({
      variables: {
        productId: productId,
        buyerId:"ac0bd35c-fdae-4534-9c8a-0b8b7b33d80e",
      
        sellerId: "74f417d2-3c34-43b8-9fe3-168a09065750",
        
      },
    });
    if(errorPurchase){
      console.log(errorPurchase)
    }
    console.log("Product purchased!");
    setOpenPopUp(false)
  };

  const handlePurchaseInput=()=>{
    setOpenPopUp(true)
  }
  const handleRent = () => {
    // Implement rent logic here
    rentProduct({
      variables: {
        productId: productId,
        borrowerId:"ac0bd35c-fdae-4534-9c8a-0b8b7b33d80e",
      
        lenderid: "74f417d2-3c34-43b8-9fe3-168a09065750",
        
      },
    });
    if(errorPurchase){
      console.log(errorPurchase)
    }
    console.log("Product rented!");
  };
  const handleRentInput=()=>{
    setOpenPopUp(true)
  }

  return (
    <div className="product-details">
      <h1 className="product-title">{product?.title}</h1>
      <p className="product-category">

        Categories: {categories}
      </p>
      <p className="product-price">Price: ${product?.price}</p>
      <p className="product-description">{product?.description}</p>

      <p className="product-price">${product?.price}</p>
      <div className="product-actions"   >
        <Button onClick={handlePurchaseInput} variant="contained">Purchase</Button>
        <Button onClick={handleRentInput} variant="contained">Rent</Button>
      </div>
      <ConfirmPopup
          setOpen={setOpenPopUp}
          open={openPopUp}
          inputHandler={handlePurchase}
        />
    </div>
  );
};

export default PurchaseOrRent;
