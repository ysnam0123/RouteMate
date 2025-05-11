// import profile from "../assets/images/LoginLogo.svg";
import Button from "../components/button";
import Jeju from "../assets/achievementIcons/jeju.svg";
import Cafe from "../assets/achievementIcons/cafe.svg";
import Hiking from "../assets/achievementIcons/hiking.svg";
import Alone from "../assets/achievementIcons/alone.svg";
import House from "../assets/achievementIcons/house.svg";
import KoreaPin from "../assets/achievementIcons/koreaPin.svg";
import PowerJ from "../assets/achievementIcons/PowerJ.svg";
import Star from "../assets/achievementIcons/Star.svg";
import Train from "../assets/achievementIcons/train.svg";
import Tag from "../components/Tag";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import Layout from "../layout/Layout";
import PasswordInput from "../components/PaswordInput";
export default function ProfileEdit() {
  const [user, setUser] = useState<{
    fullName: string;
    image: string;
    username: string;
  } | null>(null);
  const [text, setText] = useState("");
  const [editName, setEditName] = useState("");
  // const [profileImgUrl, setProfileImgUrl] = useState(pv.image);
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  const getUser = async () => {
    const { data } = await axiosInstance.get(`users/681c61eb983196128e4d92dc`);
    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user?.fullName) {
      setEditName(user.fullName);
    }
  }, [user]);

  const rawUsername = user?.username ?? "";

  // 정규표현식으로 소개/칭호 분리
  const match = rawUsername.match(/^(.*)\s?\[(.*)\]$/);

  const introduction = match?.[1] ?? rawUsername;
  const titles = match?.[2]?.split(",").map((t) => t.trim()) ?? [];

  useEffect(() => {
    if (introduction) {
      setText(introduction);
    }
  }, [introduction]);

  // 프로필 이미지 변경 함수
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file) {
        setProfileImgFile(file);
        // setProfileImgUrl(file);
      }
    }
  };

  // 비밀번호
  const handlePasswordConfirm = useCallback(
    (passwordConfirm: string) => {
      setConfirmPassword(passwordConfirm);

      if (newPassword === passwordConfirm) {
        setIsPasswordConfirm(true);
      } else {
        setIsPasswordConfirm(false);
      }
    },
    [newPassword]
  );

  // 비밀번호 변경 버튼
  const handlePasswordSubmit = () => {
    if (isPasswordConfirm) {
      return alert("비밀번호가 변경되었습니다.");
    } else {
      return alert("비밀번호가 일치하지 않습니다!");
    }
  };

  const handleSubmit = async () => {
    // try {
    //   const res = await axiosInstance.put(`/users/123`, {
    //     fullName: editName,
    //   });
    //   console.log("성공", res.data);
    // } catch (error) {
    //   console.error("실패", error);
    // }
    // setUser((prev) => (prev ? { ...prev, fullName: editName } : null));
    // if (!profileImgFile) return alert("이미지가 선택되지 않았습니다.");
    // eidtPvImage({ id: pv.id, imageFile: profileImgFile });
  };

  // 칭호 선택 함수
  const tagFields = [
    { label: "제주 중독", icon: Jeju },
    { label: "밥보단 커피", icon: Cafe },
    { label: "김정호..?", icon: KoreaPin },
    { label: "1박 2일 애호가", icon: Star },
    { label: "낭만가", icon: Train },
    { label: "Power J", icon: PowerJ },
    { label: "산타아저씨", icon: Hiking },
    { label: "혼자서도 잘해요", icon: Alone },
    { label: "한달살이 경험자", icon: House },
  ];

  const handleTagClick = (label: string) => {
    setSelectedTags((prev) =>
      prev.includes(label)
        ? prev.filter((tag) => tag !== label)
        : prev.length < 2
        ? [...prev, label]
        : prev
    );
  };

  // 칭호 받아와서 기본선택 적용
  useEffect(() => {
    if (!hasInitialized && titles.length > 0) {
      setSelectedTags(titles.slice(0, 2));
      setHasInitialized(true);
    }
  }, [titles, hasInitialized]);

  return (
    <>
      <Layout>
        <div className="sm:px-28 py-15 ">
          <div className="mx-auto min-w-[600px] max-w-[900px] w-[55vw] sm:px-32 sm:py-10 py-4 box-shadow-custom bg-[var(--color-white)] rounded-[10px]">
            <div className="">
              {/* 프로필이미지 */}
              <div className="flex items-center">
                <img
                  src={
                    profileImgFile
                      ? URL.createObjectURL(profileImgFile)
                      : user?.image
                  }
                  alt="프로필 이미지"
                  className="w-[150px] h-[150px] rounded-full mr-4 flex-shrink-0"
                />
                <div className="flex flex-col mr-1">
                  <span className="text-2xl font-bold">{user?.fullName}</span>
                  <span className="text-base font-medium">{introduction}</span>
                </div>
                <label
                  htmlFor="profileImg"
                  className="ml-auto text-white text-[13px] font-semibold w-[113px] h-[33px] bg-[var(--color-main-skyBlue)] rounded-md flex items-center justify-center cursor-pointer"
                >
                  프로필 사진 변경
                </label>
                <input
                  id="profileImg"
                  type="file"
                  className="hidden"
                  onChange={handleImgChange}
                />
              </div>

              <div className="my-8">
                {/* 이름 */}
                <div className="flex flex-col gap-1.5 mb-7">
                  <p>이름</p>
                  <input
                    placeholder="사용자 이름"
                    type="text"
                    className="bg-white rounded-xl border-[#c2c2c2] border h-11 px-3 focus:outline"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>

                {/* 소개 */}
                <div className="flex flex-col mb-5 gap-1.5">
                  <p>소개 (200자 이내)</p>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="사용자 소개"
                    maxLength={200}
                    className="bg-white rounded-xl border-[#c2c2c2] border h-24 px-3 py-3 resize-none focus:outline focus:outline-[#60B5FF]"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1 montserrat">
                    {text.length} / 200
                  </div>
                </div>

                {/* 칭호관리 */}
                <div className="flex flex-col gap-1.5">
                  <p>칭호 관리 (최대 2개 선택 가능)</p>
                  <div className="bg-white px-1.5 pt-4 pb-2 rounded-xl border-[#c2c2c2] border flex flex-wrap justify-center">
                    {tagFields.map((field) => (
                      <div>
                        <Tag
                          icon={field.icon}
                          label={field.label}
                          selected={selectedTags.includes(field.label)}
                          onClick={() => handleTagClick(field.label)}
                        />
                      </div>
                    ))}
                    <div className="w-full flex justify-end mt-2 px-1.5">
                      <div className="text-sm text-gray-500 montserrat">
                        {selectedTags.length} / 2
                      </div>
                    </div>
                  </div>
                </div>

                {/* 비밀번호 변경*/}
                <div className="flex flex-col mt-9 mb-10 gap-1.5">
                  <PasswordInput
                    label="새로운 비밀번호"
                    value={newPassword}
                    onChange={setNewPassword}
                  />
                  <PasswordInput
                    label="비밀번호 확인"
                    value={confirmPassword}
                    onChange={handlePasswordConfirm}
                  />
                  <div className="flex justify-end">
                    <Button
                      className="text-white font-semibold w-[113px] h-[33px] bg-[var(--color-main-skyBlue)] rounded-md mt-6"
                      onClick={handlePasswordSubmit}
                    >
                      변경하기
                    </Button>
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 justify-end">
                <Button className="w-[100px] h-[40px] bg-white text-[var(--color-main-navy)] text-base font-bold rounded-[10px] border border-[#d1d1d1]">
                  취소
                </Button>
                <Button
                  className="w-[100px] h-[40px] bg-[var(--color-main-navy)]  text-white text-base font-bold rounded-[10px]"
                  onClick={handleSubmit}
                >
                  저장
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
