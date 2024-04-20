import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import httpService from '../services/httpService';
import { Button, Col, Image, Row } from 'antd';
import LoadingAnimation from '../components/LoadingAnimation';
import EpisodeCard from '../components/EpisodeCard';
import LocationCard from '../components/LocationCard';

const Character = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [episodeLoading, setEpisodeLoading] = useState(true);
    const [originLoading, setOriginLoading] = useState(true);
    const [origin, setOrigin] = useState({});
    const [locationLoading, setLocationLoading] = useState(true);
    const [location, setLocation] = useState({});
    const [episodes, setEpisodes] = useState([...Array(12).keys()].map((i) => ({ id: i })));
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        httpService.get("character/" + id).then((response) => {
            setData(response.data);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        });
    }, [id]);

    useEffect(() => {
        if (data?.origin) {
            setOriginLoading(true);
            setOrigin({});
            httpService.get('location/' + data.origin.url.split('/').pop()).then((response) => {
                setTimeout(() => {
                    setOrigin(response.data);
                    setOriginLoading(false);
                }, 1000);
            });
        }
    }, [data]);

    useEffect(() => {
        if (data?.location) {
            setLocationLoading(true);
            setLocation({});
            httpService.get('location/' + data.location.url.split('/').pop()).then((response) => {
                setTimeout(() => {
                    setLocation(response.data);
                    setLocationLoading(false);
                }, 1000);
            });
        }
    }, [data]);

    useEffect(() => {
        async function getEpisodes() {
            setEpisodeLoading(true);
            if (data?.episode) {
                setEpisodes([...Array(12).keys()].map((i) => ({ id: i })));
                var episodes = [];
                await data.episode.forEach(async (episode) => {
                    httpService.get('episode/' + episode.split('/').pop()).then((response) => {
                        episodes.push(response.data);
                    });
                });
                setTimeout(() => {
                    setEpisodes(episodes);
                    setEpisodeLoading(false);
                }, 1000);
            }
        }
        getEpisodes();
    }, [data]);

    return (
        <Row justify={'center'}>
            {loading ?
                <LoadingAnimation />
                :
                <Row justify={"center"} className='py-6 w-full'>
                    <Col span={24} className='mb-12 flex justify-around'>
                        <div className='flex-1'>
                            <Button onClick={() => navigate("/character")} size='large' className='ms-4'>All Characters</Button>
                        </div>
                        <div className='flex-1'>
                            <h1 className='text-4xl mx-auto w-fit box-content'>{data.name}</h1>
                        </div>
                        <div className='flex-1'></div>
                    </Col>
                    <Row justify={"center"}>
                        <Col span={24} className='mb-12 flex justify-center'>
                            <Image src={data.image} />
                        </Col>
                        <Col span={24} className='mb-12'>
                            <h2 className='text-2xl w-fit mx-auto'><b>Status:</b> {data.status}</h2>
                        </Col>
                        <Col span={24} className='mb-12'>
                            <h2 className='text-2xl w-fit mx-auto'><b>Species:</b> {data.species}</h2>
                        </Col>
                        {data.type &&
                            <Col span={24} className='mb-12'>
                                <h2 className='text-2xl w-fit mx-auto'><b>Type:</b> {data.type}</h2>
                            </Col>
                        }
                        <Col span={24} className='mb-12'>
                            <Row>
                                <Col span={12} className='mb-12 justify-end flex items-center'>
                                    <h2 className='text-2xl w-fit'><b>Origin:</b></h2>
                                </Col>
                                <LocationCard item={origin} loading={originLoading} />
                            </Row>
                        </Col>
                        <Col span={24} className='mb-12'>
                            <Row>
                                <Col span={12} className='mb-12 justify-end flex items-center'>
                                    <h2 className='text-2xl w-fit'><b>Location:</b></h2>
                                </Col>
                                <LocationCard item={location} loading={locationLoading} />
                            </Row>
                        </Col>
                        <Col span={24} className='mb-12'>
                            <h2 className='text-2xl w-fit mx-auto'><b>Number of Episodes Played:</b> {data.episode?.length ?? 0}</h2>
                        </Col>
                        {data.episode?.length !== 0 && <Col span={24} className='mb-12'>
                            <h2 className='text-4xl w-fit mx-auto font-extrabold mb-2'>Played in Episodes:</h2>
                            <Row justify={"center"}>
                                {episodes && episodes.map((episode) =>
                                    <EpisodeCard key={episode.id} item={episode} loading={episodeLoading} />
                                )}
                            </Row>
                        </Col>}
                    </Row>
                </Row>
            }
        </Row>
    );
};

export default Character;