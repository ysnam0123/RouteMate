import React from 'react';
import userImage from '../../assets/images/Ellipse 25.png';
import bedIcon from '../../assets/icons/bedIcon.svg';
import ImageSlider from './ImageSlider';
import PostInteraction from './PostInteraction';
import PostComments from './PostComments';
interface PostProps {
  post: {
    _id: string;
    title: string;
    createdAt: string;
    // likes: any[];
    likes: likesObj[];
    comments: any[];
    author: {
      fullName: string;
    };
    image: string;
  };
}
interface likesObj {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
}
export default function Post({ post }: PostProps) {
  const parsedTitle = JSON.parse(post.title);

  return (
    <div className="border border-[var(--color-post-border)] p-4 rounded-lg shadow-sm bg-white max-w-[1094px] h-[910px] px-[30px]  mb-[30px] ">
      <div className="flex justify-between mb-[10px]">
        <div className="flex items-center gap-3">
          <img src={userImage} alt="user" className="w-[50px] h-[50px]" />
          {parsedTitle.auther || post.author.fullName}
        </div>
        <div className="flex gap-3">
          <div className="bg-[#2A728C] text-white w-[65px] h-[35px] rounded-xl text-[15px] flex justify-center items-center">
            카페
          </div>
          <div className="bg-[#2A728C] text-white w-[65px] h-[35px] rounded-xl text-[15px] flex justify-center items-center">
            해운대
          </div>
        </div>
      </div>

      <ImageSlider images={[post.image]} alt={parsedTitle.title} />

      <div className="flex flex-row gap-7 h-[450px]">
        <div className="min-w-[670px]">
          <div className="flex justify-between">
            <h2 className="text-[25px] font-bold text-[var(--color-title)] mb-[10px]">
              {parsedTitle.title}
            </h2>
            <div className="flex justify-end text-[var(--color-subtext)]">
              작성일: {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex gap-3 text-[14px] text-[var(--color-subtext)] border-b-2 border-[var(--color-lightGray)] mb-[10px] w-[100%] ">
            <div className="flex gap-3">
              <p>부산 해운대</p>
              <p>부산 광안리</p>
              <p>부산 대학교</p>
            </div>
            <div className="ml-auto">총 비용: 200,000 ₩</div>
          </div>

          <div className="border-b-2 border-[var(--color-lightGray)] flex gap-2 mb-[10px]">
            <img src={bedIcon} alt="bed" className="mb-auto" />
            <div className="mb-[10px]">
              <div className="text-[var(--color-subtext)] text-[15px]">
                부산 해운대 호텔 1
              </div>
              <div className="text-[var(--color-subtext)] text-[15px]">
                부산 해운대 호텔 2
              </div>
            </div>
          </div>

          <div className="h-[280px] overflow-auto">
            <p className="text-[15px] whitespace-pre-line">
              {parsedTitle.body}
            </p>
            <p className="text-[15px] whitespace-pre-line">
              {parsedTitle.body}
            </p>
          </div>
        </div>
        <div className="w-[330px] h-full border-[var(--color-black)] border-1 py-[15px] px-[25px] rounded-xl flex flex-col ">
          <PostInteraction
            postId={post._id}
            likes={post.likes}
            comments={post.comments}
          />

          <PostComments postId={post._id} comments={post.comments} />
        </div>
      </div>
    </div>
  );
}
