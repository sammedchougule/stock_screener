// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StockScreener from './stockScreener';
import AllStocks from './AllStocks';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StockScreener />} />
                <Route path="/all-stocks" element={<AllStocks />} />
            </Routes>
        </Router>
    );
}

export default App;
