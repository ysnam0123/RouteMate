import { MenuItem } from '../types/Sidebar';
import newPostIcon from '../assets/icons/newPostIcon.svg';
import mate from '../assets/icons/homeIcon.svg';
import search from '../assets/icons/Search.svg';
import letter from '../assets/icons/letterIcon.svg';
import notice from '../assets/icons/notificationIcon.svg';
import history from '../assets/icons/profileIcon.svg';
import settings from '../assets/icons/setting.svg';
import { useState } from 'react';
import SearchPanel from './SearchPanel';
import NoticePanel from './NoticePanel';

const menuItems: MenuItem[] = [
  {
    id: 'share',
    icon: <img src={newPostIcon} />,
    text: '여행 나누기',
    path: '/share',
  },
  { id: 'mate', icon: <img src={mate} />, text: '여행 이야기', path: '/mate' },
  {
    id: 'search',
    icon: <img src={search} />,
    text: '검색',
    path: '/search',
    isSearchTrigger: true,
  },
  { id: 'letter', icon: <img src={letter} />, text: '편지', path: '/letter' },
  {
    id: 'notice',
    icon: <img src={notice} />,
    text: '여정 알림판',
    path: '/notice',
  },
  {
    id: 'history',
    icon: <img src={history} />,
    text: '나의 여정 기록',
    path: '/history',
  },
  {
    id: 'settings',
    icon: <img src={settings} />,
    text: '설정',
    path: '/settings',
  },
];

function Sidebar(): React.ReactElement {
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(
    null
  );

  const handleItemClick = (item: MenuItem, event: React.MouseEvent) => {
    event.preventDefault();
    if (item.isSearchTrigger) {
      const nextSearchMode = !isSearchMode;
      setIsSearchMode(nextSearchMode);
      setHighlightedItemId(nextSearchMode ? item.id : null);
    } else {
      setIsSearchMode(false);
      if (item.id === highlightedItemId) {
        // 같다면, 패널을 닫기 위해 null로 설정 (토글 기능)
        setHighlightedItemId(null);
      } else {
        // 다르다면, 해당 아이템의 패널을 열기 위해 item.id로 설정
        setHighlightedItemId(item.id);
      }
    }
  };

  const handleCloseSearch = () => {
    setIsSearchMode(false);
    setHighlightedItemId(null);
  };

  const handleClosePanel = () => {
    setHighlightedItemId(null); // 하이라이트만 제거 (검색모드는 영향 없음)
  };

  const isExpanded = highlightedItemId !== null;
  const sidebarWidth = isExpanded ? 'w-[500px] border-r-0' : 'w-[70px]';

  return (
    <nav
      // 너비와 트랜지션은 이전 코드와 동일하게 유지 (w-[450px] 또는 필요시 w-[430px] 등 사용)
      className={`h-screen bg-[#EDF9FF] border-r border-gray-200 flex transition-all duration-300 ease-in-out ${sidebarWidth}`}
    >
      {/* --- 1. 아이콘 컬럼 (항상 표시) --- */}
      {/* 아이콘 컬럼은 하나만 남깁니다. */}
      <div className="w-[70px] p-4 flex-shrink-0 overflow-y-auto border-r border-gray-200">
        <ul>
          {menuItems.map((item) => {
            const isItemActive = item.id === highlightedItemId;
            const iconContainerClasses = `p-2 mb-2 rounded-md cursor-pointer transition duration-150 ease-in-out group flex items-center justify-center ${
              isItemActive ? 'bg-orange-500 shadow-md' : 'hover:bg-gray-200'
            }`;
            return (
              <li
                key={item.id}
                className={iconContainerClasses.trim()}
                onClick={(e) => handleItemClick(item, e)}
                title={item.text} // 툴팁
              >
                <span
                  className={`w-5 h-5 block ${
                    isItemActive ? 'filter brightness-0 invert' : ''
                  }`}
                >
                  {item.icon}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* --- 아이콘 컬럼 중복 부분 삭제 --- */}
      {/* <div className="w-[70px] p-4 flex-shrink-0 overflow-y-auto border-r border-gray-200"> ... </div> */}

      {/* --- 2. 컨텐츠 영역 (확장 시 표시) --- */}
      {/* 컨텐츠 영역도 하나만 남깁니다 (NoticePanel 로직이 있는 버전). */}
      <div className="flex-grow overflow-hidden">
        {' '}
        {/* 이전 px-4 등은 제거됨 */}
        {/* isExpanded 상태일 때만 내부 컨텐츠 렌더링 */}
        {isExpanded && (
          // h-full로 높이 채우기
          <div className="h-full w-full bg-white">
            {' '}
            {/* 너비 100% 명시 */}
            {isSearchMode ? (
              // 검색 모드일 때 SearchPanel 렌더링
              <SearchPanel onClose={handleCloseSearch} />
            ) : (
              // 검색 모드가 아닐 때 highlightedItemId에 따라 분기
              <>
                {highlightedItemId === 'notice' && (
                  // 'notice' 일 때 NoticePanel 렌더링
                  <NoticePanel onClose={handleClosePanel} />
                )}

                {/* 다른 아이템 ID에 대한 처리 (우선 제목만 표시) */}
                {highlightedItemId &&
                  highlightedItemId !== 'notice' &&
                  highlightedItemId !== 'search' && (
                    <div className="p-4">
                      {' '}
                      {/* 기본 패딩 추가 */}
                      <h2 className="text-lg font-semibold mb-4">
                        {
                          menuItems.find((i) => i.id === highlightedItemId)
                            ?.text
                        }
                      </h2>
                      {/* 각 메뉴에 맞는 컴포넌트 추가 필요 */}
                      <p>
                        Content for '
                        {
                          menuItems.find((i) => i.id === highlightedItemId)
                            ?.text
                        }
                        ' goes here.
                      </p>
                    </div>
                  )}
              </>
            )}
          </div>
        )}
      </div>

      {/* --- 컨텐츠 영역 중복 부분 삭제 --- */}
      {/* <div className={`flex-grow px-4 overflow-hidden ...`}> ... </div> */}
    </nav>
  );
}

export default Sidebar;
