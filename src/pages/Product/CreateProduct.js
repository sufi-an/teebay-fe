import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { InputLabel, MenuItem, Select } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";

import ListItemText from "@mui/material/ListItemText";

import Checkbox from "@mui/material/Checkbox";

import { useForm } from "react-hook-form";
import { getAllCategories } from "../../graphql/category/Queries";
import { useQuery, useMutation } from "@apollo/client";
import ProductCard from "../../components/Card/ProductCard";
import { createProductMutation } from "../../graphql/Product/Mutations";
import { getLoggedInUser } from "../../utils/auth";
import { Link } from "react-router-dom";

// initialize steps
const steps = ["Title", "Categories", "Description", "Price & Rent", "Summary"];
// rent type enum
const rentTypes = [
  { id: "hour", name: "hourly" },
  { id: "week", name: "weekly" },
  { id: "moonth", name: "monthly" },
];
export default function HorizontalLinearStepper() {

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [rentType, setRentType] = useState("");
  const [categories, setCategoriesData] = useState([]);
  const [categoryList, setCategoryListData] = useState([]);
  const categoryData = useQuery(getAllCategories);
  const product = null;

// graphql mutation
  const [createProduct, { error }] = useMutation(createProductMutation);

  useEffect(() => {
    if (categoryData.data) {
      setCategoryListData(
        categoryData.data.getAllCategories.map((e) => {
          return { name: e.name, id: e.id };
        })
      );
    }
  }, [categoryData.data]);

  // stepper logics
  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoriesData(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});


  const getCategoryIdFromCategoryNames = (category) => {
    return categoryList.find((e) => {
      return e.name === category;
    });
  };

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setCategoriesData([]);
    setPrice(0);
    setRentPrice(0);
    setRentType("");
  };
  
  const onSubmitForm = () => {
    let cats = categories.map((e) => getCategoryIdFromCategoryNames(e));
    cats = cats.map((e) => e.id);

    if (
      cats.length <= 0 ||
      title == "" ||
      description == "" ||
      price == "" ||
      rentPrice == 0 ||
      rentType == ""
    ) {
      alert("Please fill up required fileds");
      setActiveStep(0);
      return;
    }

    createProduct({
      variables: {
        title: title,
        category: cats,
        description: description,
        price: parseFloat(price),
        rentPrice: parseFloat(rentPrice),
        rentType: rentType,
        userId: getLoggedInUser(),
      },
    });

    resetFields();
    setActiveStep(0);

    if (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        {activeStep === 0 && (
          <div>
            <TextField
              required
              label="Title"
              name="title"
              fullWidth
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        )}
        {activeStep === 1 && (
          <div className="grid grid-cols-2 gap-4">
            <InputLabel id="demo-multiple-checkbox-label">
              Categories
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              fullWidth
              required
              value={categories}
              onChange={handleCategoryChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {categoryList.map((name) => (
                <MenuItem key={name.id} value={name.name}>
                  <Checkbox checked={categories.indexOf(name.name) > -1} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
        {activeStep === 2 && (
          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              required
              multiline
              fullWidth
              rows={4}
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}
        {activeStep === 3 && (
          <div className="grid grid-cols-2 gap-4">
            <TextField
              margin="normal"
              required
              id="price"
              label="Price"
              name="price"
              autoComplete="price"
              autoFocus
              defaultValue={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              id="rent"
              label="rent"
              name="rent"
              autoComplete="rent"
              autoFocus
              defaultValue={rentPrice}
              onChange={(e) => setRentPrice(e.target.value)}
            />
            <InputLabel id="demo-simple-select-label">Rent Type</InputLabel>
            <Select
              id="rentType"
              name="rentType"
              label="Rent Type"
              onChange={(e) => setRentType(e.target.value)}
              defaultValue={rentType}
            >
              {Object.entries(rentTypes).map(([key, value]) => (
                <MenuItem key={key} value={value.id}>
                  {value.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
        {activeStep === 4 && (
          <div className="grid grid-cols-2 gap-4">
            <h1>Title: {title}</h1>
            <div>Description: {description}</div>
            <div>Price: {price}</div>
            <div>
              {" "}
              Rent : <span>{rentPrice}</span> per <span>{rentType}</span>{" "}
            </div>
          </div>
        )}
      </form>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            {activeStep === steps.length - 1 ? (
              <Button type="submit" variant="contained" onClick={onSubmitForm}>
                Finish
              </Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </Box>
        </React.Fragment>
      )}
      <Link to={"/home"}>Back</Link>
    </Box>
  );
}
