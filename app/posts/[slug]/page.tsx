import qs from 'qs';
import { FC, Fragment } from 'react';
import { fetchPost } from '@/API/postsAPI';

import PostDetails from '@/components/posts/PostDetails';

const getPost = async (slug: string) => {
	try {
		const query = qs.stringify({
			filters: {
				slug,
			},

			populate: {
				image: {
					populate: true,
				},

				bodyContent: {
					on: {
						'shared.rich-text': {
							populate: true,
						},

						'shared.media': {
							populate: '*',
						},
					},
				},
			},
		});

		const { data } = await fetchPost(query);
		return data[0];
	} catch (error) {
		console.error('Error fetching post:', error);
		throw error;
	}
};

interface IPostDetailsPage {
	params: {
		slug: string;
	};
}

const PostDetailsPage: FC<IPostDetailsPage> = async ({ params }) => {
	const postData = await getPost(params.slug);

	return (
		<Fragment>
			<section className='max-w-screen-xl w-full mx-auto'>
				<PostDetails postData={postData} />
			</section>
		</Fragment>
	);
};

export const revalidate = 60;

export default PostDetailsPage;
