import { MenuItem } from "../types/Sidebar";
import newPostIcon from "../assets/icons/newPostIcon.svg";
import mate from "../assets/icons/mate.svg";
import search from "../assets/icons/Search.svg";
import letter from "../assets/icons/letterIcon.svg";
import notice from "../assets/icons/notificationIcon.svg";
import history from "../assets/icons/profileIcon.svg";
import settings from "../assets/icons/setting.svg";

const menuItems: MenuItem[] = [
  {
    id: "share",
    icon: <img src={newPostIcon} />,
    text: "여행 나누기",
    path: "/share",
  },
  { id: "mate", icon: <img src={mate} />, text: "여행 이야기", path: "/mate" },
  { id: "search", icon: <img src={search} />, text: "검색", path: "/search" },
  { id: "letter", icon: <img src={letter} />, text: "편지", path: "/letter" },
  {
    id: "notice",
    icon: <img src={notice} />,
    text: "여정 알림판",
    path: "/notice",
  },
  {
    id: "history",
    icon: <img src={history} />,
    text: "나의 여정 기록",
    path: "/history",
  },
  {
    id: "settings",
    icon: <img src={settings} />,
    text: "설정",
    path: "/settings",
  },
];

function Sidebar(): React.ReactElement {
  return (
    <nav className="w-[230px] h-screen bg-sky-50 p-4 border-r border-gray-200 flex flex-col">
      <ul>
        {menuItems.map((item) => {
          const linkClasses = `
              flex items-center py-3 px-4 rounded-md text-sm transition duration-150 ease-in-out group
              text-gray-700 hover:bg-gray-200 hover:text-gray-800
            `;

          return (
            <li key={item.id} className="mb-2">
              <a href={item.path} className={linkClasses.trim()}>
                <span className="mr-3">{item.icon}</span>
                <span className="flex-grow font-medium">{item.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Sidebar;
