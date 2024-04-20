import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { Col, Row } from 'antd';
import Search from 'antd/es/input/Search';
import CharacterCard from '../components/CharacterCard';

const Favorites = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const favorites = useSelector((state) => state.favorites);


    const debounced = useDebouncedCallback(
        (value) => {
            setSearch(value);
        },
        1000
    );

    useEffect(() => {
        setData(favorites);
    }, [favorites]);

    useEffect(() => {
        if (search === '') {
            setData(favorites);
        } else {
            const filteredData = favorites.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
            const filteredData2 = favorites.filter((item) => item.species.toLowerCase().includes(search.toLowerCase()));
            const filteredData3 = favorites.filter((item) => item.origin?.name.toLowerCase().includes(search.toLowerCase()));
            const filteredData4 = favorites.filter((item) => item.location?.name.toLowerCase().includes(search.toLowerCase()));
            // only unique values
            const uniqueData = [...new Set([...filteredData2, ...filteredData, ...filteredData3, ...filteredData4])];
            setData(uniqueData);
        }
    }, [search]);

    return (
        <Row justify={'start'}>
            <div className='w-full justify-center flex py-6'>
                <h1 className='text-4xl'>Favorite Characters</h1>
            </div>
            <Col span={24} className='flex justify-center'>
                <Search className='w-60' placeholder="Search" enterButton onChange={e => debounced(e.target.value)} />
            </Col>
            {data && data.map((item) => (
                <CharacterCard key={item.id} item={item} loading={false} />
            ))}
        </Row>
    );
};

export default Favorites;