import React from "react";
import { Routes, Switch, Link, Route } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import "./App.css";

import {
  Navbar,
  Homepage,
  Exchanges,
  CryptoDetails,
  Cryptocurrencies,
  News,
} from "./components";
const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className="footer" level={5}>
          <Typography.Title
            level={3}
            style={{ color: "white", textAlign: "center" }}
          >
            CryptoApp <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            {/* <Link to="/exchanges">Exchanges</Link> */}
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
