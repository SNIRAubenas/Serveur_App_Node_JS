import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import PageNotFound from "./pages/page-not-found";
import Nav from "./components/Nav";
import {Dashboard} from "@mui/icons-material";
import Login from "./pages/Login";
import TestApi from "./components/TestApi";
export const App = () => {

      return (
          <>
          <Nav/>
          <div className="App">
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={"/*"} element={<PageNotFound/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/testapi"} element={<TestApi/>}/>
                </Routes>
          </div>
          </>
      )

};


