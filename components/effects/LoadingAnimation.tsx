import React from 'react';
import Lottie from 'lottie-react';
import LoadingLaptob from '@/animations/loading.json';

const LoadingAnimation = () => {
  return (
    <div>
      <Lottie animationData={LoadingLaptob} loop={true} autoplay={true} />
    </div>
  );
};

export default LoadingAnimation;