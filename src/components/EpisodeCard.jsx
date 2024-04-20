import { Badge, Card, Col } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { useNavigate } from 'react-router';

const EpisodeCard = ({ item, loading }) => {
    const navigate = useNavigate();
    return (
        <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={2} key={item.id} className='p-4 cursor-pointer' onClick={() => item.id ? navigate(`/episode/${item.id}`) : {}}>
            <Badge.Ribbon text={item.episode} className={loading ? 'hidden' : ''}>
                <Card
                    loading={loading}
                    hoverable
                    className='border-2 px-2'
                    title={item.name}
                >
                    <Meta className='mb-4' title={"Yayınlanma Tarihi"} description={item.air_date} />
                    <Meta className='mb-4' title={"Karakter Sayısı"} description={item.characters?.length} />
                </Card>
            </Badge.Ribbon>
        </Col>
    );
};

export default EpisodeCard;