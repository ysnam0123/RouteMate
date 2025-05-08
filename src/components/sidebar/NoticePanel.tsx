// src/components/NoticePanel.tsx (예시 경로)
import React from 'react';

interface NoticePanelProps {
  onClose: () => void;
}

// 임시 알림 데이터 (실제로는 상태나 props로 받아야 함)
let notifications = [
  {
    id: 1,
<<<<<<< HEAD:src/components/sidebar/NoticePanel.tsx
    avatar: '/src/assets/images/알림 프사.png',
    text: 'namyoonseo 님의 발자국을 남겼습니다.',
=======
    avatar: "/src/assets/images/알림 프사.png",
    text: "namyoonseo 님이 발자국을 남겼습니다.",
>>>>>>> origin/publish/sidebar:src/components/NoticePanel.tsx
    comment: ':"댓글"',
    time: '3분 전',
  },
  {
    id: 2,
<<<<<<< HEAD:src/components/sidebar/NoticePanel.tsx
    avatar: '/src/assets/images/알림 프사.png',
    text: 'namyoonseo 님의 회원님의 게시글을 좋아합니다.',
=======
    avatar: "/src/assets/images/알림 프사.png",
    text: "namyoonseo 님이 회원님의 게시글을 좋아합니다.",
>>>>>>> origin/publish/sidebar:src/components/NoticePanel.tsx
    comment: null,
    time: '3분 전',
  },
  {
    id: 3,
<<<<<<< HEAD:src/components/sidebar/NoticePanel.tsx
    avatar: '/src/assets/images/알림 프사.png',
    text: 'namyoonseo 님의 발자국을 남겼습니다.',
=======
    avatar: "/src/assets/images/알림 프사.png",
    text: "namyoonseo 님이 발자국을 남겼습니다.",
>>>>>>> origin/publish/sidebar:src/components/NoticePanel.tsx
    comment: ':"댓글"',
    time: '3분 전',
  },
  {
    id: 4,
<<<<<<< HEAD:src/components/sidebar/NoticePanel.tsx
    avatar: '/src/assets/images/알림 프사.png',
    text: 'namyoonseo 님의 발자국을 남겼습니다.',
=======
    avatar: "/src/assets/images/알림 프사.png",
    text: "namyoonseo 님이 발자국을 남겼습니다.",
>>>>>>> origin/publish/sidebar:src/components/NoticePanel.tsx
    comment: ':"댓글"',
    time: '3분 전',
  },
  {
    id: 5,
<<<<<<< HEAD:src/components/sidebar/NoticePanel.tsx
    avatar: '/src/assets/images/알림 프사.png',
    text: 'namyoonseo 님의 발자국을 남겼습니다.',
=======
    avatar: "/src/assets/images/알림 프사.png",
    text: "namyoonseo 님이 발자국을 남겼습니다.",
>>>>>>> origin/publish/sidebar:src/components/NoticePanel.tsx
    comment: '"댓글"',
    time: '3분 전',
  },
];

function NoticePanel({ onClose }: NoticePanelProps): React.ReactElement {
  return (
    // 패널 전체 높이를 채우고 내부에서 스크롤되도록 설정
    <div
<<<<<<< HEAD:src/components/sidebar/NoticePanel.tsx
      className="px-4 flex flex-col text-sm bg-white rounded-lg shadow-md h-full w-80"
      style={{ boxShadow: '4px 0 6px rgba(0, 0, 0, 0.15)' }}
=======
      className="px-4 flex flex-col text-sm bg-white rounded-lg shadow-md h-full w-90"
      style={{ boxShadow: "4px 0 6px rgba(0, 0, 0, 0.15)" }}
>>>>>>> origin/publish/sidebar:src/components/NoticePanel.tsx
    >
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4 pt-4">
        <h2 className="text-2xl font-bold mr-19">알림</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* 알림 목록 (스크롤 영역) */}
      <ul className="flex-grow overflow-y-auto space-y-3">
        {notifications.map((notice) => (
          <li
            key={notice.id}
            className="flex items-start space-x-3 p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            {/* 아바타 이미지 */}
            <img
              src="/src/assets/images/Ellipse 35.png"
              alt="avatar"
              className="w-8 h-8 rounded-full flex-shrink-0 mt-1"
            />
            {/* 텍스트 내용 */}
            <div className="flex-grow text-xs">
              <p className="text-gray-800 font-bold">{notice.text}</p>
              {notice.comment && (
                <p className="text-gray-800 font-bold">{notice.comment}</p>
              )}
            </div>
            {/* 시간 */}
            <span className="text-xs text-gray-500 flex-shrink-0 mt-1">
              {notice.time}
            </span>
          </li>
        ))}
        {notifications.length === 0 && (
          <p className="text-center text-gray-500 mt-4">새 알림이 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default NoticePanel;
