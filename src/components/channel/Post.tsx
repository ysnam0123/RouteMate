import React from 'react';
import profile from '../../assets/images/profile.svg';
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
  console.log(parsedTitle);

  return (
    <div className="border border-[var(--color-post-border)] p-4 rounded-lg shadow-sm bg-white max-w-[1094px] h-[910px] px-[30px]  mb-[30px] ">
      <div className="flex justify-between mb-[10px]">
        <div className="flex items-center gap-3">
          <img src={profile} alt="user" className="w-[50px] h-[50px]" />
          {parsedTitle.author || post.author.fullName}
        </div>
        <div className="flex gap-3 h-[40px]">
          {parsedTitle.tags?.map((tag, idx) => (
            <div
              key={idx}
              className="bg-[#2A728C] text-white px-3 py-1 rounded-xl text-[15px] flex items-center"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      <ImageSlider images={[post.image]} alt={parsedTitle.title} />

      <div className="flex flex-row gap-7 h-[450px]">
        <div className="min-w-[670px]">
          <div className="flex justify-between">
            <h2 className="text-[30px] font-bold text-[var(--color-title)] mb-[20px]">
              {parsedTitle.writtenTitle}
            </h2>
            <div className="flex justify-end ttext-[var(--color-darkGray)]">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex gap-3 text-[14px] text-[var(--color-darkGray)] border-b-2 border-[var(--color-lightGray)] mb-[10px] w-[100%] py-[5px]">
            <div className="flex gap-3">
              {parsedTitle.locations?.map((loc, idx) => (
                <p key={idx}>{loc}</p>
              ))}
            </div>
            <div className="ml-auto">총 비용: {parsedTitle.cost} ₩</div>
          </div>

          {parsedTitle.hotels?.map((hotel, idx) => (
            <div key={idx} className=" flex gap-2  ">
              <img src={bedIcon} alt="bed" className="mb-auto" />
              <div className="mb-[10px] text-[var(--color-darkGray)] text-[15px] ">
                {hotel}
              </div>
            </div>
          ))}

          <div className="h-[280px] overflow-auto border-t-2 border-[var(--color-lightGray)] py-3">
            <p className="text-[15px] whitespace-pre-line">
              {parsedTitle.context}
            </p>
          </div>
        </div>
        <div className="w-[330px] h-[500px] border-[var(--color-black)] border-1 py-[15px] px-[15px] rounded-xl flex flex-col ml-[15px] mt-[50px]">
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
