import Lottie from 'lottie-react';
import React from 'react';

const LoadingAnimation = () => {

    return (
        <div className={`flex justify-center items-center w-screen h-screen dark:bg-dark`}>
            <Lottie animationData={require("../assets/animations/loading.json")} className='w-48 h-48' />
        </div>
    );
};

export default LoadingAnimation;