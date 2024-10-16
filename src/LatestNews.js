// src/LatestNews.js
import React from 'react';
import { getRandomColor } from './utils/colorUtils';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'; 


const LatestNews = ({ news }) => {
    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Latest News</h2>
            <ul className="divide-y divide-gray-300">
                {news.map((item, index) => (
                    <li key={index} className="py-4">
                        
                        <h1 className={`rounded-lg font-bold p-2 mr-40 inline-block ${getRandomColor()}`}>{item.symbol}</h1>
                        <h1 className="rounded-lg font-semibold inline-block ">{item.company_name}</h1>
                        <h1 className="rounded-lg text-2xl font-bold">{item.current_price}</h1>
                        <div className={`p-2 rounded-md items-center flex inline-block text-2xl ${item.percentage_change >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                            {item.percentage_change >= 0 ? (
                                <>
                                    <FaArrowUp className="text-green-500 mr-1" />
                                    <p className="font-semibold text-green-500">{item.percentage_change}%</p>
                                </>
                            ) : (
                                <>
                                    <FaArrowDown className="text-red-500 mr-1" />
                                    <p className="font-semibold text-red-500">{item.percentage_change}%</p>
                                </>
                            )}
                        </div>

                        <a 
                            href={item.link} 
                            className="text-xl hover:no-underline" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            {item.headline}.
                        </a>
                        <span>{item.date}:</span>{' '}


                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LatestNews;
