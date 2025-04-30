import Layout from "../layout/Layout";
import profile from "../assets/images/signInImg.png";
import Button from "../components/button";
import icon from "../assets/icons/setting.svg";
import Tag from "../components/Tag";
import { useState } from "react";
export default function ProfileEdit() {
  const [text, setText] = useState("");

  return (
    <>
      <Layout>
        <div className="sm:px-28 sm:py-9">
          <div className="mx-auto min-w-[600px] w-[55vw] sm:px-32 sm:py-7 box-shadow-custom bg-[#EDF9FF] border-2 border-[#60B5FF] rounded-[10px]">
            <div className="">
              {/* 프로필이미지 */}
              <div className="flex flex-col justify-center items-center">
                <img
                  src={profile}
                  alt="프로필 이미지"
                  className="w-[180px] h-[180px] rounded-full"
                />
                <a className="font-semibold text-[13px] text-[#4DA0FF] mt-2 cursor-pointer">
                  프로필 사진 변경
                </a>
              </div>

              {/* 이름 */}
              <div className="my-8">
                <div className="flex flex-col gap-1.5">
                  <p>이름</p>
                  <input
                    placeholder="사용자 이름"
                    type="text"
                    className="bg-white rounded-xl border-[#c2c2c2] border h-10 px-3 focus:outline focus:outline-[#60B5FF]"
                  />
                </div>

                {/* 소개 */}
                <div className="flex flex-col mt-7 mb-5 gap-1.5">
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
                    <Tag icon={icon} label="제주 중독" />
                    <Tag icon={icon} label="밥보단 커피" />
                    <Tag icon={icon} label="김정호..?" />
                    <Tag icon={icon} label="1박 2일 애호가" />
                    <Tag icon={icon} label="낭만가" />
                    <Tag icon={icon} label="Power J" />
                    <Tag icon={icon} label="산타아저씨" />
                    <Tag icon={icon} label="혼자서도 잘해요" />
                    <Tag icon={icon} label="한달살이 경험자" />
                    <div className="w-full flex justify-end mt-2 px-1.5">
                      <div className="text-sm text-gray-500 montserrat">
                        0 / 2
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 justify-end">
                <Button className="text-[#60B5FF] border-[#60b5FF] border-2 w-[111px] h-[31px] bg-white button-shadow-custom">
                  취소
                </Button>
                <Button className="text-[#FF9149] border-[#FF9149] border-2 w-[111px] h-[31px] bg-white button-shadow-custom">
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
