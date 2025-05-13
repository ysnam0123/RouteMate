// import testsignInImg from "../assets/images/프로필사진.png";
// import testSearch from "../assets/icons/free-icon-south-korea-9105510 2.png";
// import testSetting from "../assets/icons/Star.png";
import testLike from "../assets/icons/Heart.png";
import testFoot from "../assets/icons/footprintWhite.png";
// 임시 프로필,아이콘 사진
import Button from "../components/button";
import { useAuthStore } from "../stores/authStore";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

interface Post {
  _id: string;
  title: string;
  image: string;
  imagePublicId: string;
  channel: string;
  author: string;
  likes: any[];
  comments: any[];
  createdAt: string;
  updatedAt: string;
}

interface UserData {
  _id: string;
  fullName: string;
  email: string;
  coverImage: string;
  image: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: Post[];
  likes: any[];
  comments: string[];
  followers: any[];
  following: any[];
  notifications: Notification[];
  messages: any[];
  createdAt: string;
  updatedAt: string;
}

export default function Profile() {
  const userId = useAuthStore((state) => state.userId);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get(`/users/${userId}`);
        setUser(data);
      } catch (err) {
        console.log("유저 정보 가져오기 실패:", err);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) return <div>로딩 중...</div>;

  return (
    <div className="w-full max-w-[1000px] mx-auto p-4 mt-[55px]">
      {/* 상단 프로필 영역 */}
      <div className="flex flex-wrap md:flex-nowrap items-start gap-5">
        {/* 프로필 사진 */}
        <div className="w-[170px] h-[170px] rounded-full overflow-hidden">
          <img
            src={user.image}
            alt="프로필 사진"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 태그, 소개글 */}
        <div className="w-[365px] pl-10">
          <div className="flex items-center gap-3 mb-8">
            {/* <Button className="w-[174px] h-[31px] text-black px-3 py-1 rounded-[19px] text-sm relative font-bold border-1 border-[#434343] bg-white">
              <img
                src={testSearch}
                alt="아이콘"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
              />
              김정호 ..?
            </Button> */}
            {/* <Button className="w-[174px] h-[31px] text-black px-3 py-1 rounded-[19px] text-sm relative font-bold border-1 border-[#434343] bg-white">
              <img
                src={testSetting}
                alt="아이콘"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
              />
              1박 2일 애호가
            </Button> */}
          </div>

          <h2 className="text-[35px] mb-2 pt-3.5 font-bold">{user.fullName}</h2>
          <p className="text-[20px] font-semibold">
            {/* {user.posts.map((post) => (
              <div key={post._id}>
                <p>{post.title}</p>
              </div>
            ))} */}
          </p>
        </div>

        {/* 팔로워숫자 및 내 정보 수정 */}
        <div className="flex flex-col gap-2 w-[273px] ml-28">
          <div className="flex">
            <div className="w-[88px] h-[33px] text-center text-[20px] text-black font-semibold">
              POST <br></br>
              {user.posts.length}
            </div>
            <div className="w-[88px] h-[33px] text-center text-[20px] text-black mr-3.5 font-semibold">
              Followers <br></br>
              {user.followers.length}
            </div>
            <div className="w-[88px] h-[33px] text-center text-[20px] text-black font-semibold">
              Following <br></br>
              {user.following.length}
            </div>
          </div>
          <div className="flex mt-20">
            <Button className="w-[273px] h-[45px] bg-[#59A9E3] text-white px-5 py-2 rounded-[10px] text-[15px] font-semibold">
              내 정보 수정하기
            </Button>
          </div>
        </div>
      </div>

      <hr className="mt-8 mb-10 border-gray-300" />

      {/* 글쓰기목록 영역(임시로 둔 영역 글 목록 넣어줘야함) */}
      <div className="flex flex-wrap">
        {user.posts.map((post) => (
          <div
            key={post._id}
            className="w-full max-w-[230px] h-[230px] relative group bg-cover bg-center rounded-md"
            style={{ backgroundImage: `url(${post.image})` }}
          >
            <div className="w-[111px] h-[24px] absolute bottom-3 right-5 flex gap-5 text-white opacity-0 group-hover:opacity-100 group-hover:visible invisible">
              <div className="flex items-center gap-1">
                <img
                  src={testLike}
                  alt="좋아요"
                  className="w-[24px] h-[24px]"
                />
                <span className="text-sm font-bold text-[10px]">
                  {post.likes.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <img src={testFoot} alt="댓글" className="w-[24px] h-[24px]" />
                <span className="text-sm font-bold text-[10px]">
                  {post.comments.length}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* <div className="w-full max-w-[230px] h-[230px] relative group bg-amber-400">
          <div className="w-[111px] h-[24px] absolute bottom-3 right-5 flex gap-5 text-white opacity-0 group-hover:opacity-100 group-hover:visible invisible">
            <div className="flex items-center gap-1">
              <img src={testLike} alt="좋아요" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">1,600</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={testFoot} alt="댓글" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">300</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[230px] h-[230px] relative group bg-yellow-300">
          <div className="w-[111px] h-[24px] absolute bottom-3 right-5 flex gap-5 text-white opacity-0 group-hover:opacity-100 group-hover:visible invisible">
            <div className="flex items-center gap-1">
              <img src={testLike} alt="좋아요" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">1,600</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={testFoot} alt="댓글" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">300</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[230px] h-[230px] relative group bg-lime-300">
          <div className="w-[111px] h-[24px] absolute bottom-3 right-5 flex gap-5 text-white opacity-0 group-hover:opacity-100 group-hover:visible invisible">
            <div className="flex items-center gap-1">
              <img src={testLike} alt="좋아요" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">1,600</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={testFoot} alt="댓글" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">300</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[230px] h-[230px] relative group bg-green-300">
          <div className="w-[111px] h-[24px] absolute bottom-3 right-5 flex gap-5 text-white opacity-0 group-hover:opacity-100 group-hover:visible invisible">
            <div className="flex items-center gap-1">
              <img src={testLike} alt="좋아요" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">1,600</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={testFoot} alt="댓글" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">300</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[230px] h-[230px] relative group bg-emerald-300">
          <div className="w-[111px] h-[24px] absolute bottom-3 right-5 flex gap-5 text-white opacity-0 group-hover:opacity-100 group-hover:visible invisible">
            <div className="flex items-center gap-1">
              <img src={testLike} alt="좋아요" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">1,600</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={testFoot} alt="댓글" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">300</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[230px] h-[230px] relative group bg-cyan-300">
          <div className="w-[111px] h-[24px] absolute bottom-3 right-5 flex gap-5 text-white opacity-0 group-hover:opacity-100 group-hover:visible invisible">
            <div className="flex items-center gap-1">
              <img src={testLike} alt="좋아요" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">1,600</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={testFoot} alt="댓글" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">300</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[230px] h-[230px] relative group bg-blue-300">
          <div className="w-[111px] h-[24px] absolute bottom-3 right-5 flex gap-5 text-white opacity-0 group-hover:opacity-100 group-hover:visible invisible">
            <div className="flex items-center gap-1">
              <img src={testLike} alt="좋아요" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">1,600</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={testFoot} alt="댓글" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">300</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[230px] h-[230px] relative group bg-indigo-300">
          <div className="w-[111px] h-[24px] absolute bottom-3 right-5 flex gap-5 text-white opacity-0 group-hover:opacity-100 group-hover:visible invisible">
            <div className="flex items-center gap-1">
              <img src={testLike} alt="좋아요" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">1,600</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={testFoot} alt="댓글" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">300</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[230px] h-[230px] relative group bg-violet-300">
          <div className="w-[111px] h-[24px] absolute bottom-3 right-5 flex gap-5 text-white opacity-0 group-hover:opacity-100 group-hover:visible invisible">
            <div className="flex items-center gap-1">
              <img src={testLike} alt="좋아요" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">1,600</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={testFoot} alt="댓글" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">300</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[230px] h-[230px] relative group bg-fuchsia-300">
          <div className="w-[111px] h-[24px] absolute bottom-3 right-5 flex gap-5 text-white opacity-0 group-hover:opacity-100 group-hover:visible invisible">
            <div className="flex items-center gap-1">
              <img src={testLike} alt="좋아요" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">1,600</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={testFoot} alt="댓글" className="w-[24px] h-[24px]" />
              <span className="text-sm font-bold text-[10px]">300</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
