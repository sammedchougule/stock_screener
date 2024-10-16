import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import stockData from './stockData.json';
import SearchBar from './SearchBar'; 
import LatestNews from './LatestNews';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'; 


    // Array of Tailwind background color classes
    const tailwindColors = [
        'bg-gray-400',
        'bg-gray-100',
        'bg-neutral-400',
        'bg-neutral-600',	
        'bg-neutral-500',
        'bg-red-400',	
        'bg-neutral-700',
        'bg-red-600',	
        'bg-stone-400',		
        'bg-stone-600',	
        'bg-orange-500',	
        'bg-orange-700',	
        'bg-red-500',   	
        'bg-amber-400',	
        'bg-red-700',	
        'bg-amber-600',	
        'bg-orange-400',	
        'bg-orange-600',	
        'bg-yellow-500',	
        'bg-yellow-700',
        'bg-amber-500',	
        'bg-lime-400',	
        'bg-amber-700',
        'bg-lime-600',	
        'bg-yellow-400',	
        'bg-yellow-600',	
        'bg-green-500',	
        'bg-green-700',	
        'bg-lime-500',	
        'bg-emerald-400',	
        'bg-lime-700',	
        'bg-emerald-600',	
        'bg-green-400',
        'bg-green-600',
        'bg-teal-500',
        'bg-green-800',
        'bg-teal-700',
        'bg-emerald-500',	
        'bg-cyan-400',
        'bg-emerald-700',
        'bg-cyan-600',
        'bg-teal-400',	
        'bg-teal-600',
        'bg-cyan-500',
        'bg-cyan-700',
        'bg-sky-400',
        'bg-sky-500',
        'bg-sky-600',
        'bg-sky-700',
        'bg-blue-400',
        'bg-blue-500',
        'bg-blue-600',
        'bg-blue-700',
        'bg-indigo-400',
        'bg-indigo-500',
        'bg-indigo-600',
        'bg-indigo-700',,
        'bg-violet-400',
        'bg-violet-500',
        'bg-violet-600',
        'bg-violet-700',
        'bg-purple-400',
        'bg-purple-500',
        'bg-purple-600',
        'bg-purple-700',	
        'bg-fuchsia-400',	
        'bg-fuchsia-500',	
        'bg-fuchsia-600',	
        'bg-fuchsia-700',		
        'bg-pink-400',
        'bg-pink-500',
        'bg-pink-600',
        'bg-pink-700',
        'bg-rose-400',
        'bg-rose-500',
        'bg-rose-600',
        'bg-rose-700'
    ];

    // Function to generate a random background color
    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * tailwindColors.length);
        return tailwindColors[randomIndex];
    };

    const StockScreener = ({stock}) => {
        const randomBgColor = getRandomColor(); // Get a random color
        const [stocks, setStocks] = useState([]); // All stocks
        const [searchTerm, setSearchTerm] = useState(''); 
        const [submittedSearchTerm, setSubmittedSearchTerm] = useState(''); 
        const [filteredStocks, setFilteredStocks] = useState([]); // Filtered stocks for display
        const navigate = useNavigate();


    useEffect(() => {
        const fetchStocks = async () => {
            const data = stockData?.stocks || [];
            setStocks(data); // Load all stock data
            setFilteredStocks(data.slice(0, 10)); // Display only the first 10 stocks initially
        };
        fetchStocks();
    }, []);

    useEffect(() => {
        if (submittedSearchTerm) {
            const filtered = stocks.filter(stock =>
                stock.company_name.toLowerCase().includes(submittedSearchTerm.toLowerCase()) ||
                stock.symbol.toLowerCase().includes(submittedSearchTerm.toLowerCase())
            );
            setFilteredStocks(filtered.slice(0, 10)); // Limit to 10 results
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
        <div className="max-w-6xl mx-auto p-5 ">

        <h1 class="mb-4 text-3xl font-extrabold text-gray-800  md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-red-500">Stock</span > InSight</h1>
            {/* Search Bar with Dropdown */}
            <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
                onSearchSubmit={handleSearchSubmit} 
                allStocks={stocks}  // Pass all the stocks for searching
                onStockSelect={handleStockSelect} 
            />

            

            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700">
                <svg class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
                </svg>
                <a href="#">
                    <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">Need a help in Claim?</h5>
                </a>
                <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                <a href="#" class="inline-flex font-medium items-center text-blue-600 hover:underline">
                    See our guideline
                    <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                    </svg>
                </a>
            </div>


            {/* Stock Cards */}
            <div className="flex flex-wrap mt-6 -mx-4">
                {filteredStocks?.length > 0 ? (
                    filteredStocks.map((stock, index) => (
                        <div key={index} className="mb-5 w-full sm:w-1/2 lg:w-1/3 px-4">
                            <div className="bg-white rounded-lg p-5 h-full shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg hover:cursor-pointer">
                                
                                <h1 className={`rounded-lg font-bold p-2 mr-40 inline-block ${randomBgColor}`}>{stock.symbol}</h1>
                                
                                <h2 className="text-lg font-medium mb-2">{stock.company_name}</h2>
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
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No stocks found.</p>
                )}
            </div>

            {/* More Button */}
            <div className="text-center mt-10">
                <button 
                    onClick={handleMoreClick} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    More Stocks
                </button>
            </div>

            {/* Latest News Section */}
            <LatestNews news={allNews} />
        </div>
    );
};

export default StockScreener;
