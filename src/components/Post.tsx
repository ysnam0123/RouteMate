import { useEffect, useState } from 'react';
import axios from 'axios';
import PostButton from './PostButton';
import like from '../assets/icons/like.svg';
import liked from '../assets/icons/liked.svg';
import footPrint from '../assets/icons/footPrint.svg';

interface Post {
  _id: string;
  title: string;
  image: string;
  author: {
    fullName: string;
  };
  likes: [];
  comments: [];
  createdAt: string;
}

interface ParsedTitle {
  title: string;
  body: string;
  auther: string;
}

export default function Post() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get<Post[]>(
          'http://13.125.208.179:5001/posts/channel/68118cb78a60964241040079'
        );
        console.log('응답:', res.data);
        setPosts(res.data);
        console.log(res.data);
      } catch (err) {
        console.error('게시글 가져오기 실패:', err);
      }
    }

    fetchPosts();
  }, []);

  // posts가 없거나 빈 배열일 때 기본 메시지 보여주기
  if (!posts || posts.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  return (
    <div className="w-[600px]">
      {posts.map((post) => {
        const parsed: ParsedTitle = JSON.parse(post.title);
        return (
          <div
            key={post._id}
            className="border-[2px] border-[#60B5FF] rounded-xl px-[30px] py-[20px] mb-[40px]"
          >
            <p className="text-[#949494] font-bold text-[15px] border-b-3 border-[#60B5FF] mb-[10px]">
              {parsed.auther}
            </p>
            <h2 className="font-bold text-[25px] mb-[15px]">{parsed.title}</h2>
            <img src={post.image} alt="post" className="mb-[10px]" />
            <div className="flex flex-row gap-[10px] mb-[20px]">
              <PostButton>
                <img src={like} alt="like" />
                좋아요
              </PostButton>
              {/* <PostButton>
                    <img src={liked} alt="liked" />
                    좋아요
                  </PostButton> */}
              <PostButton>
                <img src={footPrint} alt="footPrint" />
                발자국
              </PostButton>
            </div>
            <p>{parsed.body}</p>
          </div>
        );
      })}
    </div>
  );
}
