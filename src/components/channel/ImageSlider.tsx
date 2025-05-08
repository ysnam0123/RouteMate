import { useState } from 'react';
import leftArrowGray from '../../assets/icons/leftArrowGray.svg';
import rightArrowGray from '../../assets/icons/rightArrowGray.svg';

interface ImageSliderProps {
  images: string[];
  alt?: string;
}

export default function ImageSlider({
  images,
  alt = 'post image',
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const showNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="flex justify-center items-center gap-4">
      {/* 왼쪽 화살표 */}
      <button onClick={showPrev} disabled={currentIndex === 0}>
        <img src={leftArrowGray} alt="left arrow" className="w-6 h-6" />
      </button>
      <div className="flex overflow-auto">
        {/* 현재 이미지 */}
        <img
          src={images[currentIndex]}
          alt={alt}
          className="h-[310px] w-[310px] mb-[20px] object-cover rounded-lg"
        />
      </div>
      {/* 오른쪽 화살표 */}
      <button onClick={showNext} disabled={currentIndex === images.length - 1}>
        <img src={rightArrowGray} alt="right arrow" className="w-6 h-6" />
      </button>
    </div>
  );
}
