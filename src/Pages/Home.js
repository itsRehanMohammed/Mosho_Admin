import React from 'react';
import DailySalesChart from '../components/Home/DailySalesChart';
import HomeTopData from '../components/Home/HomeTopData';
import IncomeChart from '../components/Home/Income';
import TrendingDishes from '../components/Home/TrendingDishes';

const Home = () => {
    return (
        <>
            <div className='md:ml-6'>
                <HomeTopData />
                <div className='flex lg:flex-row flex-col items-center w-full'>
                    <DailySalesChart />
                    <IncomeChart />
                </div>
                <TrendingDishes />
            </div>
        </>
    )
}

export default Home;
