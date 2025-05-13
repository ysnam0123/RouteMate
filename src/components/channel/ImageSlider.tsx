import { useState } from 'react';
import leftArrowGray from '../../assets/icons/leftArrowGray.svg';
import rightArrowGray from '../../assets/icons/rightArrowGray.svg';
import leftArrowBlue from '../../assets/icons/leftArrowBlue.svg';
import rightArrowBlue from '../../assets/icons/rightArrowBlue.svg';

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

  const [arrowColor, setArrowColor] = useState(false);
  const arrowToggleHandler = () => [setArrowColor((arrowColor) => !arrowColor)];

  return (
    <div className="flex justify-center items-center gap-4 w-[100%] relative">
      {/* 왼쪽 화살표 */}
      <div className="absolute left-0">
        <button onClick={showPrev} disabled={currentIndex === 0}>
          <img
            src={arrowColor ? leftArrowBlue : leftArrowGray}
            alt="left arrow"
            className="w-10 h-10"
            // 수정해야함! 지금은 클릭하면 바뀌고 다시 클릭해야 다시 바뀜
            onClick={arrowToggleHandler}
          />
        </button>
      </div>
      <div className="flex overflow-auto">
        {/* 현재 이미지 */}
        <img
          src={images[currentIndex]}
          alt={alt}
          className="h-[310px] w-[310px] mb-[20px] object-cover rounded-lg"
        />
      </div>
      {/* 오른쪽 화살표 */}
      <div className="absolute right-0">
        <button
          onClick={showNext}
          disabled={currentIndex === images.length - 1}
        >
          <img src={rightArrowGray} alt="right arrow" className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
}
