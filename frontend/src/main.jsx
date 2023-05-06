import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostContextProiver from "./context/postContext";
import Post from "./components/Post";
import Layout from "./components/layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PostContextProiver>
        <Routes>
          <Route path="/" element={ <Layout /> }>
            <Route index element={ <App /> } />
            <Route path={ `/posts/:id` } element={ <Post /> } />
          </Route>
        </Routes>
      </PostContextProiver>
    </BrowserRouter>
  </React.StrictMode>
);
