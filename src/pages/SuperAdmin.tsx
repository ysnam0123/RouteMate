import Layout from '../layout/Layout'
import deleteIcon from '../assets/icons/deleteIcon.png'

export default function SuperAdmin() {
  return (
    <>
      <Layout>
        <>
          <div>
            <section>
              <h1 className="font-bold text-[24px]">채널 관리</h1>
              <div className="flex">
                <div className="w-[150px] h-[55px] border rounded-[10px] border-[#0F172A] text-[15px] font-semibold  items-center flex justify-center mr-[10px]">
                  1박 2일
                </div>
                <div className="w-[150px] h-[55px] border rounded-[10px] border-[#0F172A] text-[15px] font-semibold  items-center flex justify-center mr-[10px]">
                  2박 3일
                </div>
                <div className="w-[150px] h-[55px] border rounded-[10px] border-[#0F172A] text-[15px] font-semibold  items-center flex justify-center mr-[10px]">
                  3박 4일
                </div>
                <div className="w-[150px] h-[55px] border rounded-[10px] border-[#0F172A] text-[15px] font-semibold items-center flex justify-center mr-[10px]">
                  한달살기
                </div>
                <div className="w-[150px] h-[55px] border rounded-[10px] border-[#60B5FF] bg-[#60B5FF] text-[#FCFDFF] text-[15px] font-semibold items-center flex justify-center mr-[10px]">
                  채널 생성
                </div>
              </div>
            </section>
            <section>
              <h1 className="font-bold text-[24px]">사용자 관리</h1>
              <label
                htmlFor="text"
                className="border border-[#E8E8E8] rounded-[10px] text-[20px] text-[#989B9D] content-center inline-block w-[347px] h-[51px]"
              >
                사용자 검색
              </label>
              <input type="text" id="text" className="hidden" />

              <div className="justify-between w-[365px] h-[56px] flex  content-center">
                <div className="flex gap-[14px] items-center ">
                  <span className="bg-[#D9D9D9] rounded-full size-[40px]"></span>
                  <span>사용자 이름</span>
                </div>
                <div className="content-center">
                  <img src={deleteIcon} alt="deleteIcon" />
                </div>
              </div>
            </section>
          </div>
        </>
      </Layout>
    </>
  )
}
