import React, { useEffect, useState } from 'react';
import likeIcon from '../../assets/icons/like.svg';
import likedIcon from '../../assets/icons/liked.svg';
import footPrint from '../../assets/icons/footPrintBlack.svg';
import whiteFootPrint from '../../assets/icons/footprintWhite.png';
import userImage from '../../assets/images/Ellipse 25.png';
import { axiosInstance } from '../../api/axios';
import { useAuthStore } from '../../stores/authStore';
import PostComments from './PostComments';

// 외부로부터 어떤 props를 받는지 정의
interface PostInteractionProps {
  // 게시물 id
  postId: string;
  // 게시물 좋아요 배열
  likes: likesObj[];
  // 게시물 댓글 배열
  comments: commentsObj[];
  className?: string;
}
interface commentsObj {
  _id: string;
  comment: string;
  author: { fullname: string };
}

interface likesObj {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
}

export default function PostInteraction({
  // 이 컴포넌트가 props로 받는 3가지
  postId,
  likes,
  comments,
}: PostInteractionProps) {
  // 좋아요를 눌렀는지 안눌렀는지
  const [liked, setLiked] = useState(false);
  // 게시물의 좋아요 수 (기본값을 likes.length 로 넣어, 처음 로딩 시 받은 데이터를 기반으로 렌더링한다)
  const [likeCount, setLikeCount] = useState(likes.length);
  // 내가 누른 좋아요의 Id, (좋아요 취소할때 필요함)
  const [likeId, setLikeId] = useState<string | null>(null);

  // 로그인한 유저 ID (이건 useAuthStore 에서 불러오고있음)
  const userId = useAuthStore((state) => state.userId);

  // 처음 렌더링될때 실행
  useEffect(() => {
    // 로그인한 유저가 없으면 리턴하기
    // 이게 사실 의미가 있나 싶음... 일단 주석 해둠
    // if (!userId) return;

    // 좋아요 중복 확인
    // likes 배열에서 userId와 일치하는 like 객체를 찾는다. (이미 좋아요를 눌렀는지 판단하기 위해)
    const myLike = likes.find((like) => like.user === userId);
    console.log(likes);
    // 얘가 undefined 나옴
    console.log(myLike);
    // .find: 조건에 맞는 첫번째 요소를 반환하는 함수
    if (myLike) {
      // 이미 눌렀다면 liked 상태를 true로
      setLiked(true);
      // 해당 좋아요 ID를 저장하기 (취소를 위해)
      setLikeId(myLike.user);
    }
  }, [likes, userId]);

  // 특정 포스트의 정보 불러오기
  const postDetails = async () => {
    try {
      const response = await axiosInstance.get(`/posts/${postId}`);
      console.log(response.data);
    } catch (error) {
      console.log('게시글 정보를 불러오지 못했습니다');
    }
  };

  const toggleLike = async () => {
    // 예비 복구용
    const prevLiked = liked;
    const prevLikeId = likeId;
    const prevCount = likeCount;

    // 낙관적 업데이트
    // 현재 liked 가 false면 true로 바꾸고, 좋아요 수 1 증가.
    setLiked(!liked);
    setLikeCount(!liked ? likeCount + 1 : likeCount - 1);

    try {
      if (!liked) {
        const likePost = await axiosInstance.post('/likes/create', { postId });
        // 서버에서 받은 좋아요 ID 설정
        setLikeId(likePost.data._id);
        console.log(likePost.data);
      } else {
        await axiosInstance.delete(`/likes/delete/`, {
          data: { likeId },
        });
        // 좋아요 취소 후 ID 초기화
        setLikeId(null);
      }
    } catch (error) {
      // 실패 시 이전 상태로 복구하기
      setLiked(prevLiked);
      setLikeCount(prevCount);
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-[15px]">
        <div
          className="flex flex-row gap-1 cursor-pointer"
          onClick={toggleLike}
        >
          <img
            src={liked ? likedIcon : likeIcon}
            alt="like"
            className="w-[20px]"
          />
          좋아요 {likeCount}개
        </div>
        <div className="flex flex-row gap-1 " onClick={postDetails}>
          <img src={footPrint} alt="footprint" className="w-[20px]" />
          댓글 {comments.length}개
        </div>
      </div>
    </div>
  );
}
