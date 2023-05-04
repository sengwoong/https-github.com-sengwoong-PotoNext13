
import { Comment, FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import userSWR from 'swr';

import PostUserAvatar from './PostUserAvatar';
import useFullPost from '@/components/hooks/post';
import useMe from '@/components/hooks/me';
import Avatar from '@/components/LoginInput/Avatar';
import ActionBar from '../PosrBar/ActionBar';
import CommentForm from '../Postcomment/CommentForm';

type Props = {
  post: SimplePost;
};
export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { post: data, postComment } = useFullPost(id);
  const { user } = useMe();
  const comments = data?.comments;
  const handlePostComment = (comment: Comment) => {
    user &&
      postComment(comment);
  };
  return (
    <section className='flex w-full h-full'>
      <div className='relative basis-3/5'>
        <Image
          className='object-cover'
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes='650px'
        />
      </div>
      <div className='w-full basis-2/5 flex flex-col'>
        <PostUserAvatar image={userImage} username={username} />
        <ul className='border-t border-gray-200 h-full overflow-y-auto p-4 mb-1'>
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li key={index} className='flex items-center mb-1'>
                  <Avatar
                    image={image}
                    size='small'
                    highlight={commentUsername === username}
                  />
                  <div className='ml-2'>
                    <span className='font-bold mr-1'>{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post}  onComment={postComment}/>
      
      </div>
    </section>
  );
}