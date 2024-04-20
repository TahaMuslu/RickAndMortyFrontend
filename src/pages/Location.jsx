import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import httpService from '../services/httpService';
import { Button, Col, Row } from 'antd';
import LoadingAnimation from '../components/LoadingAnimation';
import CharacterCard from '../components/CharacterCard';

const Location = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [residentLoading, setResidentLoading] = useState(true);
    const [residents, setResidents] = useState([...Array(12).keys()].map((i) => ({ id: i })));
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        httpService.get("location/" + id).then((response) => {
            setData(response.data);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        });
    }, [id]);

    useEffect(() => {
        async function getResidents() {
            setResidentLoading(true);
            if (data?.residents) {
                setResidents([...Array(12).keys()].map((i) => ({ id: i })));
                var residents = [];
                await data.residents.forEach(async (resident) => {
                    httpService.get('character/' + resident.split('/').pop()).then((response) => {
                        residents.push(response.data);
                    });
                });
                setTimeout(() => {
                    setResidents(residents);
                    setResidentLoading(false);
                }, 1000);
            }
        }
        getResidents();
    }, [data]);

    return (
        <Row justify={'center'}>
            {loading ?
                <LoadingAnimation />
                :
                <Row justify={"center"} className='py-6 w-full'>
                    <Col span={24} className='mb-12 flex justify-around'>
                        <div className='flex-1'>
                            <Button onClick={() => navigate("/location")} size='large' className='ms-4'>All Locations</Button>
                        </div>
                        <div className='flex-1'>
                            <h1 className='text-4xl mx-auto w-fit box-content'>{data.name}</h1>
                        </div>
                        <div className='flex-1'></div>
                    </Col>
                    <Row justify={"center"}>
                        <Col span={24} className='mb-12'>
                            <h2 className='text-2xl w-fit mx-auto'><b>Type:</b> {data.type}</h2>
                        </Col>
                        <Col span={24} className='mb-12'>
                            <h2 className='text-2xl w-fit mx-auto'><b>Dimension:</b> {data.dimension}</h2>
                        </Col>
                        <Col span={24} className='mb-12'>
                            <h2 className='text-2xl w-fit mx-auto'><b>Number of residents:</b> {data.residents?.length ?? 0}</h2>
                        </Col>
                        {data.residents?.length !== 0 && <Col span={24} className='mb-12'>
                            <h2 className='text-4xl w-fit mx-auto font-extrabold mb-2'>Residents:</h2>
                            <Row justify={"center"}>
                                {residents && residents.map((resident) =>
                                    <CharacterCard key={resident.id} item={resident} loading={residentLoading} />
                                )}
                            </Row>
                        </Col>}
                    </Row>
                </Row>
            }
        </Row>
    );
};

export default Location;