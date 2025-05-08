import { useState } from 'react';
import like from '../assets/icons/like.svg';
import liked from '../assets/icons/liked.svg';
import footPrint from '../assets/icons/footPrint.svg';

import { useLikeStore } from '../../stores/likeStore';

export default function PostButton() {
  const [isLiked, setIsLiked] = useState(false); // ✅ 상태 추가
  const likes = useLikeStore((state) => state.likes);

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev); // ✅ 클릭할 때 상태 반전
  };

  return (
    <div className="flex flex-row gap-[5px] mb-[20px]">
      <button
        onClick={handleLikeClick}
        className="rounded-[10px] text-sm font-semibold cursor-pointer flex flex-row gap-[10px] w-[80px] items-center"
      >
        <img src={isLiked ? liked : like} alt="like" /> 좋아요
      </button>

      <button className="rounded-[10px] text-sm font-semibold cursor-pointer flex flex-row gap-[5px] w-[80px] items-center">
        <img src={footPrint} alt="footPrint" />
        발자국
      </button>
    </div>
  );
}
