import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useQuery, gql } from "@apollo/client";
import ProductCard from "../../components/Card/ProductCard";
import {
  getAllPurchaseByUser,
  getAllRentByUser,
  getAllBorrowByUser,
  getAllSalesByUser,
} from "../../graphql/Product/Queries";
import { getLoggedInUser } from "../../utils/auth";

export default function LabTabs() {
  const [value, setValue] = useState("1");
  const [purchases, setPurchases] = useState([]);
  const [rents, setRents] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [sales, setSales] = useState([]);

  // graphql Query
  const userPurchases = useQuery(getAllPurchaseByUser, {
    variables: { buyerId: getLoggedInUser() },
  });
  const userSales = useQuery(getAllSalesByUser, {
    variables: { sellerId: getLoggedInUser() },
  });
  const userRents = useQuery(getAllRentByUser, {
    variables: { lenderId: getLoggedInUser() },
  });
  const userBorrows = useQuery(getAllBorrowByUser, {
    variables: { borrowerId: getLoggedInUser() },
  });

  useEffect(() => {
    if (userPurchases.data) {
      setPurchases(userPurchases.data.getAllPurchaseByUser);
    }
    if (userSales.data) {
      setSales(userSales.data.getAllSalesByUser);
    }
    if (userRents.data) {
      setRents(userRents.data.getAllRentByUser);
    }
    if (userBorrows.data) {
      setBorrows(userBorrows.data.getAllBorrowByUser);
    }
  }, [userPurchases.data, userSales.data, userRents.data, userBorrows.data]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const doNothing = () => {};

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          {/* Initializes tabs */}
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Bought" value="1" />
            <Tab label="Sold" value="2" />
            <Tab label="Borrowed" value="3" />
            <Tab label="Lent" value="4" />
          </TabList>
        </Box>

        {/* tab details/contents */}
        <TabPanel value="1">
          {purchases.map((product, index) => (
            <ProductCard
              onClickHandler={doNothing}
              key={index}
              product={product.product}
            />
          ))}
        </TabPanel>
        <TabPanel value="2">
          {sales.map((product, index) => (
            <ProductCard
              onClickHandler={doNothing}
              key={index}
              product={product.product}
            />
          ))}
        </TabPanel>
        <TabPanel value="3">
          {borrows.map((product, index) => (
            <ProductCard
              onClickHandler={doNothing}
              key={index}
              product={product.product}
            />
          ))}
        </TabPanel>
        <TabPanel value="4">
          {rents.map((product, index) => (
            <ProductCard
              onClickHandler={doNothing}
              key={index}
              product={product.product}
            />
          ))}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
