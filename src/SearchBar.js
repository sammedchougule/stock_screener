import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit, allStocks, onStockSelect }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track highlighted item in dropdown
    const dropdownRef = useRef(null);

    // Detect click outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
                setHighlightedIndex(-1); // Reset highlighted index when closing dropdown
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle input change and show dropdown when typing
    const handleInputChange = (e) => {
        onSearchChange(e.target.value);
        setIsDropdownVisible(true); // Show the dropdown on typing
        setHighlightedIndex(-1); // Reset highlight on new search input
    };

    // Handle key navigation in the dropdown (Arrow Up/Down and Enter)
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            // Cycle down through the dropdown items
            setHighlightedIndex((prevIndex) => 
                (prevIndex + 1) % filteredStocks.length // Loop back to the top
            );
        } else if (e.key === 'ArrowUp') {
            // Cycle up through the dropdown items
            setHighlightedIndex((prevIndex) => 
                (prevIndex === 0 ? filteredStocks.length - 1 : prevIndex - 1) // Loop to the bottom
            );
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0 && filteredStocks.length > 0) {
                // Select the highlighted stock on pressing Enter
                onStockSelect(filteredStocks[highlightedIndex].symbol);
                setIsDropdownVisible(false);
            } else {
                onSearchSubmit(); // Submit the search if no item is highlighted
            }
        } else if (e.key === 'Escape') {
            // Close the dropdown on pressing Escape
            setIsDropdownVisible(false);
            setHighlightedIndex(-1);
        }
    };

    // Handle stock selection from the dropdown
    const handleStockClick = (symbol) => {
        onStockSelect(symbol);
        setIsDropdownVisible(false);
        setHighlightedIndex(-1);
    };

    // Filter all stocks for dropdown suggestions
    const filteredStocks = allStocks.filter((stock) =>
        stock.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Handle key navigation
                className="w-full p-2 border rounded-xl h-12"
                placeholder="Search for stocks..."
            />
            {isDropdownVisible && searchTerm && (
                <div
                    ref={dropdownRef}
                    className="absolute bg-white border rounded-xl w-full mt-1 max-h-60 overflow-y-auto"
                >
                    {filteredStocks.length > 0 ? (
                        filteredStocks.map((stock, index) => (
                            <div
                                key={stock.symbol}
                                onClick={() => handleStockClick(stock.symbol)}
                                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                    index === highlightedIndex ? 'bg-gray-300' : ''
                                }`}
                                style={{
                                    backgroundColor: index === highlightedIndex ? '#e2e8f0' : 'white', // Highlight when selected
                                }}
                            >
                                {stock.symbol} - {stock.company_name}
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-gray-500">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
