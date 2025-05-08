import { MenuItem } from '../../types/Sidebar';
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

let menuItems: MenuItem[] = [
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
  let [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  let [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);

  let handleItemClick = (item: MenuItem, event: React.MouseEvent) => {
    event.preventDefault();
    if (item.isSearchTrigger) {
      let nextSearchMode = !isSearchMode;
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

  let handleCloseSearch = () => {
    setIsSearchMode(false);
    setHighlightedItemId(null);
  };

  let handleClosePanel = () => {
    setHighlightedItemId(null);
  };

  let isExpanded = highlightedItemId !== null;
  // let sidebarWidth = isExpanded ? "w-[500px] border-r-0" : "w-[70px]";
  let menuPanelWidth = isExpanded ? 'w-[70px]' : 'w-[200px]';

  return (
    <nav className="h-screen bg-white flex transition-all duration-300">
      <div
        className={`p-4 overflow-y-auto bg-sky-100 transition-all duration-300 ease-in-out ${menuPanelWidth}`}
      >
        <ul className="items-start justify-start text-left">
          {menuItems.map((item) => {
            let isItemActive = item.id === highlightedItemId;
            let iconContainerClasses = `p-2 mb-2 rounded-md cursor-pointer transition duration-150 ease-in-out group flex items-center justify-center ${
              isItemActive ? 'bg-orange-500 shadow-md' : 'hover:bg-gray-200'
            }`;
            return (
              <li
                key={item.id}
                className={`${iconContainerClasses.trim()} items-start justify-start text-left`}
                onClick={(e) => handleItemClick(item, e)}
                title={item.text}
              >
                <span
                  className={`w-5 h-5 block mr-3 flex-shrink-0 ${
                    isItemActive ? 'filter brightness-0 invert' : ''
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-sm ${
                    isItemActive ? 'text-white' : 'text-gray-800'
                  }
                     ${isExpanded ? 'hidden' : ''}`}
                >
                  {item.text}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex-grow overflow-hidden">
        {' '}
        {isExpanded && (
          <div className="h-full w-full bg-white">
            {' '}
            {isSearchMode ? (
              <SearchPanel onClose={handleCloseSearch} />
            ) : (
              <>
                {highlightedItemId === 'notice' && (
                  <NoticePanel onClose={handleClosePanel} />
                )}

                {highlightedItemId &&
                  highlightedItemId !== 'notice' &&
                  highlightedItemId !== 'search' && (
                    <div className="p-4">
                      {' '}
                      <h2 className="text-lg font-semibold mb-4">
                        {
                          menuItems.find((i) => i.id === highlightedItemId)
                            ?.text
                        }
                      </h2>
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
