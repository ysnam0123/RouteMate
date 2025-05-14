import profile from "../assets/images/profile.svg";
import search from "../assets/icons/Search.svg";
import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
// import { useAuthStore } from "../stores/authStore";
import { axiosInstance } from "../api/axios";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router";

interface User {
  _id: string;
  fullName: string;
  image: string;
  followers: string[];
}

// 각 유저 정보부분
const UserItem = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);
  const [authUser, setAuthUser] = useState<{
    following: { _id: string }[];
  } | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false); // 팔로우 상태 관리

  // 로그인한 사용자 팔로우여부 확인
  useEffect(() => {
    const getUser = async () => {
      if (!userId) return;
      const { data } = await axiosInstance.get(`users/${userId}`);
      setAuthUser(data);

      const followingIds = data.following.map(
        (follow: { _id: string }) => follow._id
      );

      const isUserFollowing = user.followers.some((follower) =>
        followingIds.includes(follower)
      );
      setIsFollowing(isUserFollowing);
    };
    getUser();
  }, [userId, user._id]);

  // 팔로잉 시
  const followUser = async () => {
    try {
      const res = await axiosInstance.post("/follow/create", {
        userId: user._id,
      });
      alert(`${user.fullName}님을 팔로우합니다.`);
      console.log("팔로우 결과:", res.data);
      setIsFollowing(true);
      window.location.reload();
    } catch (error) {
      console.error("팔로우 실패:", error);
      alert(`${user.fullName}님 팔로우 실패.`);
    }
  };

  // 언팔로잉 시
  const unFollowUser = async () => {
    try {
      const commonId = user.followers.find((followerId) =>
        authUser?.following.some((follow) => follow._id === followerId)
      );
      console.log(commonId);

      if (commonId) {
        const res = await axiosInstance.delete("/follow/delete", {
          data: { id: commonId },
        });
        alert(`${user.fullName}님을 언팔로우합니다.`);
        console.log("언팔로우 결과:", res.data);
        setIsFollowing(false);
      } else {
        alert("팔로우 관계가 없습니다.");
      }
    } catch (error) {
      console.error("언팔로우 실패:", error);
      alert(`${user.fullName}님 언팔로우 실패.`);
    }
  };

  // 팔로우 버튼 클릭시
  const handleFollow = async () => {
    if (authUser) {
      if (isFollowing) {
        await unFollowUser();
      } else {
        await followUser();
      }
    } else {
      alert("로그인을 진행해주세요");
      navigate("/login");
    }
  };

  return (
    <div className="border w-full flex h-14 px-2 py-2.5 items-center overflow-hidden">
      <div className="flex gap-1.5 items-center">
        <img
          src={user.image || profile}
          alt="프로필 이미지"
          className="w-8 h-8 border-gray-400 border rounded-full flex-shrink-0 bg-gray-100"
        />
        <a>{user.fullName}</a>
      </div>
      <button
        className="ml-auto cursor-pointer transition-all duration-200 hover:font-bold hover:text-[var(--color-main-blue)] "
        onClick={handleFollow}
        // disabled={!authUser}
      >
        {isFollowing ? "UnFollow" : "Follow"}{" "}
      </button>
    </div>
  );
};

export default function UserList() {
  const [users, setUsers] = useState<
    {
      _id: string;
      image: string;
      fullName: string;
      followers: string[];
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  // 유저 검색 부분
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.fullName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchInput, users]);

  // 사용자 목록 가져오기
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get("/users/get-users", {});
        setUsers(res.data);
      } catch (error) {
        console.error("사용자 목록을 가져오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <>
      <Layout>
        <div className="flex-grow py-15 w-full ">
          <div className="mx-auto w-md h-auto sm:px-5 sm:py-5 py-5 bg-[var(--color-white)] border rounded-[10px]">
            <div className="flex flex-col gap-3.5">
              <span>여행중</span>
              <div className="flex items-center rounded-[7px] border border-[#c2c2c2] p-2 mb-5 w-96 mx-auto focus-within:outline">
                <input
                  type="text"
                  className="flex-1 bg-transparent outline-none"
                  placeholder="유저를 검색하세요"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                <img src={search} alt="돋보기 버튼" className="ml-2 w-5 h-5" />
              </div>
            </div>
            <div className="p-2 border rounded-[8px] flex flex-col h-auto">
              {filteredUsers.map((user) => (
                <UserItem key={user._id} user={user} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
