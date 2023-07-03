import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Routes,
    RouterProvider,
} from "react-router-dom";
import Home from "./page/Home";
import Admin from "./page/Admin";
import Menu from "./page/Menu";
import About from "./page/About";
import Contact from "./page/Contact";
import Login from "./page/login";
import Newproduct from "./page/Newproduct";
import EditProduct from "./page/EditProduct";
import ProductList from "./page/ProductList";
import NewOrder from "./page/NewOrder";
import OrderList from "./page/OrderList";
import UserList from "./page/UserList";
import Signup from "./page/Signup";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import Cart from "./page/Cart";
import Test from "./page/TestSignup";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            {/* <Route path="menu" element={<Menu />} /> */}
            <Route path="menu/:filterby" element={<Menu />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="cart" element={<Cart />} />
            <Route path="test" element={<Test />} />
                <Route path="newproduct" element={<Newproduct />} />
                <Route path="editproduct" element={<EditProduct />} />
            <Route path="listproduct" element={<ProductList />} />
            <Route path="listuser" element={<UserList />} />
            <Route path="neworder" element={<NewOrder />} />
            <Route path="listorder" element={<OrderList />} />
        </Route>

    )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();