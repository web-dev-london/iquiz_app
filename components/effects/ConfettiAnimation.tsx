import Lottie from 'lottie-react';
import trophyConfetti from '@/animations/trophy-confetti.json';

const ConfettiAnimation = () => {
  return (
    <>
      <div className="absolute top-[40%] md:top-[15%] left-[50%] translate-x-[-50%] translate-y-[-40%] md:translate-y-[-15%] " >
        <Lottie
          animationData={trophyConfetti}
          loop={true}
          autoplay={true}
        />
      </div>
    </>
  )
}

export default ConfettiAnimation;
