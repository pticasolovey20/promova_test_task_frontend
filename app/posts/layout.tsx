import { ReactNode, FC } from 'react';

interface IPostsLayout {
	children: ReactNode;
}

const PostsLayout: FC<IPostsLayout> = ({ children }) => {
	return <main className='min-h-screen h-full w-full flex flex-col'>{children}</main>;
};

export default PostsLayout;
