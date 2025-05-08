import testsignInImg from "../assets/images/프로필사진.png";
import testSearch from "../assets/icons/free-icon-south-korea-9105510 2.png";
import testSetting from "../assets/icons/Star.png";
// 임시 프로필,아이콘 사진
import Button from "../components/button";

export default function Profile() {
  return (
    <div className="w-full max-w-[1000px] mx-auto p-4 mt-[55px]">
      {/* 상단 프로필 영역 */}
      <div className="flex flex-wrap md:flex-nowrap items-start gap-5">
        {/* 프로필 사진 */}
        <div className="w-[170px] h-[170px] rounded-full overflow-hidden">
          <img
            src={testsignInImg}
            alt="프로필 사진"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 태그, 소개글 */}
        <div className="w-[365px]">
          <div className="flex items-center gap-3 mb-8">
            <Button className="w-[174px] h-[31px] text-black px-3 py-1 rounded-[19px] text-sm relative font-bold border-1 border-[#434343]">
              <img
                src={testSearch}
                alt="아이콘"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
              />
              김정호 ..?
            </Button>
            <Button className="w-[174px] h-[31px] text-black px-3 py-1 rounded-[19px] text-sm relative font-bold border-1 border-[#434343]">
              <img
                src={testSetting}
                alt="아이콘"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
              />
              1박 2일 애호가
            </Button>
          </div>

          <h2 className="text-[35px] mb-5">김부산</h2>
          <p className="text-[20px]">부산살고 있는 김부산입니다.</p>
        </div>

        {/* 팔로워숫자 및 내 정보 수정 */}
        <div className="flex flex-col gap-2 w-[273px] ml-28">
          <div className="flex">
            <div className="w-[88px] h-[33px] text-center text-[20px] text-black">
              POST 349
            </div>
            <div className="w-[88px] h-[33px] text-center text-[20px] text-black mr-3">
              Followers 0
            </div>
            <div className="w-[88px] h-[33px] text-center text-[20px] text-black">
              Following 0
            </div>
          </div>
          <div className="flex mt-20">
            <Button className="w-[273px] h-[45px] bg-[#59A9E3] text-white px-5 py-2 rounded-[10px] text-[15px]">
              내 정보 수정하기
            </Button>
          </div>
        </div>
      </div>

      <hr className="mt-8 mb-10 border-black" />

      {/* 글쓰기목록 영역(임시로 둔 영역 글 목록 넣어줘야함) */}
      <div className="w-full max-w-[230px] h-[230px] relative group bg-black">
        <div className="w-[111px] h-[24px] absolute bottom-3 right-5 flex gap-5 text-white opacity-0 group-hover:opacity-100 group-hover:visible invisible">
          <div className="flex items-center gap-1">
            <img src={testSearch} alt="좋아요" className="w-[24px] h-[24px]" />
            <span className="text-sm font-bold">1600</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={testSetting} alt="댓글" className="w-[24px] h-[24px]" />
            <span className="text-sm font-bold">300</span>
          </div>
        </div>
      </div>
    </div>
  );
}
