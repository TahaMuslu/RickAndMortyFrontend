import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import httpService from '../services/httpService';
import { current } from '@reduxjs/toolkit';

const Pagination = ({ paginationInfo, setAllData, baseUrl, setLoading }) => {
    const [settings, setSettings] = useState(paginationInfo);

    useEffect(() => {
        setSettings(paginationInfo);
    }, [paginationInfo]);

    useEffect(() => {
        if (settings?.next) {
            let temp = settings.next.split('=')[1];
            setSettings({ ...settings, current: parseInt(temp) - 1 });
        } else if (settings?.prev) {
            let temp = settings.prev.split('=')[1];
            setSettings({ ...settings, current: parseInt(temp) + 1 });
        }
    }, [settings?.next, settings?.prev]);

    const handleNext = () => {
        setAllData({ results: [...Array(20).keys()].map((i) => ({ id: i })), info: {} });
        setLoading(true);
        httpService.get(baseUrl + '?page=' + (settings.current + 1)).then((response) => {
            setAllData(response.data);
        });
    };

    const handlePrev = () => {
        setAllData({ results: [...Array(20).keys()].map((i) => ({ id: i })), info: {} });
        setLoading(true);
        httpService.get(baseUrl + '?page=' + (settings.current - 1)).then((response) => {
            setAllData(response.data);
        });
    };

    const handleGoTo = (value) => {
        if (parseInt(value) < 1)
            value = 1;
        if (parseInt(value) > settings?.pages)
            value = settings?.pages;
        if (parseInt(value) === settings?.current)
            return;
        setAllData({ results: [...Array(20).keys()].map((i) => ({ id: i })), info: {} });
        setLoading(true);
        httpService.get(baseUrl + '?page=' + value).then((response) => {
            setAllData(response.data);
        });
    };


    // "count": 51,
    // "pages": 3,
    // "next": "https://rickandmortyapi.com/api/episode?page=2",
    // "prev": null
    return (
        <div className='mt-4 mb-8 flex w-full justify-center items-center'>
            <Button disabled={settings && !settings?.prev} className='mx-2' type='primary' onClick={handlePrev}>Previous</Button>
            <span>{settings?.current} / {settings?.pages}</span>
            <Button disabled={settings && !settings?.next} className='mx-2' type='primary' onClick={handleNext}>Next</Button>
            <span className='ml-4'>Total: {settings?.count}</span>
            <span className='ml-4'>
                Go to page: &nbsp;
                <input type='number' min='1' max={settings?.pages} className='border-2 border-gray-300 rounded-md p-1' defaultValue={settings?.current} onBlur={(e) => handleGoTo(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGoTo(e.target.value)} />
            </span>
        </div>
    );
};

export default Pagination;