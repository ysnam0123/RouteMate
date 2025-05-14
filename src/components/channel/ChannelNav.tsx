import axios from 'axios';
import { useState } from 'react';
import ChannelList from './ChannelList';
import { AxiosInstance } from 'axios';
import Post from './Post';
import { axiosInstance } from '../../api/axios';
interface Channel {
  _id: string;
  name: string;
}

interface ChannelNavProps {
  channels: Channel[];
}

interface Post {
  _id: string;
  title: string; // JSON string 형태
  createdAt: string;
  likes: any[];
  comments: any[];
  author: {
    fullName: string;
  };
  image: string;
}

export default function ChannelNav({ channels }: ChannelNavProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  // 선택된 채널의 ID를 저장해야하기 때문에 string | null 로 타입을 정해준다.
  // 어떤 채널이 선택됬는지 알아야하기 때문에 true/false 로 구분하면 안된다!
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const showChannel = async (channelId: string) => {
    try {
      const res = await axiosInstance.get<Post[]>(
        `/posts/channel/${channelId}`
      );
      setPosts(res.data);
      // 선택된 채널 ID 저장하기
      setSelectedChannel(channelId);
    } catch (error) {
      console.error('채널 게시글을 불러오지 못했습니다.', error);
    }
  };

  return (
    <>
      {/* 채널 선택 버튼 */}
      <ChannelList
        channels={channels}
        onSelect={showChannel}
        // 선택된 채널ID 전달하기
        selectedChannelId={selectedChannel}
        className=""
      />
      {/* 게시글 */}
      <div className="">
        {posts.length === 0 && <p>채널을 선택해주세요.</p>}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}
