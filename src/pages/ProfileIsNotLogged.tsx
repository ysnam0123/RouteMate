import testsignInImg from '../assets/images/프로필사진.png'
import testSearch from '../assets/icons/free-icon-south-korea-9105510 2.png'
import testSetting from '../assets/icons/Star.png'
import testLike from '../assets/icons/Heart.png'
import testFoot from '../assets/icons/footprintWhite.png'
// 임시 프로필,아이콘 사진
import Button from '../components/button'

export default function ProfileIsNotLogged() {
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
        <div className="w-[365px] pl-10">
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

          <h2 className="text-[35px] mb-2 pt-3.5 font-bold">김부산</h2>
          <p className="text-[20px] font-semibold">
            부산살고 있는 김부산입니다.
          </p>
        </div>

        {/* 팔로워숫자 및 내 정보 수정 */}
        <div className="flex flex-col gap-2 w-[273px] ml-28">
          <div className="flex">
            <div className="w-[88px] h-[33px] text-center text-[20px] text-black font-semibold">
              POST 349
            </div>
            <div className="w-[88px] h-[33px] text-center text-[20px] text-black mr-3.5 font-semibold">
              Followers 0
            </div>
            <div className="w-[88px] h-[33px] text-center text-[20px] text-black font-semibold">
              Following 0
            </div>
          </div>
          <div className="flex mt-20">
            <div className="flex gap-2 pl-4">
              <Button className="h-[45px] min-w-[125px] bg-[#26303A] text-white text-[15px] font-semibold flex items-center justify-center px-3 rounded-[10px]">
                편지 쓰기
              </Button>
              <Button className="h-[45px] min-w-[125px] bg-[#75BFFF] text-white text-[15px] font-semibold flex items-center justify-center px-3 rounded-[10px]">
                팔로우+
              </Button>
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-8 mb-10 border-gray-300" />

      {/* 글쓰기목록 영역(임시로 둔 영역 글 목록 넣어줘야함) */}
      <div className="flex flex-wrap">
        <div className="w-full max-w-[230px] h-[230px] relative group bg-red-300">
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
        <div className="w-full max-w-[230px] h-[230px] relative group bg-orange-300">
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
        <div className="w-full max-w-[230px] h-[230px] relative group bg-amber-400">
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
        </div>
      </div>
    </div>
  )
}
