import { useState } from 'react';
// svg 최적화
import profile from '../../assets/images/profile.svg';

import bedIcon from '../../assets/icons/bedIcon.svg';
import ImageSlider from './ImageSlider';
import PostInteraction from './PostInteraction';
import PostComments from './PostComments';
import testImage from '../../assets/images/textImage.png';

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
    Base64s: Base64Image;
  };
}

type Base64Image = { url: string }[];
interface likesObj {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
}
export default function Post({ post }: PostProps) {
  const parsedTitle = JSON.parse(post.title);

  // undefined
  // console.log('comments:', comments);

  const [showBox, setShowBox] = useState(false);
  // console.log('showBox:', showBox);
  const toggleCommentBox = () => {
    setShowBox((prev) => !prev);
  };

  return (
    <div className="border border-[var(--color-post-border)] p-4 rounded-lg shadow-sm bg-white max-w-[600px] h-100% px-[30px]  mb-[30px] ">
      <div className="flex justify-between mb-[10px]">
        <div className="flex items-center gap-0.2">
          <img src={profile} alt="user" className="w-[40px] h-[40px]" />
          <div className="font-bold text-[18px]">
            {parsedTitle.author || post.author.fullName}
          </div>
        </div>
        <div className="flex gap-3 h-[40px]">
          {parsedTitle.tags?.map((tag, idx) => (
            <div
              key={idx}
              className="bg-[#2A728C] text-white px-3 py-1 h-[25px] rounded-xl text-[13px] flex items-center"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* <ImageSlider images={post.Base64s.url} alt={parsedTitle.writtenTitle} /> */}
      <div className="flex justify-center">
        <img
          src={testImage}
          alt="testImage"
          className="w-[320px] h-[250px] mb-[10px]"
        />
      </div>

      {/* 이미지 아래부분 전체 */}
      <div className="flex flex-row  gap-2">
        {/* 댓글 좋아요 상자 제외 전체 */}
        <div className="w-[600px]">
          {/* 제목,날짜, */}
          <div className="flex justify-between items-center">
            <h2 className="text-[30px] font-bold text-[var(--color-title)] mb-[20px]">
              {parsedTitle.writtenTitle}
            </h2>
            <div className="flex justify-end text-[var(--color-subText)]">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            {/* import dayjs from 'dayjs';
            dayjs(post.createdAt).format('YYYY.MM.DD') */}
          </div>

          {/* 장소,비용 */}
          <div className="flex gap-3  text-[var(--color-subText)] border-b-2 border-[var(--color-lightGray)] mb-[10px] w-[100%] py-[5px]">
            <div className="flex gap-3 text-[15px]">
              {parsedTitle.locations?.map((loc, idx) => (
                <p key={idx}>{loc}</p>
              ))}
            </div>
            <div className="ml-auto text-[12px]">
              총 비용: {parsedTitle.cost} ₩
            </div>
          </div>

          {/* 숙소 */}
          {parsedTitle.hotels?.map((hotel, idx) => (
            <div key={idx} className=" flex gap-2  ">
              <img src={bedIcon} alt="bed" className="mb-auto" />
              <div className="mb-[10px] text-[var(--color-subText)] text-[15px] ">
                {hotel}
              </div>
            </div>
          ))}
          {/* 본문내용 */}
          <div className="min-h-[130px] overflow-auto border-t-2 border-[var(--color-lightGray)] py-3">
            <p className="text-[15px] whitespace-pre-line">
              {parsedTitle.context}
            </p>
          </div>
        </div>
      </div>
      <div className="w-100% border-[var(--color-black)]  flex flex-col ">
        <PostInteraction
          postId={post._id}
          likes={post.likes}
          comments={post.comments}
        />
        {!showBox && (
          <div
            className="text-[var(--color-subText)] cursor-pointer underline py-0.5 ml-[4px]"
            onClick={toggleCommentBox}
          >
            발자국 {post.comments.length}개 모두보기...
          </div>
        )}

        {showBox && <PostComments postId={post._id} comments={post.comments} />}
      </div>
    </div>
  );
}
