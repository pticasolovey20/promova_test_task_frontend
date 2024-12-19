import qs from 'qs';
import { FC, Fragment } from 'react';
import { draftMode } from 'next/headers';

import { fetchPost } from '@/API/postsAPI';
import { classNames } from '@/utils/classNames';

import PostDetails from '@/components/posts/PostDetails';

const getPost = async (slug: string, mode: 'draft' | undefined) => {
	try {
		const query = qs.stringify({
			...(mode && { status: mode }),

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
	const { isEnabled } = draftMode();
	const mode = isEnabled ? 'draft' : undefined;

	const postData = await getPost(params.slug, mode);

	return (
		<Fragment>
			<section className={classNames('max-w-screen-xl w-full mx-auto', isEnabled ? 'mt-[60px]' : '')}>
				<PostDetails isDraftModeEnabled={isEnabled} postData={postData} />
			</section>
		</Fragment>
	);
};

export const revalidate = 60;

export default PostDetailsPage;
