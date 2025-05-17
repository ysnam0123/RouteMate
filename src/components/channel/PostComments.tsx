import React, { useEffect, useState } from 'react';
import profile from '../../assets/images/profile.svg';
import whiteFootPrint from '../../assets/icons/footprintWhite.png';
import { axiosInstance } from '../../api/axios';
import { useAuthStore } from '../../stores/authStore';
import userImage from '../../assets/images/Ellipse 25.png';
import { toast } from 'react-toastify';

interface PostCommentsProps {
  postId: string; // 게시물 id
  comments: commentsObj[]; // 게시물 댓글 배열
}
interface UserData {
  _id: string;
  fullName: string;
  image: string;
  isOnline: boolean;
  posts: any[];
  likes: any[];
  comments: string[];
  username: string;
}
interface commentsObj {
  _id: string;
  comment: string;
  author: { fullname: string; image: string };
}

export default function PostComments({ postId, comments }: PostCommentsProps) {
  // console.log(comments);
  const userId = useAuthStore((state) => state.userId); // 로그인된 사용자 id
  // console.log(userId);
  const [comment, setComment] = useState(''); // 댓글의 내용
  const [commentList, setCommentList] = useState<commentsObj[]>(comments); // 기본값은 API에서 받아오는 댓글 목록
  const [userFullname, setUserFullname] = useState(''); // 풀네임

  // 댓글창에 입력되고있는 댓글
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // 유저 정보 불러오기
  const fetchUserinfo = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      setUserFullname(response.data.fullname);
      // console.log('userdata:', response.data);
    } catch (error) {
      console.error('유저 정보 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserinfo(userId); // 사용자 fullname 미리 받아오기
    }
  }, [userId]);

  // 댓글 등록 버튼
  const commentHandler = async () => {
    if (!comment.trim()) return; // 입력한게 없으면 리턴

    // 낙관적 업데이트 -> 임시 댓글 객체
    const fakeComment: commentsObj = {
      // id값 수정 필요
      _id: 'temp-' + Date.now(),
      comment: comment,
      author: {
        fullname: userFullname,
        image: userId,
      },
    };
    // console.log(commentList);

    // 일단 화면에 댓글 추가
    setCommentList((prev) => [...prev, fakeComment]);

    // 입력창 초기화
    setComment('');

    try {
      // 서버에 진짜 댓글 달기
      const response = await axiosInstance.post('/comments/create', {
        postId,
        comment,
      });
      const realComment: commentsObj = response.data.comment;
      // console.log('진짜댓글:', response.data);
      // 성공 시 → 임시 댓글을 진짜 댓글로 교체
      // 근데 이것도 문제임
      setCommentList((prev) =>
        prev.map((c) => (c._id === fakeComment._id ? realComment : c))
      );
    } catch (error) {
      console.error('댓글 작성 실패:', error);

      // 실패 시 → 임시 댓글 제거
      setCommentList((prev) => prev.filter((c) => c._id !== fakeComment._id));

      toast('댓글 작성에 실패했어요. 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <div className="overflow-scroll max-h-[450px] mt-[20px] ">
        {comments.map((comment) => (
          <div key={comment._id} className="flex items-center gap-3 mb-2">
            <img
              src={comment.author.image}
              alt="user"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{comment.author.fullname}</p>
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-[20px]  justify-between border-t-1 border-[var(--color-border)] pt-[10px]">
        <input
          type="text"
          className="px-[10px] w-[500px]"
          placeholder="발자국 남기기"
          value={comment}
          onChange={changeHandler}
        />
        <button
          className="bg-[var(--color-main-skyBlue)] w-[60px] h-[50px] flex justify-center items-center rounded-xl hover:bg-[var(--color-main-skyBlue-hover)] active:bg-[var(--color-main-skyBlue-active)]"
          onClick={commentHandler}
        >
          <img
            src={whiteFootPrint}
            alt="footprint"
            className="w-[30px] h-[30px]"
          />
        </button>
      </div>
    </>
  );
}
