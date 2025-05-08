import React from "react"; // Import React

interface SearchPanelProps {
  onClose: () => void;
}

function SearchPanel({ onClose }: SearchPanelProps): React.ReactElement {
  return (
    <div
      className="px-4 flex flex-col text-sm bg-white rounded-lg shadow-md h-full w-90"
      style={{ boxShadow: "4px 0 6px rgba(0, 0, 0, 0.15)" }}
    >
      {/* 헤더: 제목, 라디오 버튼, 닫기 버튼을 한 줄에 배치 */}
      <div className="flex justify-between items-center mb-4 pt-4">
        {" "}
        {/* 헤더 영역 */}
        {/* 1. 제목 */}
        <h2 className="text-2xl font-semibold flex-shrink-0 mr-19">
          {" "}
          {/* 너비 줄어들지 않게, 오른쪽 마진 추가 */}
          검색
        </h2>
        {/* 2. 라디오 버튼 그룹 (헤더 안으로 이동) */}
        {/* flex-grow를 주어 가능한 공간을 차지하게 할 수 있음 */}
        <div className="flex space-x-3 flex-grow justify-start">
          {" "}
          {/* 왼쪽 정렬 추가 */}
          <label className="flex items-center cursor-pointer text-sm">
            <input
              type="radio"
              name="searchType"
              value="post"
              defaultChecked
              className="mr-1 accent-blue-500"
            />
            게시글
          </label>
          <label className="flex items-center cursor-pointer text-sm">
            <input
              type="radio"
              name="searchType"
              value="user"
              className="mr-1 accent-blue-500"
            />
            사용자
          </label>
          {/* '태그' 라디오 버튼은 이미지에 없어서 주석 처리 (필요하면 해제) */}
          {/*
          <label className="flex items-center cursor-pointer text-sm">
            <input
              type="radio"
              name="searchType"
              value="tag"
              className="mr-1 accent-blue-500"
            />
            태그
          </label>
          */}
        </div>
        {/* 3. 닫기 버튼 */}
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl flex-shrink-0 ml-3" // 너비 줄어들지 않게, 왼쪽 마진 추가
          aria-label="Close search panel"
        >
          ✕
        </button>
      </div>{" "}
      {/* 헤더 영역 끝 */}
      {/* 라디오 버튼 그룹 (이전 위치에서는 제거) */}
      {/* <div className="flex space-x-3 mb-4"> ... </div> */}
      {/* 검색 입력 필드 */}
      <div className="relative mb-4 flex justify-end">
        <select
          // 기존 input과 유사한 스타일 적용 + select 스타일링 위한 클래스 추가
          className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none"
          style={{
            borderColor: "var(--color-main-skyBlue-hover)",
            boxShadow: "0 0 0 1px var(--color-lightGray-focus)", // ring 대체
            appearance: "none",
          }}
          defaultValue="" // 플레이스홀더 역할을 하는 첫 옵션이 기본 선택되도록
          // onChange={(e) => { /* 선택 변경 시 처리 로직 */ }}
          // value={selectedChannel} // React 상태와 연결 시
        >
          {/* 플레이스홀더 역할을 하는 첫 번째 옵션 */}
          <option value="" disabled>
            채널 선택
          </option>

          {/* 실제 선택 가능한 채널 목록 (데이터로부터 동적으로 생성해야 함) */}
          <option value="channel_id_1">채널 1</option>
          <option value="channel_id_2">채널 2</option>
          <option value="channel_id_3">채널 3</option>
          {/* ... 더 많은 채널 옵션 ... */}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div className="relative mb-4">
        {" "}
        {/* 위 요소들과 간격을 위해 mb-4 추가 */}
        <input
          type="text"
          //   placeholder="검색어를 입력하세요." // 필요에 따라 placeholder 변경 가능
          // 일반적인 입력창 스타일 적용
          className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          // style={{
          //   borderColor: "var(--color-main-skyBlue-hover)",
          //   boxShadow: "0 0 0 1px var(--color-lightGray-focus)", // ring 대체
          // }}
          // onChange={(e) => { /* 검색어 상태 업데이트 로직 */ }}
          // value={searchTerm} // React 상태와 연결 시
        />
      </div>
      {/* 최근 검색 항목 */}
      <div className="flex-grow overflow-y-auto border-t border-gray-200 pt-3 pb-4">
        <h3 className="text-base font-bold mb-2 text-black-700">
          최근 검색 항목
        </h3>
        {/* ... ul, li 등 ... (이하 동일) */}
        <ul>
          <li className="flex justify-between items-center py-1.5 mb-1 group">
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <img
                src="/src/assets/images/Ellipse 25.png"
                alt="프로필"
                className="w-8 h-8 rounded-full mr-1"
              />
              <span className="text-gray-800">채널 주인 1</span>
            </div>
            <button aria-label="Remove search item">✕</button>
          </li>
          <li className="flex justify-between items-center py-1.5 mb-1 group">
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <img
                src="/src/assets/images/Ellipse 25.png"
                alt="프로필"
                className="w-8 h-8 rounded-full mr-1"
              />
              <span className="text-gray-800 cursor-pointer hover:text-blue-600">
                채널 주인 2
              </span>
            </div>
            <button aria-label="Remove search item">✕</button>
          </li>
          <li className="flex justify-between items-center py-1.5 mb-1 group">
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <img
                src="/src/assets/images/Ellipse 25.png"
                alt="프로필"
                className="w-8 h-8 rounded-full mr-1"
              />
              <span className="text-gray-800 cursor-pointer hover:text-blue-600">
                채널 주인 3
              </span>
            </div>
            <button aria-label="Remove search item">✕</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchPanel;
