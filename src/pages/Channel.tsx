import { useState, useEffect } from 'react';
import axios from 'axios';
import ChannelNav from '../components/channel/ChannelNav';
import Header from '../components/layout/Header';
import Sidebar from '../components/sidebar/Sidebar';

interface Channel {
  _id: string;
  name: string;
  description: string;
  authRequired: boolean;
}

export default function Channel() {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    async function fetchChannels() {
      try {
        const res = await axios.get<Channel[]>(
          'http://13.125.208.179:5001/channels'
        );
        setChannels(res.data);
      } catch (err) {
        console.error('채널 가져오기 실패:', err);
      }
    }

    fetchChannels();
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col  items-center w-full">
          <ChannelNav channels={channels} />
        </div>
      </div>
    </>
  );
}
