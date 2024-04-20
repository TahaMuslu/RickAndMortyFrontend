import { Button } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
                <div className='cursor-pointer' onClick={() => navigate('/')}>
                    <h1 className="text-2xl font-bold">Rick and Morty</h1>
                </div>
                <div className="flex justify-between items-center gap-4">
                    <Button type="primary" className='pad' onClick={() => navigate('/')}>Home</Button>
                    <Button type="primary" className='pad' onClick={() => navigate('/character')}>Characters</Button>
                    <Button type="primary" className='pad' onClick={() => navigate('/location')}>Locations</Button>
                    <Button type="primary" className='pad' onClick={() => navigate('/episode')}>Episodes</Button>
                    <Button type="primary" className='pad' onClick={() => navigate('/favorites')}>Favorite Characters</Button>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;