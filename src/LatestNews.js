// src/LatestNews.js
import React from 'react';
import { getRandomColor } from './utils/colorUtils';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'; 


const LatestNews = ({ news }) => {
    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Latest News</h2>
            <ul className="">
                {/* {news.map((item, index) => (
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
                ))} */}

                {news.map((item, index) => (
                    <div key={index} className="p-4 bg-white shadow rounded mb-4 flex items-center">

                        <div className="ml-4 flex-1">
                            <div className={` rounded-lg font-bold p-2 mr-40 inline-block ${getRandomColor()}`}>
                                {item.symbol}
                            </div>
                            <div className="text-xl font-semibold">{item.company_name}</div>
                            <div className="text-lg text-gray-600">
                                <a className='underline hover:underline-offset-4' href='#'>{item.headline}</a>
                            </div>
                            <div className="text-md text-gray-500">{item.date}</div>
                        </div>

                        <div className="text-right">
                            <div className="text-2xl font-semibold">₹{item.current_price}</div>
                            <div className={`p-1 rounded-md items-center flex inline-block text-xl ${item.percentage_change >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
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
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default LatestNews;
