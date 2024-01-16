import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import PageNotFound from "./pages/page-not-found";

export const App = () => {

      return (
          <div className="App">
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={"/*"} element={<PageNotFound/>}/>
                </Routes>
          </div>
      )

};


