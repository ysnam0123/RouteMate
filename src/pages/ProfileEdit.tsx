import profile from "../assets/images/LoginLogo.svg";
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
import { useState } from "react";
export default function ProfileEdit() {
  // const [text, setText] = useState("");

  // 프로필 이미지 변경 함수
  // const [profileImgUrl, setProfileImgUrl] = useState(pv.image);
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null);
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file) {
        setProfileImgFile(file);
        // setProfileImgUrl(file);
      }
    }
  };

  // 비밀번호 변경 버튼
  const handlePassword = () => {
    return alert("비밀번호가 변경되었습니다.");
  };

  // const handleSubmit = () => {
  //   if (!profileImgFile) return alert("이미지가 선택되지 않았습니다.");
  //   eidtPvImage({ id: pv.id, imageFile: profileImgFile });
  // };

  // 칭호 선택 함수
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const handleTagClick = (label: string) => {
    setSelectedTags((prev) =>
      prev.includes(label)
        ? prev.filter((tag) => tag !== label)
        : prev.length < 2
        ? [...prev, label]
        : prev
    );
  };
  return (
    <>
      <div className="sm:px-28 py-15 ">
        <div className="mx-auto min-w-[600px] max-w-[900px] w-[55vw] sm:px-32 sm:py-10 py-4 box-shadow-custom bg-[var(--color-white)] rounded-[10px]">
          <div className="">
            {/* 프로필이미지 */}
            <div className="flex items-center">
              <img
                src={
                  profileImgFile ? URL.createObjectURL(profileImgFile) : profile
                }
                alt="프로필 이미지"
                className="w-[150px] h-[150px] rounded-full mr-4 flex-shrink-0"
              />
              <div className="flex flex-col mr-1">
                <span className="text-2xl font-bold">김부산</span>
                {/* <span className="text-base font-medium">
                    부산살고 있는 김부산입니다.
                  </span> */}
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
              {/* <Button className="text-white text-[13px] font-semibold w-[113px] h-[33px] bg-[var(--color-main-skyBlue)] rounded-md">
                    프로필 사진 변경
                  </Button> */}
            </div>

            <div className="my-8">
              {/* 이름 */}
              <div className="flex flex-col gap-1.5 mb-7">
                <p>이름</p>
                <input
                  placeholder="사용자 이름"
                  type="text"
                  className="bg-white rounded-xl border-[#c2c2c2] border h-11 px-3 focus:outline"
                />
              </div>

              {/* 소개 */}
              {/* <div className="flex flex-col mb-5 gap-1.5">
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
                </div> */}

              {/* 칭호관리 */}
              <div className="flex flex-col gap-1.5">
                <p>칭호 관리 (최대 2개 선택 가능)</p>
                <div className="bg-white px-1.5 pt-4 pb-2 rounded-xl border-[#c2c2c2] border flex flex-wrap justify-center">
                  <Tag
                    icon={Jeju}
                    label="제주 중독"
                    selected={selectedTags.includes("제주 중독")}
                    onClick={() => handleTagClick("제주 중독")}
                  />
                  <Tag
                    icon={Cafe}
                    label="밥보단 커피"
                    selected={selectedTags.includes("밥보단 커피")}
                    onClick={() => handleTagClick("밥보단 커피")}
                  />
                  <Tag
                    icon={KoreaPin}
                    label="김정호..?"
                    selected={selectedTags.includes("김정호..?")}
                    onClick={() => handleTagClick("김정호..?")}
                  />
                  <Tag
                    icon={Star}
                    label="1박 2일 애호가"
                    selected={selectedTags.includes("1박 2일 애호가")}
                    onClick={() => handleTagClick("1박 2일 애호가")}
                  />
                  <Tag
                    icon={Train}
                    label="낭만가"
                    selected={selectedTags.includes("낭만가")}
                    onClick={() => handleTagClick("낭만가")}
                  />
                  <Tag
                    icon={PowerJ}
                    label="Power J"
                    selected={selectedTags.includes("Power J")}
                    onClick={() => handleTagClick("Power J")}
                  />
                  <Tag
                    icon={Hiking}
                    label="산타아저씨"
                    selected={selectedTags.includes("산타아저씨")}
                    onClick={() => handleTagClick("산타아저씨")}
                  />
                  <Tag
                    icon={Alone}
                    label="혼자서도 잘해요"
                    selected={selectedTags.includes("혼자서도 잘해요")}
                    onClick={() => handleTagClick("혼자서도 잘해요")}
                  />
                  <Tag
                    icon={House}
                    label="한달살이 경험자"
                    selected={selectedTags.includes("한달살이 경험자")}
                    onClick={() => handleTagClick("한달살이 경험자")}
                  />
                  <div className="w-full flex justify-end mt-2 px-1.5">
                    <div className="text-sm text-gray-500 montserrat">
                      {selectedTags.length} / 2
                    </div>
                  </div>
                </div>
              </div>

              {/* 비밀번호 변경*/}
              <div className="flex flex-col mt-7 mb-10 gap-1.5">
                <p>비밀번호 변경하기</p>
                <input
                  type="text"
                  className="bg-white rounded-xl border-[#c2c2c2] border h-10 px-3 focus:outline focus:outline-[#60B5FF] mb-6"
                />
                <div className="flex justify-end">
                  <Button
                    className="text-white font-semibold w-[113px] h-[33px] bg-[var(--color-main-skyBlue)] rounded-md"
                    onClick={handlePassword}
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
              <Button className="w-[100px] h-[40px] bg-[var(--color-main-navy)]  text-white text-base font-bold rounded-[10px]">
                저장
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
