import PostInteraction from '../channel/PostInteraction';
import PostButton from './PostButton';
interface PostProps {
  post: {
    _id: string;
    title: string;
    createdAt: string;
    likes: any[];
    comments: any[];
    author: {
      fullName: string;
    };
    image: string;
  };
}

export default function PoPr({ post }: PostProps) {
  const parsedTitle = JSON.parse(post.title);
  return (
    <>
      <PostInteraction likes={post.likes} comments={post.comments} />
      <PostButton />
    </>
  );
}
