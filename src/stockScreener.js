import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomColor } from './utils/colorUtils';
import stockData from './stockData.json';
import SearchBar from './SearchBar'; 
import LatestNews from './LatestNews';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';


    const StockScreener = ({stock}) => {
        // const randomBgColor = getRandomColor(); // Get a random color
        const [stocks, setStocks] = useState([]); // All stocks
        const [searchTerm, setSearchTerm] = useState(''); 
        const [submittedSearchTerm, setSubmittedSearchTerm] = useState(''); 
        const [filteredStocks, setFilteredStocks] = useState([]); // Filtered stocks for display
        const navigate = useNavigate();
        const [darkMode, setDarkMode] = useState(false);


        // Toggles dark mode
        const toggleDarkMode = () => {
            setDarkMode(!darkMode);
        };

        // Add or remove 'dark' class from <html> element based on darkMode state
        useEffect(() => {
            if (darkMode) {
            document.documentElement.classList.add('dark');
            } else {
            document.documentElement.classList.remove('dark');
            }
        }, [darkMode]);


    useEffect(() => {
        const fetchStocks = async () => {
            const data = stockData?.stocks || [];
            setStocks(data); // Load all stock data
            setFilteredStocks(data.slice(0, 10)); // Display only the first n_number stocks initially
        };
        fetchStocks();
    }, []);

    useEffect(() => {
        if (submittedSearchTerm) {
            const filtered = stocks.filter(stock =>
                stock.company_name.toLowerCase().includes(submittedSearchTerm.toLowerCase()) ||
                stock.symbol.toLowerCase().includes(submittedSearchTerm.toLowerCase())
            );
            setFilteredStocks(filtered.slice(0, 10)); // Limit to n_number results
        } else {
            setFilteredStocks(stocks.slice(0, 10)); // Show initial stocks if no search term is submitted
        }
    }, [submittedSearchTerm, stocks]);

    const handleSearchSubmit = () => {
        setSubmittedSearchTerm(searchTerm); 
    };

    const handleMoreClick = () => {
        navigate('/all-stocks');
    };

    const handleStockSelect = (selectedSymbol) => {
        const selectedStock = stocks.find(stock => stock.symbol === selectedSymbol);
        if (selectedStock) {
            setFilteredStocks([selectedStock]); 
        }
    };

    // Enhance the news array to include stock details (symbol, company_name, current_price, percentage_change)
    const allNews = filteredStocks.flatMap(stock => 
        (stock.news || []).map(newsItem => ({
            ...newsItem,
            symbol: stock.symbol,
            company_name: stock.company_name,
            current_price: stock.stock_data.current_price,
            percentage_change: stock.stock_data.percentage_change,
        }))
    );


    return (
        <div data-theme="dark" className="p-2 max-w-6xl mx-auto bg-white dark:bg-slate-700">

        <h1 class="mb-4 text-3xl font-extrabold text-gray-800 dark:text-white md:text-5xl lg:text-6xl">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-600">Stock</span> InSight
        </h1>

        {/* Dark Mode */}
        <button onClick={toggleDarkMode} className="px-4 mb-4 py-2 bg-blue-600 text-white rounded">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

            {/* Search Bar with Dropdown */}
            <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
                onSearchSubmit={handleSearchSubmit} 
                allStocks={stocks}  // Pass all the stocks for searching
                onStockSelect={handleStockSelect} 
            />


            {/* Stock Cards */}
            <div className="flex flex-wrap mt-6">
                {filteredStocks?.length > 0 ? (
                    filteredStocks.map((stock, index) => (
                        <div key={index} className="mb-5 w-full sm:w-1/4 lg:w-1/5 px-4 ">
                            <div className="bg-white rounded-lg p-5 h-full shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg hover:cursor-pointer dark:bg-slate-600">
                                
                                <h1 className={`rounded-lg font-bold p-1 inline-block dark:text-white ${getRandomColor()}`}>{stock.symbol}</h1>
                                
                                <h2 className="text-lg font-medium mb-2 dark:text-slate-300">{stock.company_name}</h2>

                                <p className="text-xl font-bold dark:text-white">₹{stock.stock_data.current_price}</p>
                                
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center">
                                        <div className={`p-1 rounded-md flex items-center text-lg ${stock.stock_data.percentage_change >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
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
                                    <p className={`font-semibold  text-lg ${stock.stock_data.change_rs >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        ₹{stock.stock_data.change_rs}
                                    </p>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <p>No stocks found.</p>
                )}
            </div>

            

            {/* More Button */}
            <div className="text-center">
                <button 
                    onClick={handleMoreClick} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    More Stocks
                </button>
            </div>

            {/* Latest News Section */}
            {/* <LatestNews news={allNews} /> */}
        </div>
    );
};

export default StockScreener;
