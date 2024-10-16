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
        <div className="max-w-6xl mx-auto p-5">
            {/* Search Bar with Dropdown */}
            <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
                onSearchSubmit={handleSearchSubmit} 
                allStocks={stocks}  // Pass all the stocks for searching
                onStockSelect={handleStockSelect} 
            />

            {/* Stock Cards */}
            <div className="flex flex-wrap -mx-4">
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
