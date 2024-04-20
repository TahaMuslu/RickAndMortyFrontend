import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import httpService from '../services/httpService';
import LoadingAnimation from '../components/LoadingAnimation';
import CharacterCard from '../components/CharacterCard';

const Episode = () => {
    const [data, setData] = useState({});
    const [characters, setCharacters] = useState([...Array(12).keys()].map((i) => ({ id: i })));
    const [loading, setLoading] = useState(true);
    const [characterLoading, setCharacterLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        httpService.get("episode/" + id).then((response) => {
            setData(response.data);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        });
    }, [id]);

    useEffect(() => {
        async function getCharacters() {
            setCharacterLoading(true);
            if (data?.characters) {
                setCharacters([...Array(12).keys()].map((i) => ({ id: i })));
                var characters = [];
                await data.characters.forEach(async (character) => {
                    httpService.get('character/' + character.split('/').pop()).then((response) => {
                        characters.push(response.data);
                    });
                });
                setTimeout(() => {
                    setCharacters(characters);
                    setCharacterLoading(false);
                }, 1000);
            }
        }
        getCharacters();
    }, [data]);

    return (
        <Row justify={'center'}>
            {loading ?
                <LoadingAnimation />
                :
                <Row justify={"center"} className='py-6 w-full'>
                    <Col span={24} className='mb-12 flex justify-around'>
                        <div className='flex-1'>
                            <Button onClick={() => navigate("/episode")} size='large' className='ms-4'>All Episodes</Button>
                        </div>
                        <div className='flex-1'>
                            <h1 className='text-4xl mx-auto w-fit box-content'>{data.episode} - {data.name}</h1>
                        </div>
                        <div className='flex-1'></div>
                    </Col>
                    <Row justify={"center"}>
                        <Col span={24} className='mb-12'>
                            <h2 className='text-2xl w-fit mx-auto'><b>Air Date:</b> {data.air_date}</h2>
                        </Col>
                        <Col span={24} className='mb-12'>
                            <h2 className='text-2xl w-fit mx-auto'><b>Number of Characters:</b> {data.characters?.length ?? 0}</h2>
                        </Col>
                        {data.characters?.length !== 0 && <Col span={24} className='mb-12'>
                            <h2 className='text-4xl w-fit mx-auto font-extrabold mb-2'>Characters from The Episode:</h2>
                            <Row justify={"center"}>
                                {characters && characters.map((character) =>
                                    < CharacterCard key={character.id} item={character} loading={characterLoading} />
                                )}
                            </Row>
                        </Col>}
                    </Row>
                </Row>
            }
        </Row>
    );
};

export default Episode;;