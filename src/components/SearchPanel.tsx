import React, { useEffect } from 'react' // Import React
import { useState } from 'react'
import profile from '../assets/images/profile.svg'
// import { useAuthStore } from "../stores/authStore";
import { axiosInstance } from '../api/axios'
import { useNavigate } from 'react-router-dom'

interface SearchPanelProps {
  onClose: () => void
}

interface User {
  _id: string
  image: string
  fullName: string
  followers: string[]
  isOnline: boolean
}

function SearchPanel({ onClose }: SearchPanelProps): React.ReactElement {
  const [users, setUsers] = useState<User[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchType, setSearchType] = useState<'user' | 'post'>('user')
  const [recentSearches, setRecentSearches] = useState<User[]>([])
  const navigate = useNavigate()

  // 사용자 목록 불러오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get('/users/get-users')
        setUsers(res.data)
      } catch (err) {
        console.error('사용자 목록을 가져오는 데 실패했습니다:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // 실시간 검색 필터링
  useEffect(() => {
    if (searchInput.trim() === '') {
      setFilteredUsers([]) // 검색어 없으면 결과 없도록
      return
    }
    const filtered = users.filter((user) =>
      user.fullName.toLowerCase().includes(searchInput.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchInput, users])

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = () => {
    console.log('검색 실행:', searchInput)
  }

  const handleUserClick = (user: User) => {
    // 프로필 이동 & 최근 검색 기록 업뎃
    navigate(`/profile/${user._id}`)
    setRecentSearches((prev) => {
      const filtered = prev.filter((u) => u._id !== user._id)
      return [user, ...filtered].slice(0, 5) //최대 5개
    })
  }

  const handleDeleteRecent = (userId: string) => {
    setRecentSearches((prev) => prev.filter((user) => user._id !== userId))
  }

  if (loading) {
    return <p>로딩 중...</p>
  }

  {
    !loading && searchInput.trim() !== '' && (
      <ul>
        {filteredUsers.length === 0 && <li>검색 결과가 없습니다.</li>}
        {filteredUsers.map((user) => (
          <li
            key={user._id}
            onClick={() => handleUserClick(user)}
            style={{ cursor: 'pointer' }}
          >
            {user.fullName}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      className="px-4 flex flex-col text-sm bg-white rounded-lg shadow-md h-full w-90"
      style={{ boxShadow: '4px 0 6px rgba(0, 0, 0, 0.15)' }}
    >
      <div className="flex justify-between items-center pt-4">
        {' '}
        <h2 className="text-2xl font-semibold flex-shrink-0 mr-28.5"> 검색</h2>
        <div className="flex space-x-4 flex-grow justify-end">
          {' '}
          <label className="flex items-right cursor-pointer text-sm">
            <input
              type="radio"
              name="searchType"
              value="post"
              checked={searchType === 'post'}
              onChange={() => setSearchType('post')}
              className="mr-1 accent-blue-500"
            />
            게시글
          </label>
          <label className="flex items-right cursor-pointer text-sm">
            <input
              type="radio"
              name="searchType"
              value="user"
              checked={searchType === 'user'}
              onChange={() => setSearchType('user')}
              className="mr-1 accent-blue-500"
            />
            사용자
          </label>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-sm flex-shrink-0 ml-3 mb-10" // 너비 줄어들지 않게, 왼쪽 마진 추가
          aria-label="Close search panel"
        >
          ✕
        </button>
      </div>{' '}
      <div className="relative mb-4 flex justify-end">
        <select
          className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none"
          style={{
            borderColor: 'var(--color-main-skyBlue-hover)',
            boxShadow: '0 0 0 1px var(--color-lightGray-focus)', // ring 대체
            appearance: 'none',
          }}
          defaultValue=""
        >
          <option value="" disabled>
            채널 선택
          </option>

          <option value="channel_id_1">채널 1</option>
          <option value="channel_id_2">채널 2</option>
          <option value="channel_id_3">채널 3</option>
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
      {/* 검색 입력창 */}
      <div className="relative mb-4">
        {' '}
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
        />
      </div>
      <div className="flex-grow overflow-y-auto border-t border-gray-200 pt-3 pb-4">
        {/* 검색 결과 */}
        <div className="flex-grow overflow-y-auto pb-4">
          {loading ? (
            <p className="text-center text-gray-500">로딩 중...</p>
          ) : searchType === 'user' ? (
            <>
              <h3 className="text-base font-bold mb-2 text-black-700">
                검색 결과
              </h3>
              {filteredUsers.length > 0 ? (
                <ul>
                  {filteredUsers.map((user) => (
                    <li
                      key={user._id}
                      className="flex justify-between items-center py-1.5 mb-1 group cursor-pointer"
                      onClick={() => handleUserClick(user)}
                    >
                      <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                        <img
                          src={user.image || profile}
                          alt="프로필"
                          className="w-8 h-8 rounded-full mr-1 object-cover"
                        />
                        <span className="text-gray-800">{user.fullName}</span>
                      </div>
                      {/* 즐겨찾기 또는 삭제 버튼 등 옵션 가능 */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 text-center">
                  일치하는 사용자가 없습니다.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-500">
              게시글 검색은 아직 구현되지 않았습니다.
            </p>
          )}
        </div>

        {recentSearches.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">최근 검색 항목</h4>
            <ul>
              {recentSearches.map((user) => (
                <li
                  key={user._id}
                  className="flex justify-between items-center py-1.5 mb-1 group cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                    <img
                      src={user.image || profile}
                      alt="프로필"
                      className="w-8 h-8 rounded-full mr-1 object-cover"
                    />
                    <span className="text-gray-800">{user.fullName}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteRecent(user._id)
                    }}
                    className="text-gray-400 hover:text-red-500 text-sm"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPanel
