import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../actions/favoriteAction';
import { showNotification } from '../actions/notificationAction';
import httpservice from '../services/httpService';

const Home = () => {
    const [data, setData] = useState([]);
    // const dispatch = useDispatch();
    // const favorites = useSelector((state) => state.favorite);
    // dispatch(showNotification({ type: "error", message: "hata", description: "açıklama" }));


    // dispatch(addFavorite({ name: "React", id: 1 }));
    useEffect(() => {
        httpservice.get("episode?page=1").then((response) => {
            setData(response.data.results);
        });
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {data.map((item) => (
                <div key={item.id}>
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default Home;