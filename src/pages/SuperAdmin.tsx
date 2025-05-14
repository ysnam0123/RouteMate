import Layout from '../layout/Layout'
import deleteIcon from '../assets/icons/deleteIcon.png'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios'

interface Channel {
  id: string
  name: string
}

export default function SuperAdmin() {
  //채널 목록 불러오기
  const [channels, setChannels] = useState<Channel[]>([])

  useEffect(() => {
    const getChannel = async () => {
      const { data } = await axiosInstance.get(`channels`)
      //필요한 id,name 추출
      const simplified = data.map((channel: { _id: string; name: string }) => ({
        id: channel._id,
        name: channel.name,
      }))
      setChannels(simplified)
    }
    getChannel()
  }, [])
  return (
    <>
      <Layout>
        <>
          <div className="ml-[130px] mt-[50px] ">
            <section className="mb-[100px]">
              <h1 className="font-bold text-[32px] mb-[40px]">채널 관리</h1>
              <div className="flex">
                {channels.map((channel) => (
                  <div className="w-[150px] h-[55px] border rounded-[10px] border-[#0F172A] text-[15px] font-semibold  items-center flex justify-center mr-[10px] relative">
                    {channel.name}
                    <img
                      src={deleteIcon}
                      alt="deleteIcon"
                      className="absolute right-[-10px] top-[-10px] bg-[#fff]"
                    />
                  </div>
                ))}

                <div className="w-[150px] h-[55px] border rounded-[10px] border-[#60B5FF] bg-[#60B5FF] text-[#FCFDFF] text-[15px] font-semibold items-center flex justify-center mr-[10px]">
                  채널 생성
                </div>
              </div>
            </section>
            <section className="mt-[100px]">
              <h1 className="font-bold text-[32px] mb-[40px]">사용자 관리</h1>

              <input
                type="text"
                id="text"
                placeholder="사용자 검색"
                className="border border-[#E8E8E8] rounded-[10px] text-[20px] focus:outline-[#60B5FF] content-center inline-block w-[347px] h-[51px] p-[10px] mb-[30px]"
              />

              <div className="justify-between w-[365px] h-[56px] flex  content-center">
                <div className="flex gap-[14px] items-center">
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
