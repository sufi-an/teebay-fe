import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useQuery, gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { GetProductById } from "../../graphql/Product/Queries";
import { getCategoryString } from "../../utils/productUtils";
import ConfirmPopup from "../../components/dialog/ConfirmPopup";
import { useMutation } from "@apollo/client";
import {
  rentProductMutation,
  purchaseProductMutation,
} from "../../graphql/Product/Mutations";
import { getLoggedInUser } from "../../utils/auth";

const PurchaseOrRent = ({}) => {
  // extract params data from url
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get("product");

  // state
  const [product, setProduct] = useState("");
  const [categories, setCategories] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openPopUpRent, setOpenPopUpRent] = useState(false);

  // graphql query
  const productData = useQuery(GetProductById, {
    variables: { id: productId },
  });

  // graphql mutation
  const [purchaseProduct, { errorPurchase }] = useMutation(
    purchaseProductMutation
  );
  const [rentProduct, { errorRent }] = useMutation(rentProductMutation);

  useEffect(() => {
    if (productData.data) {
      setProduct(productData.data.getProductById);
      setCategories(
        getCategoryString(productData.data.getProductById.category)
      );
    }
  }, [productData.data]);

  const handlePurchase = () => {
    // Implement purchase logic here
    purchaseProduct({
      variables: {
        productId: productId,
        buyerId: getLoggedInUser(),

        sellerId: product.userId,
      },
    });
    if (errorPurchase) {
      console.log(errorPurchase);
    }
    // close purchase Popup
    setOpenPopUp(false);
  };

  const handlePurchaseInput = () => {
    // open purchase popup
    setOpenPopUp(true);
  };
  const handleRent = () => {
    // Implement rent logic here
    rentProduct({
      variables: {
        productId: productId,
        borrowerId: getLoggedInUser(),

        lenderId: product.userId,
      },
    });
    if (errorPurchase) {
      console.log(errorPurchase);
    }
    // close rent popoup
    setOpenPopUpRent(false);
  };
  const handleRentInput = () => {
    // open rent
    setOpenPopUpRent(true);
  };

  return (
    <div className="product-details">
      {/* Product Details */}
      <h1 className="product-title">{product?.title}</h1>
      <p className="product-category">Categories: {categories}</p>
      <p className="product-price">Price: ${product?.price}</p>
      <p className="product-description">{product?.description}</p>
      <p className="product-price">${product?.price}</p>
      
      {/* Purchase or Rent  */}
      <div className="product-actions">
        <Button onClick={handlePurchaseInput} variant="contained">
          Purchase
        </Button>
        <Button onClick={handleRentInput} variant="contained">
          Rent
        </Button>
      </div>

      {/* popup */}
      <ConfirmPopup
        setOpen={setOpenPopUp}
        open={openPopUp}
        inputHandler={handlePurchase}
      />
      <ConfirmPopup
        setOpen={setOpenPopUpRent}
        open={openPopUpRent}
        inputHandler={handleRent}
      />
    </div>
  );
};

export default PurchaseOrRent;
