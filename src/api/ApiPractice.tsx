import axios from 'axios';
import { useEffect, useState } from 'react';

interface Channel {
  _id: string;
  name: string;
  description: string;
  authRequired: boolean;
}

export default function ApiPractice() {
  // 채널 받아오기
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    async function fetchChannels() {
      try {
        const res = await axios.get<Channel[]>(
          'http://13.125.208.179:5001/channels'
        );
        console.log('res:', res);
        console.log('res.data:', res.data);
        setChannels(res.data);
      } catch (err) {
        console.error('채널 가져오기 실패:', err);
      }
    }

    fetchChannels();
  }, []);
  return (
    <ul className="flex space-x-4 gap-0.5 mt-[10px] mb-[30px]">
      {channels.map((channel) => (
        <li
          key={channel._id}
          className="text-[#4DA0FF] border-[1px] rounded-xl py-[15px] px-[40px] text-[15px]
          hover:scale-[1.15] transition-all duration-75 ease-in-out cursor-pointer
          "
        >
          {channel.name}
        </li>
      ))}
    </ul>
  );
}
