import { useState } from 'react';
import filterIcon from '../../assets/icons/filterIcon.svg';
// 채널에는 아이디랑 이름만 있으면 된다
interface Channel {
  _id: string;
  name: string;
}
interface ChannelListProps {
  channels: Channel[];
  // 이렇게 하면 ChannelNav 안에 있는 showChannel 함수를 onSelect로 작동하게 된다.
  onSelect: (channelId: string) => void;
  selectedChannelId: string | null;
  className?: string;
}

export default function ChannelList({
  channels,
  onSelect,
  selectedChannelId,
}: ChannelListProps) {
  const [cost, setCost] = useState<number>(0);

  const [showFilter, setShowFilter] = useState(true);
  const filterToggle = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <>
      <div className="flex justify-center relative">
        <div className="flex-col ">
          <ul className="flex space-x-4 mt-[10px] mb-[20px] flex-row h-[55px] ">
            {channels.map((channel) => {
              const isSelected = channel._id === selectedChannelId;

              return (
                <li
                  key={channel._id}
                  onClick={() => onSelect(channel._id)}
                  className={`border-[1px] rounded-xl py-[15px] px-[40px] text-[15px] cursor-pointer transition-all duration-75 ease-in-out
              ${
                isSelected
                  ? 'bg-[#EFF8FF] text-[var(--color-main-blue)] scale-[1.15] border-[3px] border-[var(--color-main-blue)]'
                  : 'text-[#8F8F8F] hover:scale-[1.15]'
              }`}
                >
                  {channel.name}
                </li>
              );
            })}
          </ul>
          {/* 필터링 부분 */}
          <div>
            <img
              src={filterIcon}
              alt="filterIcon"
              className="w-[30px] h-[30px] absolute right-[30px] top-[90px] cursor-pointer hover:scale-[1.3]"
              onClick={filterToggle}
            />
            {!showFilter && <div className="h-[40px]"></div>}

            {showFilter && (
              <div className="flex-col flex gap-4 pl-[30px] px-[10px] py-[20px]  ">
                <div className="flex">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>경비</span>
                      <input
                        type="range"
                        id="cost"
                        min={0}
                        max={2000000}
                        step={10000}
                        value={cost}
                        onChange={(e) => setCost(Number(e.target.value))}
                        className="w-[100px]"
                        list="markers"
                      />
                      <datalist id="markers">
                        <option value="200000"></option>
                        <option value="700000"></option>
                        <option value="1200000"></option>
                        {/* <option value="1200000"></option> */}
                        <option value="1600000"></option>
                      </datalist>

                      <span>200만원 이상</span>
                    </label>
                    {/* 실시간 보여주는 비용 */}
                    <p id="setCost" className="text-m text-gray-600">
                      현재 설정된 경비:{' '}
                      <strong>{cost.toLocaleString()}원</strong>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mb-[25px]">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>장소: </span>
                  </label>
                  <input
                    type="text"
                    className="border rounded-[5px] w-[300px] h-[20px] px-[10px] py-[15px]"
                    placeholder="장소를 입력하세요"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
