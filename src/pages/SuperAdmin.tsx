import deleteIcon from '../assets/icons/deleteIcon.png';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axios';
import profile from '../assets/images/profile.svg';

interface Channel {
    id: string;
    name: string;
}
interface User {
    _id: string;
    fullName: string;
    image: string;
}

export default function SuperAdmin() {
    //채널 목록 불러오기
    const [channels, setChannels] = useState<Channel[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // 채널 생성 상태
    const [isCreating, setIsCreating] = useState(false);
    const [ChannelName, setChannelName] = useState('');

    const getChannel = async () => {
        const { data } = await axiosInstance.get(`channels`);
        //필요한 id,name 추출
        const simplified = data.map((channel: { _id: string; name: string }) => ({
            id: channel._id,
            name: channel.name,
        }));
        setChannels(simplified);
    };

    const getUser = async () => {
        try {
            const res = await axiosInstance.get('/users/get-users', {});
            setUsers(res.data);
        } catch (error) {
            console.error('사용자 목록을 가져오는데 실패했습니다.', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getChannel();
        getUser();
    }, []);

    if (loading) {
        return <p>로딩 중...</p>;
    }

    // 채널 생성
    const createChannel = async () => {
        if (!ChannelName.trim()) {
            alert('채널 이름을 입력하세요.');
            return;
        }
        try {
            await axiosInstance.post('/channels/create', {
                name: ChannelName,
                authRequired: true,
            });
            alert('채널 생성 완료');
            setChannelName('');
            setIsCreating(false);
            getChannel();
        } catch (error) {
            console.error('채널 생성 실패:', error);
            alert('채널 생성 실패');
        }
    };

    const deleteChannel = async (channelId: String) => {
        try {
            const res = await axiosInstance.delete('/channels/delete', {
                data: {
                    id: channelId,
                },
            });
            console.log('채널 삭제 성공:', res.data);
            alert('채널 삭제 완료');
            getChannel();
        } catch (error) {
            console.log('채널 삭제 실패:', error);
            alert('채널 삭제 실패');
        }
    };

    return (
        <>
            <>
                <div className="ml-[130px] mt-[50px] ">
                    <section className="mb-[100px]">
                        <h1 className="font-bold text-[32px] mb-[40px]">채널 관리</h1>
                        <div className="flex">
                            {channels.map((channel) => (
                                <div
                                    key={channel.id}
                                    className="w-[150px] h-[55px] border rounded-[10px] border-[#0F172A] text-[15px] font-semibold  items-center flex justify-center mr-[10px] relative"
                                >
                                    {channel.name}
                                    <img
                                        src={deleteIcon}
                                        alt="deleteIcon"
                                        className="absolute right-[-10px] top-[-10px] bg-[#fff]"
                                        onClick={() => deleteChannel(channel.id)}
                                    />
                                </div>
                            ))}

                            {isCreating ? (
                                <input
                                    type="text"
                                    autoFocus
                                    value={ChannelName}
                                    onChange={(e) => setChannelName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            createChannel();
                                        } else if (e.key === 'Escape') {
                                            setIsCreating(false);
                                            setChannelName('');
                                        }
                                    }}
                                    className="w-[150px] h-[55px] border rounded-[10px] border-[#0F172A] text-[15px] font-semibold px-[10px] mr-[10px]"
                                    placeholder="채널 이름 입력"
                                />
                            ) : (
                                <div
                                    onClick={() => setIsCreating(true)}
                                    className="w-[150px] h-[55px] border rounded-[10px] border-[#60B5FF] bg-[#60B5FF] text-[#FCFDFF] text-[15px] font-semibold flex items-center justify-center mr-[10px] cursor-pointer"
                                >
                                    채널 생성
                                </div>
                            )}
                        </div>
                    </section>
                    <section className="mt-[100px]">
                        <h1 className="font-bold text-[32px] mb-[40px]">사용자 관리</h1>

                        <input
                            type="text"
                            id="text"
                            placeholder="사용자 검색"
                            className="border border-[#E8E8E8] rounded-[10px] text-[20px] focus:outline-[#60B5FF] content-center inline-block w-[370px] h-[51px] p-[10px] mb-[30px]"
                        />

                        <div className="w-[370px] h-[360px] border  border-[#E8E8E8] rounded-[10px] p-[2px] overflow-y-auto overflow-x-hidden">
                            {users.map((user) => (
                                <div
                                    key={user._id}
                                    className="justify-between w-[365px] h-[56px] flex content-center px-[10px]"
                                >
                                    <div className="flex gap-[14px] items-center">
                                        {/* 사용자 프로필 이미지가 있으면 표시, 없으면 기본프로필 */}
                                        <img
                                            src={user.image || profile}
                                            alt={user.fullName}
                                            className="rounded-full w-[40px] h-[40px]"
                                        />
                                        <span>{user.fullName}</span>
                                    </div>
                                    <div className="content-center">
                                        <img src={deleteIcon} alt="deleteIcon" className="cursor-pointer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </>
        </>
    );
}
