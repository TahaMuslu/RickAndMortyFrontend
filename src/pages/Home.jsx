import React from 'react';
import { Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router';

const Home = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const favorites = useSelector((state) => state.favorite);
    // dispatch(showNotification({ type: "error", message: "hata", description: "açıklama" }));


    // dispatch(addFavorite({ name: "React", id: 1 }));


    return (
        <Row className='w-full flex-grow h-full items-center flex' justify={"center"}>
            <Col span={8} className='p-4 flex justify-center'>
                <div className='bg-red-500 rounded-full w-60 h-60 flex justify-center items-center cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out hover:shadow-red-500 hover:bg-red-600' onClick={() => navigate('/episode')}>
                    <h1 className='text-white text-2xl'>Episodes</h1>
                </div>
            </Col>
            <Col span={8} className='p-4 flex justify-center'>
                <div className='bg-green-500 rounded-full w-60 h-60 flex justify-center items-center cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out hover:shadow-green-500 hover:bg-green-600' onClick={() => navigate('/character')}>
                    <h1 className='text-white text-2xl'>Characters</h1>
                </div>
            </Col>
            <Col span={8} className='p-4 flex justify-center'>
                <div className='bg-blue-500 rounded-full w-60 h-60 flex justify-center items-center cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out hover:shadow-blue-500 hover:bg-blue-600' onClick={() => navigate('/location')}>
                    <h1 className='text-white text-2xl'>Locations</h1>
                </div>
            </Col>
        </Row>
    );
};

export default Home;