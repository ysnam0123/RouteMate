import WriteInfo from '../components/WriteInfo'
import channelIcon from '../assets/icons/channelIcon.svg'
import leftArrowGray from '../assets/icons/leftArrowGray.svg'
import leftArrowNavy from '../assets/icons/leftArrowNavy.png'
import rightArrowGray from '../assets/icons/rightArrowGray.svg'
import rightArrowNavy from '../assets/icons/rightArrowNavy.png'
import pin from '../assets/icons/pin.svg'
import bedIcon from '../assets/icons/bedIcon.svg'
import plus from '../assets/icons/plus.svg'
import { useEffect, useRef, useState } from 'react'
import { axiosInstance } from '../api/axios'

export default function Write() {
  //이미지 등록
  const [images, setImages] = useState<string[]>([])
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)
      const imgUrls = fileArray.map((file) => URL.createObjectURL(file))
      setImages(imgUrls)
    }
  }

  //이미지 슬라이더
  const [imgIndex, setImgIndex] = useState(0)
  const imageWidth = 216
  const handleLeftSlider = () => {
    setImgIndex((prev: number) => Math.min(prev + imageWidth, 0))
  }
  const handleRightSlider = () => {
    if (images.length > 3) {
      const maxIndex = -(imageWidth * (images.length + 1 - 4))
      setImgIndex((prev: number) => Math.max(prev - imageWidth, maxIndex))
    }
  }

  //tag 등록
  const [tags, setTags] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = inputRef.current?.value.trim()
      if (value) {
        setTags([...tags, value])
        if (inputRef.current) inputRef.current.value = ''
      }
    }
  }

  return (
    <>
      {/* 전체 contents 박스 */}
      <div className="w-[1049px] h-[1115px] p-[23px] absolute left-[30vw] top-[65px]">
        {/* 채널 선택 영역 */}
        <div className="w-full h-[110px] pt-[30px] pb-[30px]">
          <WriteInfo iconSrc={channelIcon} tagName="채널"></WriteInfo>
        </div>
        {/* 이미지 영역 */}
        <div className="h-[210px] w-full pt-[5px] pb-[5px] flex relative overflow-hidden">
          <div className="group">
            <div
              className="w-[60px] h-full content-center absolute left-0 bg-[#fff]"
              onClick={handleLeftSlider}
            >
              <img src={leftArrowGray} className="block group-hover:hidden" />
              <img src={leftArrowNavy} className="hidden group-hover:block" />
            </div>
          </div>

          {/* 이미지 보여지는 영역 */}
          <div className="h-full w-[920px] flex overflow-hidden absolute left-[60px]">
            {/* 이미지 나열되는 영역 */}
            <div
              className=" absolute left-0 w-[4000px] flex flex-wrap gap-4 transition-transform duration-300"
              style={{ transform: `translateX(${imgIndex}px)` }}
            >
              {/* 선택된 이미지 영역 */}
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview-${index}`}
                  className="size-[200px] "
                />
              ))}
              {/* 이미지 선택 영역 */}
              <label
                htmlFor="file"
                className="size-[200px]  flex items-center justify-center bg-[#E4E4E4]"
              >
                <img src={plus} alt="plus icon" />
              </label>
            </div>

            <input
              type="file"
              id="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="group">
            <div
              className="w-[60px] h-full content-center absolute right-0 bg-[#fff]"
              onClick={handleRightSlider}
            >
              <img src={rightArrowGray} className="block group-hover:hidden" />
              <img src={rightArrowNavy} className="hidden group-hover:block" />
            </div>
          </div>
        </div>
        <div className="w-full h-[767px]">
          {/* 제목 입력 영역 */}
          <input
            type="text"
            placeholder="제목을 입력하세요."
            className="h-[44px] w-full outline-none placeholder-[#989B9D] font-bold text-[32px] text-(--color-main-navy)"
          />

          <div className="w-[78px] h-[5px] bg-[#434343] rounded-[2px] mt-[10px] mb-[10px]"></div>

          <div className="flex mb-[25px]">
            {/* 태그 입력 영역 */}
            <div className="flex items-start">
              <input
                type="text"
                onKeyDown={addTag}
                ref={inputRef}
                placeholder="태그을 입력하세요."
                className="h-[19px] w-[120px] outline-none placeholder-[#989B9D] font-bold text-[14px]  "
              />
            </div>
            <div className="flex items-start">
              <ul className="p-2 h-1/2 flex items-center">
                {tags.map((tag, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-center text-[10px] text-[#ffff] w-[46px] h-[22px] rounded-[15px] bg-[#2A728C] mr-[5px]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* 위치 */}
          <div className="mb-[25px]">
            <WriteInfo iconSrc={pin} tagName="위치" type="text"></WriteInfo>
          </div>
          {/* 숙소 */}
          <div className="mb-[25px]">
            <WriteInfo iconSrc={bedIcon} tagName="숙소" type="text"></WriteInfo>
          </div>
          <hr className="mb-[20px] border-[#E4E4E4]"></hr>
          {/* 경비 */}
          <input
            type="text"
            placeholder="경비을 입력하세요."
            className="h-[22px] w-full outline-none placeholder-[#989B9D] font-bold text-[16px] mb-[18px] "
          />
          {/* 내용 입력 영역 */}
          <textarea
            placeholder="내용을 입력하세요."
            className="h-[364px] w-full placeholder-[#989B9D] font-bold text-[24px] focus:outline-[#60b5ff] rounded-[10px]"
          />
        </div>
      </div>
    </>
  )
}
