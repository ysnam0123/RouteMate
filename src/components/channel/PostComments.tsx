import React, { useEffect, useState } from 'react';
import whiteFootPrint from '../../assets/icons/footprintWhite.png';
import { axiosInstance } from '../../api/axios';
import { useAuthStore } from '../../stores/authStore';
import userImage from '../../assets/images/Ellipse 25.png';

interface PostCommentsProps {
  // 게시물 id
  postId: string;
  // 게시물 댓글 배열
  comments: commentsObj[];
}
interface commentsObj {
  _id: string;
  comment: string;
  author: { fullname: string };
}
// useEffect(() => {
//   console.log(Comment);
// }, []);
export default function PostComments({
  // 받을 props
  postId,
  comments,
}: PostCommentsProps) {
  const [comment, setComment] = useState('');
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    console.log(setComment);
  };
  const commentHandler = async () => {
    try {
      const response = await axiosInstance.post('/comments/create', {
        postId,
        comment,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="overflow-scroll">
        {comments.map((comment, index) => (
          <div key={index} className="flex gap-4 items-center mb-[10px]">
            <img src={userImage} alt="user" className="w-[50px] h-[50px]" />
            <div className="flex flex-col">
              {/* 풀네임 안나옴 */}
              <h1>{comment.author.fullname}</h1>
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-auto">
        <input
          type="text"
          className="border-[var(--color-main-skyBlue)] border-2 rounded-xl w-[220px] px-[10px]"
          placeholder="발자국 남기기"
          value={comment}
          onChange={changeHandler}
        />
        <button className="bg-[var(--color-main-skyBlue)] w-[50px] h-[50px] flex justify-center items-center rounded-xl hover:bg-[var(--color-main-skyBlue-hover)] active:bg-[var(--color-main-skyBlue-active)]">
          <img
            src={whiteFootPrint}
            alt="footprint"
            className="w-[30px] h-[30px]"
            onClick={commentHandler}
          />
        </button>
      </div>
    </>
  );
}
