import { Badge, Card, Col } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { useNavigate } from 'react-router';

const LocationCard = ({ item, loading }) => {
    const navigate = useNavigate();

    return (
        <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={2} key={item?.id} className='p-4 cursor-pointer' onClick={() => item?.id ? navigate(`/location/${item?.id}`) : {}}>
            <Badge.Ribbon text={item.type} color='green' className={loading ? 'hidden' : ''}>
                <Card
                    loading={loading}
                    hoverable
                    className='border-2 px-2'
                    title={item?.name}
                >
                    {/* <Meta className='mb-4' title={"Type"} description={item?.type} /> */}
                    <Meta className='mb-4' title={"Dimension"} description={item?.dimension} />
                    <Meta className='mb-4' title={"Number of residents"} description={item?.residents?.length} />
                </Card>
            </Badge.Ribbon>
        </Col>
    );
};

export default LocationCard;