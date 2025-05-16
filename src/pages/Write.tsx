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
import Button from '../components/button'
import { axiosInstance } from '../api/axios'
import { cloudinaryAxiosInstance } from '../api/cloudinaryAxios'

export default function Write() {
  //이미지 등록
  const [images, setImages] = useState<string[]>([]) //미리보기용
  const [imageFiles, setImageFiles] = useState<File[]>([]) //image 필드용
  const [uploadedImages, setUploadedImages] = useState<string[]>([]) // 업로드된 이미지 URLs
  // const [Base64s, setBase64s] = useState<{ url: string }[]>([]); //title에 들어가는 image용

  // //이미지 파일 Base64로 인코딩하는 함수
  // const encodeFileToBase64 = (image: File) => {
  //     return new Promise((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(image);
  //         reader.onload = (event: any) => resolve(event.target.result);
  //         reader.onerror = (error) => reject(error);
  //     });
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)
      const imgUrls = fileArray.map((file) => URL.createObjectURL(file))

      setImages(imgUrls)
      setImageFiles(fileArray)
      handleCloudinaryUpload(fileArray)
    }
  }

  const handleCloudinaryUpload = async (files: File[]) => {
    const uploadPromises = files.map((file) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'programmersProject2') // Cloudinary에서 제공하는 업로드 프리셋

      return cloudinaryAxiosInstance
        .post('', formData) // Cloudinary 업로드 API 엔드포인트로 요청
        .then((response) => response.data.secure_url) // 업로드된 이미지 URL 반환
        .catch((error) => {
          console.error('Cloudinary 업로드 실패:', error)
          return null // 실패 시 null 반환
        })
    })

    // 모든 업로드가 완료될 때까지 기다림
    const uploadedUrls = await Promise.all(uploadPromises)

    // 실패한 이미지 URL은 제외하고 성공한 URL만 필터링
    const successfulUrls = uploadedUrls.filter((url) => url !== null)

    // 업로드된 이미지 URLs를 상태에 저장
    setUploadedImages(successfulUrls)

    // 업로드된 이미지 URLs 확인
    console.log('업로드된 이미지 URLs:', successfulUrls)

    // `uploadedImages` 상태가 제대로 업데이트되었는지 확인하기 위해 서버로 전송하거나 추가적인 작업을 여기에 추가할 수 있습니다.
  }

  useEffect(() => {
    if (uploadedImages.length > 0) {
      // 업로드된 이미지 URLs이 있을 때 서버로 전송하거나 추가 작업 수행
      console.log('업로드된 이미지 URLs:', uploadedImages)
    }
  }, [uploadedImages]) // uploadedImages가 변경될 때마다 실행

  // useEffect(() => {
  //     if (imageFiles.length > 0) {
  //         setBase64s([]);
  //         imageFiles.forEach((image) => {
  //             encodeFileToBase64(image).then((data) => setBase64s((prev) => [...prev, { url: data as string }]));
  //         });
  //     }
  // }, [imageFiles]);
  // console.log(Base64s);

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

  const [selectedChannelId, setSelectedChannelId] = useState('')
  const handleChannelChange = (id: string) => {
    console.log('선택된 채널 ID:', id)
    setSelectedChannelId(id)
  }

  const [writtenTitle, setWrittenTitle] = useState('')
  const handlerTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    if (title) {
      setWrittenTitle(title)
    }
  }

  const [locations, setLocations] = useState<string[]>([])
  const handleLocationsChange = (newTags: string[]) => {
    setLocations(newTags)
  }
  const [hotels, setHotels] = useState<string[]>([])
  const handleHotelsChange = (newTags: string[]) => {
    setHotels(newTags)
  }

  const [context, setContext] = useState('')
  const handlerContextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const context = e.target.value
    if (context) {
      setContext(context)
    }
  }
  const preventInvalidInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자가 아닌 입력값과 한글 입력을 필터링한다.
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
  }

  const [cost, setCost] = useState('')
  const handlerCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cost = e.target.value
    if (cost) {
      setCost(cost)
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

  //API POST
  const handleSubmit = async () => {
    if (!writtenTitle) {
      alert('제목을 입력하세요.')
      return
    }

    if (!selectedChannelId) {
      alert('채널을 선택하세요.')
      return
    }

    if (imageFiles.length === 0) {
      alert('이미지를 하나 이상 선택해주세요.')
      return // 이미지가 없으면 더 이상 진행하지 않음
    }

    const formData = new FormData()

    formData.append(
      'title',
      JSON.stringify({
        uploadedImages,
        writtenTitle,
        tags,
        locations,
        hotels,
        cost,
        context,
      })
    )

    //이미지 필드에는 썸네일용 첫번째 이미지만 넣기
    formData.append('image', imageFiles[0])

    formData.append('channelId', selectedChannelId)

    try {
      const res = await axiosInstance.post('/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('post 성공:', res.data)
      alert('게시 완료')
    } catch (error) {
      console.log('post 실패:', error)
      alert('게시 실패')
    }
  }

  return (
    <>
      {/* 전체 contents 박스 */}
      <div className="w-[1049px] h-[1115px] p-[23px] absolute left-[30vw] top-[65px]">
        {/* 채널 선택 영역 */}
        <div className="w-full h-[110px] pt-[30px] pb-[30px]">
          <WriteInfo
            iconSrc={channelIcon}
            tagName="채널"
            onSelectChange={handleChannelChange}
          ></WriteInfo>
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
          <div className="h-full w-[920px]  flex overflow-hidden absolute left-[60px]">
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
        <div className="w-full h-[767px] pt-[30px]">
          {/* 제목 입력 영역 */}
          <input
            type="text"
            placeholder="제목을 입력하세요."
            className="h-[44px] w-full outline-none placeholder-[#989B9D] font-bold text-[32px] text-(--color-main-navy)"
            onChange={handlerTitleChange}
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
            <WriteInfo
              iconSrc={pin}
              tagName="위치"
              type="text"
              onTagChange={handleLocationsChange}
            ></WriteInfo>
          </div>
          {/* 숙소 */}
          <div className="mb-[25px]">
            <WriteInfo
              iconSrc={bedIcon}
              tagName="숙소"
              type="text"
              onTagChange={handleHotelsChange}
            ></WriteInfo>
          </div>
          <hr className="mb-[20px] border-[#E4E4E4]"></hr>
          {/* 경비 */}
          <input
            type="number"
            placeholder="경비을 입력하세요."
            className="h-[22px] w-full outline-none placeholder-[#989B9D] font-bold text-[16px] mb-[18px] "
            onChange={handlerCostChange}
            onInput={preventInvalidInput}
          />
          {/* 내용 입력 영역 */}
          <textarea
            placeholder="내용을 입력하세요."
            className="h-[364px] w-full placeholder-[#989B9D] font-bold text-[24px] focus:outline-[#60b5ff] rounded-[10px]"
            onChange={handlerContextChange}
          />
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
    </>
  )
}
