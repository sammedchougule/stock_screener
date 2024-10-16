// src/AllStocks.js
import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'; // Import icons
import stockData from './stockData.json';

const AllStocks = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        // Simulating a fetch from an external API
        const fetchStocks = async () => {
            setStocks(stockData.stocks); // Display all stocks
        };

        fetchStocks();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-5">
            <h1 className="text-3xl font-bold mb-6">All Stocks</h1>
            <div className="flex flex-wrap -mx-4">
                {stocks.map(stock => (
                    <div key={stock.symbol} className="mb-5 w-full sm:w-1/2 lg:w-1/3 px-4">
                        <div className={`bg-white rounded-lg p-5 h-full shadow-md duration-300 ease-in-out hover:shadow-lg hover:cursor-pointer`}>
                            <div className="bg-gray-200 text-center rounded-t-lg p-4">
                                <h1 className="text-2xl font-bold">{stock.symbol}</h1>
                            </div>
                            <h2 className="text-xl font-bold mb-2">{stock.company_name}</h2>
                            <p className="text-xl font-bold">₹{stock.stock_data.current_price}</p>
                            
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center">
                                    <div className={`p-2 rounded-md flex items-center ${stock.stock_data.percentage_change >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                                        {stock.stock_data.percentage_change >= 0 ? (
                                            <>
                                                <FaArrowUp className="text-green-500 mr-1" />
                                                <p className="font-semibold text-green-500">{stock.stock_data.percentage_change}%</p>
                                            </>
                                        ) : (
                                            <>
                                                <FaArrowDown className="text-red-500 mr-1" />
                                                <p className="font-semibold text-red-500">{stock.stock_data.percentage_change}%</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <p className={`font-semibold ${stock.stock_data.change_rs >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    ₹{stock.stock_data.change_rs}
                                </p>
                            </div>

                            {/* <div className="mt-6">
                                <h3 className="text-xl font-semibold">Latest News</h3>
                                <ul className="mt-2">
                                    {stock.news.map((item, index) => (
                                        <li key={index} className="mt-2">
                                            <strong>{item.date}:</strong> 
                                            <a 
                                                href={item.link} 
                                                className="text-blue-500 hover:underline" 
                                                target="_blank" 
                                                rel="noopener noreferrer">
                                                {item.headline}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllStocks;
