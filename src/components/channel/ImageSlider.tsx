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
  console.log('현재 이미지:', images);
  const showPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const showNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="flex justify-center items-center gap-4 w-full relative mb-8">
      {/* 왼쪽 화살표 */}
      {images.length > 1 && (
        <div className="absolute left-0">
          <button onClick={showPrev} disabled={currentIndex === 0}>
            <img
              src={currentIndex > 0 ? leftArrowBlue : leftArrowGray}
              alt="left arrow"
              className="w-10 h-10"
            />
          </button>
        </div>
      )}

      {/* 이미지 */}
      <div className="flex overflow-auto">
        <img
          src={images[currentIndex]}
          alt={alt}
          className="h-[52px] w-[52px] object-cover rounded-lg"
        />
      </div>

      {/* 오른쪽 화살표 */}
      {images.length > 1 && (
        <div className="absolute right-0">
          <button
            onClick={showNext}
            disabled={currentIndex === images.length - 1}
          >
            <img
              src={
                currentIndex < images.length - 1
                  ? rightArrowBlue
                  : rightArrowGray
              }
              alt="right arrow"
              className="w-10 h-10"
            />
          </button>
        </div>
      )}
    </div>
  );
}
