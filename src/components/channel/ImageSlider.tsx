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

  if (!images || images.length === 0) {
    return <div className="text-gray-500">이미지가 없습니다.</div>;
  }

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      {/* 이미지 */}
      <img
        src={images[currentIndex]}
        alt={`${alt} ${currentIndex + 1}`}
        className="w-full h-64 object-cover rounded-lg"
      />

      {/* 왼쪽 화살표 */}
      {images.length > 1 && (
        <button
          onClick={showPrev}
          disabled={currentIndex === 0}
          className="absolute top-1/2 left-2 transform -translate-y-1/2"
        >
          <img
            src={currentIndex > 0 ? leftArrowBlue : leftArrowGray}
            alt="이전 이미지"
            className="w-10 h-10"
          />
        </button>
      )}

      {/* 오른쪽 화살표 */}
      {images.length > 1 && (
        <button
          onClick={showNext}
          disabled={currentIndex === images.length - 1}
          className="absolute top-1/2 right-2 transform -translate-y-1/2"
        >
          <img
            src={
              currentIndex < images.length - 1 ? rightArrowBlue : rightArrowGray
            }
            alt="다음 이미지"
            className="w-10 h-10"
          />
        </button>
      )}

      {/* 인디케이터 (선택사항) */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
