import React from 'react';
import like from '../../assets/icons/like.svg';
import footPrint from '../../assets/icons/footPrintBlack.svg';
import whiteFootPrint from '../../assets/icons/footprintWhite.png';
import userImage from '../../assets/images/알림 프사.png';

interface PostInteractionProps {
  likes: any[];
  comments: any[];
}

export default function PostInteraction({
  likes,
  comments,
}: PostInteractionProps) {
  return (
    <div className="w-[330px] h-full border-[var(--color-black)] border-1 py-[15px] px-[25px] rounded-xl flex flex-row ">
      <div className="flex flex-col w-full">
        <div className="flex gap-3 mb-[15px]">
          <div className="flex flex-row gap-1 cursor-pointer">
            <img src={like} alt="like" className="w-[20px]" />
            좋아요 {likes.length}개
          </div>
          <div className="flex flex-row gap-1 ">
            <img src={footPrint} alt="footprint" className="w-[20px]" />
            댓글 {comments.length}개
          </div>
        </div>

        <div className="overflow-scroll">
          {/* 아직 데이터 안바꿈 */}
          {comments.map((comment, index) => (
            <div key={index} className="flex gap-4 items-center mb-[10px]">
              <img src={userImage} alt="user" className="w-[50px] h-[50px]" />
              <div className="flex flex-col">
                <h1>Namyoonseo</h1>
                <p>{comment.content || '댓글 내용'}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          <input
            type="text"
            className="border-[var(--color-main-skyBlue)] border-2 rounded-xl w-[220px] px-[10px]"
            placeholder="발자국 남기기"
          />
          <button className="bg-[var(--color-main-skyBlue)] w-[50px] h-[50px] flex justify-center items-center rounded-xl hover:bg-[var(--color-main-skyBlue-hover)] active:bg-[var(--color-main-skyBlue-active)]">
            <img
              src={whiteFootPrint}
              alt="footprint"
              className="w-[30px] h-[30px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
