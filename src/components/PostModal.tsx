import { useState } from 'react';
import profile from '../assets/images/profile.svg';
import bedIcon from '../assets/icons/bedIcon.svg';
import ImageSlider from './channel/ImageSlider';
import PostInteraction from './channel/PostInteraction';
import PostComments from './channel/PostComments';
import { axiosInstance } from '../api/axios';
import { toast } from 'react-toastify';

interface likesObj {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
}

interface PostType {
  likes: likesObj[];
  comments: any[];
  _id: string;
  title: string;
  image: string;
  createdAt: string;
  author: {
    _id: string;
    fullName: string;
    image: string;
  };
  channel: string;
  updatedAt: string;
}
interface likesObj {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
}

interface commentsObj {
  _id: string;
  comment: string;
  author: { fullname: string; image: string };
}
interface PostModalProps {
  post: PostType | null;
  onClose: () => void;
  user: {
    _id: string;
    fullName: string;
    image: string;
  };
}

interface ParsedTitle {
  uploadedImages: string[];
  writtenTitle: string;
  tags: string[];
  locations: string[];
  hotels: string[];
  cost: string;
  context: string;
  author?: any[];
}

export default function PostModal({ post, onClose, user }: PostModalProps) {
  if (!post) return null;
  const parsedTitle = JSON.parse(post.title) as ParsedTitle;
  const imageUrls: string[] = parsedTitle.uploadedImages ?? [];
  const [showBox, setShowBox] = useState(false);
  const toggleCommentBox = () => setShowBox((prev) => !prev);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((prev) => !prev);
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(parsedTitle);
  const [locationsInput, setLocationsInput] = useState(
    editableTitle.locations?.join(', ') || ''
  );
  const [hotelsInput, setHotelsInput] = useState(
    editableTitle.hotels?.join(', ') || ''
  );
  const [tagsInput, setTagsInput] = useState(
    editableTitle.tags?.join(', ') || ''
  );

  const handleDelete = async () => {
    try {
      await axiosInstance.delete('/posts/delete', {
        data: { id: post._id },
      });
      toast('게시글이 삭제되었습니다.');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('삭제 실패:', error);
      toast.error('삭제에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center pl-60 z-50">
      <div className="bg-white rounded-lg p-10 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-5 text-[var(--color-darkGray)] text-3xl font-bold cursor-pointer"
        >
          ×
        </button>
        {user._id === post.author._id && !isEditing && (
          <div className="absolute top-1 right-15">
            <button
              onClick={toggleMenu}
              className="text-[var(--color-darkGray)] text-3xl font-bold cursor-pointer"
            >
              ...
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md z-50 w-[120px]">
                <button
                  className="w-full px-4 py-2 hover:bg-gray-100 text-left text-sm cursor-pointer"
                  onClick={() => {
                    setShowMenu(false);
                    setIsEditing(true);
                    setEditableTitle(parsedTitle);
                  }}
                >
                  수정하기
                </button>
                <button
                  className="w-full px-4 py-2 hover:bg-gray-100 text-left text-sm cursor-pointer"
                  onClick={() => {
                    setShowMenu(false);
                    handleDelete();
                  }}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
        <div className="p-4 rounded-lg bg-white w-[50vw] h-100% px-[30px] mb-[30px]">
          <div className="flex justify-between mb-[10px]">
            <div className="flex items-center gap-0.2">
              <img
                src={user.image || profile}
                alt="user"
                className="w-[40px] h-[40px] rounded-full mr-3"
              />
              <div className="font-bold text-[18px]">{user.fullName}</div>
            </div>
            <div className="flex gap-3 h-[40px]">
              {isEditing ? (
                <input
                  className="w-full min-h-[20px] border rounded p-2 text-[15px]"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                />
              ) : (
                parsedTitle.tags?.map((tag: string, idx: number) => (
                  <div
                    key={idx}
                    className="bg-[#2A728C] text-white px-3 py-1 h-[25px] rounded-xl text-[13px] flex items-center"
                  >
                    {tag}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 이미지 슬라이더 삽입 */}
          {imageUrls.length > 0 && (
            <div className="flex justify-center mb-[10px]">
              <ImageSlider images={imageUrls} alt={parsedTitle.writtenTitle} />
            </div>
          )}

          <div className="flex flex-row gap-2">
            <div className="w-[50vw]">
              {/* 제목, 날짜 */}
              <div className="flex justify-between items-center">
                {isEditing ? (
                  <input
                    className="text-[30px] font-bold text-[var(--color-title)] mb-[20px] w-[90%] border"
                    value={editableTitle.writtenTitle}
                    onChange={(e) =>
                      setEditableTitle({
                        ...editableTitle,
                        writtenTitle: e.target.value,
                      })
                    }
                  />
                ) : (
                  <h2 className="text-[30px] font-bold text-[var(--color-title)] mb-[20px]">
                    {parsedTitle.writtenTitle}
                  </h2>
                )}
                <div className="flex justify-end text-[var(--color-subText)]">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* 장소, 비용 */}
              <div className="flex gap-3 text-[var(--color-subText)] mb-[10px] w-[100%] py-[5px]">
                {isEditing ? (
                  <input
                    className="w-full min-h-[50px] border rounded p-2 text-[15px]"
                    value={locationsInput}
                    onChange={(e) => setLocationsInput(e.target.value)}
                  />
                ) : (
                  <div className="flex gap-3 text-[15px]">
                    {parsedTitle.locations?.map((loc: string, idx: number) => (
                      <p key={idx}>{loc}</p>
                    ))}
                  </div>
                )}

                {isEditing ? (
                  <input
                    className="w-[90px] h-[50px] border rounded p-1 text-[13px] text-right"
                    type="number"
                    value={editableTitle.cost}
                    onChange={(e) =>
                      setEditableTitle({
                        ...editableTitle,
                        cost: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="ml-auto text-[12px]">
                    총 비용: {parsedTitle.cost} ₩
                  </div>
                )}
              </div>

              {/* 숙소 */}
              <div className="flex gap-3 text-[15px] ">
                {isEditing ? (
                  <input
                    className="w-full min-h-[50px] border rounded p-2 text-[15px]"
                    value={hotelsInput}
                    onChange={(e) => setHotelsInput(e.target.value)}
                  />
                ) : (
                  parsedTitle.hotels?.map((hotel: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <img src={bedIcon} alt="bed" className="mb-auto" />
                      <div className="mb-[10px] text-[var(--color-subText)] text-[15px]">
                        {hotel}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* 본문 */}
              <div className="min-h-[130px] overflow-auto border-t-2 border-[var(--color-lightGray)] py-3">
                {isEditing ? (
                  <textarea
                    className="w-full h-[200px] border rounded p-2 text-[15px]"
                    value={editableTitle.context}
                    onChange={(e) =>
                      setEditableTitle({
                        ...editableTitle,
                        context: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="text-[15px] whitespace-pre-line">
                    {parsedTitle.context}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 좋아요 & 댓글 */}
          {isEditing ? (
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={async () => {
                  try {
                    await axiosInstance.put(`/posts/update`, {
                      postId: post._id,
                      title: JSON.stringify({
                        ...editableTitle,
                        tags: tagsInput.split(',').map((s: string) => s.trim()),
                        locations: locationsInput
                          .split(',')
                          .map((s: string) => s.trim()),
                        hotels: hotelsInput
                          .split(',')
                          .map((s: string) => s.trim()),
                      }),
                      channelId: post.channel,
                    });
                    toast('게시글이 수정되었습니다.');
                    setIsEditing(false);
                    window.location.reload();
                  } catch (err) {
                    console.error(err);
                    toast.error('수정 실패');
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                저장
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditableTitle(parsedTitle);
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer"
              >
                취소
              </button>
            </div>
          ) : (
            <div className="w-100% border-[var(--color-black)] flex flex-col">
              <PostInteraction
                postId={post._id}
                likes={post.likes}
                comments={post.comments}
                postAuthorId={''}
              />
              {!showBox && (
                <div
                  className="text-[var(--color-subText)] cursor-pointer underline py-0.5 ml-[4px]"
                  onClick={toggleCommentBox}
                >
                  발자국 {post.comments.length}개 모두보기...
                </div>
              )}
              {showBox && (
                <PostComments postId={post._id} comments={post.comments} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
