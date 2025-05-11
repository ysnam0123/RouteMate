import { useRef, useState } from 'react'
import WriteInfoMenu from './WriteInfoMenu'

export default function WriteInfo({
  iconSrc,
  tagName,
  type,
}: {
  iconSrc: string
  tagName: string
  type?: string
}) {
  const [tags, setTags] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const selectRef = useRef<HTMLSelectElement | null>(null)

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = type
        ? inputRef.current?.value.trim()
        : selectRef.current?.value.trim()

      if (value) {
        setTags([...tags, value])
        if (type && inputRef.current) inputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <div className="h-[50px] flex">
        {/* 정보 입력 영역 */}
        <div className="w-full flex gap-4 items-center">
          <WriteInfoMenu iconSrc={iconSrc} tagName={tagName}></WriteInfoMenu>
          {type ? (
            <input
              type={type}
              onKeyDown={addTag}
              ref={inputRef}
              className="border border-[#AFB1B6] rounded-md py-1 w-[238px] text-[15px] focus:outline-[#60b5ff]"
              placeholder={tagName + ' 추가'}
            />
          ) : (
            <select
              ref={selectRef}
              className="border border-[#AFB1B6] w-[440px] rounded-md px-2 py-1 active:outline-[#60b5ff] focus:outline-[#60b5ff]"
              defaultValue=""
              name="channelSelect"
            >
              <option
                value=""
                disabled
                hidden
                color="AFB1B6"
                className="text-sm"
              >
                채널API연결~
              </option>
              {/* 나중에 채널 API와 연결하기 */}
            </select>
          )}
          {/* 입력한 정보 추가 영역*/}
          <div className="flex items-center">
            <ul className="p-2 h-1/2 flex items-center">
              {tags.map((tag, index) => (
                <li>
                  <span
                    key={index}
                    className="text-[15px] text-[#777777] pr-[10px] pl-[10px] border-r border-[#777777]"
                  >
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
