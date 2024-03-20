import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Button from "@mui/material/Button";
import { useQuery, gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { GetProductById } from "../../graphql/Product/Queries";
import { getCategoryString } from "../../utils/productUtils";
import { getAllCategories } from "../../graphql/category/Queries";
import { useMutation } from "@apollo/client";
import { updateProductMutation } from "../../graphql/Product/Mutations";

const RentalForm = () => {
  // State for form fields
  const [category, setCategory] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [rentType, setRentType] = useState("");

  // params
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get("product");

  // queries
  const productData = useQuery(GetProductById, {
    variables: { id: productId },
  });
  const categoryData = useQuery(getAllCategories);

  // mutations
  const [updateProduct, { error }] = useMutation(updateProductMutation);

  useEffect(() => {
    if (productData.data) {
      setTitle(productData.data.getProductById.title);
      setCategory(productData.data.getProductById.category);
      setDescription(productData.data.getProductById.description);
      setPrice(productData.data.getProductById.price);
      setRentPrice(productData.data.getProductById.rentPrice);
      setRentType(productData.data.getProductById.rentType);
    }
    if (categoryData.data) {
      setAllCategory(categoryData.data.getAllCategories);
    }
  }, [productData.data, categoryData.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct({
      variables: {
        updateProductId: productId,
        title: title,
        description: description,
        price: parseFloat(price),
        rentPrice: parseFloat(rentPrice),
        rentType: rentType,
      },
    });

    if (error) {
      console.log(error);
    }
  };
  // Handle category selection
  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  return (
    <div>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* <Autocomplete
        multiple
        id="category"
        options={allCategory}
        value={category.id}
        onChange={handleCategoryChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            variant="outlined"
            fullWidth
          />
        )}
      /> */}
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="Rent Rate"
        variant="outlined"
        fullWidth
        value={rentPrice}
        onChange={(e) => setRentPrice(e.target.value)}
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel>Rent Type</InputLabel>
        <Select
          value={rentType}
          onChange={(e) => setRentType(e.target.value)}
          label="Rent Type"
        >
          <MenuItem value="hour">Hourly</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
      >
        Update
      </Button>
    </div>
  );
};

export default RentalForm;
