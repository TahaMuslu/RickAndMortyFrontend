import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Card, Col, Modal } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addFavorite, deleteFavorite } from '../actions/favoriteAction';
import { showNotification } from '../actions/notificationAction';

const CharacterCard = ({ item, loading }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const isFavorite = useSelector((state) => state.favorites.some((character) => character.id === item?.id));
    const favoriteLength = useSelector((state) => state.favorites.length);

    const handleFavorite = () => {
        if (favoriteLength >= 10 && !isFavorite)
            dispatch(showNotification({ type: 'error', message: 'You have exceeded the number of favorite characters.', description: 'You must remove another character from the favorites.' }));
        if (isFavorite) {
            setDeleteModalVisible(true);
        } else {
            dispatch(addFavorite(item));
        }
    };

    return (
        (item?.id || loading) ?
            <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={4} key={item?.id} className='p-4'>
                <Card
                    loading={loading}
                    hoverable
                    className='border-2 px-2'
                    cover={<img alt={item?.name} src={item?.image} onClick={() => item?.id ? navigate(`/character/${item?.id}`) : {}} />}
                    title={
                        <div className='flex justify-between cursor-default'>
                            <span className='overflow-hidden me-2'>{item?.name?.length > 12 ? item?.name?.slice(0, 12) + '...' : item?.name}</span>
                            {isFavorite && !loading
                                ?
                                <StarFilled onClick={() => handleFavorite()} />
                                :
                                <StarOutlined onClick={() => handleFavorite()} />
                            }
                        </div>
                    }
                >
                    <div className='cursor-pointer' onClick={() => item?.id ? navigate(`/character/${item?.id}`) : {}}>
                        <Meta className='mb-4' title={"Status"} description={item?.status} />
                        <Meta className='mb-4' title={"Species"} description={item?.species} />
                        <Meta className='mb-4' title={"Gender"} description={item?.gender} />
                        <Meta className='mb-4' title={"Origin"} description={item?.origin?.name} />
                        <Meta className='mb-4' title={"Location"} description={item?.location?.name} />
                        <Meta className='mb-4' title={"Number of Episodes Played"} description={item?.episode?.length} />
                    </div>
                </Card>
                <Modal
                    title={"Are you sure you want to remove" + item?.name + "from favorites?"}
                    open={deleteModalVisible}
                    onOk={() => { dispatch(deleteFavorite(item?.id)); setDeleteModalVisible(false); }}
                    onCancel={() => setDeleteModalVisible(false)}
                    okText="Yes"
                    cancelText="No"
                />
            </Col>
            :
            <h2 className='text-2xl ms-2'>Unknown</h2>
    );
};

export default CharacterCard;