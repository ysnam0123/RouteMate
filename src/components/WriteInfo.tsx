import { useEffect, useRef, useState } from "react";
import WriteInfoMenu from "./WriteInfoMenu";
import { axiosInstance } from "../api/axios";

interface Channel {
  id: string;
  name: string;
}

export default function WriteInfo({
  iconSrc,
  tagName,
  type,
  onSelectChange,
  onTagChange,
}: {
  iconSrc: string;
  tagName: string;
  type?: string;
  onSelectChange?: (selectedId: string) => void;
  onTagChange?: (tags: string[]) => void;
}) {
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = type
        ? inputRef.current?.value.trim()
        : selectRef.current?.value.trim();

      if (value) {
        const newTags = [...tags, value];
        setTags(newTags);
        if (onTagChange) {
          onTagChange(newTags);
        }
        if (type && inputRef.current) inputRef.current.value = "";
      }
    }
  };

  //채널 목록 불러오기
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const getChannel = async () => {
      const { data } = await axiosInstance.get(`channels`);
      //필요한 id,name 추출
      const simplified = data.map((channel: { _id: string; name: string }) => ({
        id: channel._id,
        name: channel.name,
      }));
      setChannels(simplified);
    };
    getChannel();
  }, []);

  //Write.tsx에 channelId 전달
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (onSelectChange) {
      onSelectChange(selectedId);
    }
  };

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
              placeholder={tagName + " 추가"}
            />
          ) : (
            <select
              ref={selectRef}
              onChange={handleSelectChange}
              className="border border-[#AFB1B6] w-[440px] rounded-md px-2 py-1 active:outline-[#60b5ff] focus:outline-[#60b5ff]"
              defaultValue=""
              name="channelSelect"
            >
              {channels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.name}
                </option>
              ))}
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
  );
}
