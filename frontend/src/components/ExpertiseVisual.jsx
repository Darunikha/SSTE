import React, { useEffect, useState } from 'react';
import spinningMachinesImg from '../assets/product images/spining machines.jpg';

const IMAGES = [spinningMachinesImg];

const ExpertiseVisual = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (IMAGES.length < 2) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="expertise-visual" aria-hidden="true">
      <img src={IMAGES[activeIndex]} alt="" className="expertise-visual-img" />
      <span className="expertise-visual-caption">Precision-first engineering, by design.</span>
    </div>
  );
};

export default ExpertiseVisual;
