import "./App.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GetUsers from "./components/GetUsers";
import Login from "./pages/Auth/Login";
import Registration from './pages/Auth/Registration'
import CreateProduct from './pages/Product/CreateProduct'
import EditProduct from './pages/Product/EditProduct'
import AllProductList from './pages/Product/AllProductList'
import PurchaseOrRent from './pages/Product/PurchaseOrRentProduct'
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`GQL error`, message);
    });
  }
});

const BASE_URL = "http://localhost:5000/graphql"; //import.meta.env.BASE_URL
const link = from([errorLink, new HttpLink({ uri: BASE_URL })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <PurchaseOrRent />
    </ApolloProvider>
  );
}

export default App;
