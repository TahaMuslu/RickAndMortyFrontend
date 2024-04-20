import React from 'react';
import EpisodeCard from '../components/EpisodeCard';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import httpService from '../services/httpService';
import Pagination from '../components/Pagination';
import Search from 'antd/es/input/Search';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';

const Episodes = () => {
    const [data, setData] = useState([]);
    const [initData, setInitData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allData, setAllData] = useState({ results: [...Array(20).keys()].map((i) => ({ id: i })), info: {} });
    const [search, setSearch] = useState('');
    const [paginationInfo, setPaginationInfo] = useState({});
    const baseUrl = "episode";

    const pageFilter = useSearchParams();

    const debounced = useDebouncedCallback(
        (value) => {
            setSearch(value);
        },
        1000
    );

    useEffect(() => {
        if (search === '') {
            setData(initData);
        } else {
            const filteredData = initData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
            const filteredData2 = initData.filter((item) => item.episode.toLowerCase().includes(search.toLowerCase()));
            const filteredData3 = initData.filter((item) => item.air_date.toLowerCase().includes(search.toLowerCase()));
            // only unique values
            const uniqueData = [...new Set([...filteredData2, ...filteredData, ...filteredData3])];
            setData(uniqueData);
        }
    }, [search]);

    useEffect(() => {
        let page = pageFilter[0].get('page');
        if (page !== null)
            httpService.get(baseUrl + "?page=" + page).then((response) => {
                setAllData(response.data);
            }).catch((error) => {
                httpService.get(baseUrl).then((response) => {
                    setAllData(response.data);
                });
            });
        else
            httpService.get(baseUrl).then((response) => {
                setAllData(response.data);
            });
    }, []);

    useEffect(() => {
        setData([...Array(20).keys()].map((i) => ({ id: i })));
        setInitData([...Array(20).keys()].map((i) => ({ id: i })));
        setTimeout(() => {
            setData(allData.results);
            setInitData(allData.results);
            setPaginationInfo(allData.info);
            setLoading(false);
        }, 1000);
    }, [allData]);

    return (
        <Row justify={'start'}>
            <div className='w-full justify-center flex py-6'>
                <h1 className='text-4xl'>Episodes</h1>
            </div>
            <Col span={24} className='flex justify-center'>
                <Search className='w-60' placeholder="Search" enterButton onChange={e => debounced(e.target.value)} />
            </Col>
            {data && data.map((item) => (
                <EpisodeCard key={item.id} item={item} loading={loading} />
            ))}
            <Pagination paginationInfo={paginationInfo} setAllData={setAllData} baseUrl={baseUrl} setLoading={setLoading} />
        </Row>
    );
};

export default Episodes;