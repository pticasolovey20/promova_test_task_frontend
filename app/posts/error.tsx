'use client';

import { FC, useEffect } from 'react';

import { BiMessageAltError } from 'react-icons/bi';

interface IPostDetailsErrorPage {
	error: Error & {
		digest?: string;
	};

	reset: () => void;
}

const PostDetailsErrorPage: FC<IPostDetailsErrorPage> = ({ error, reset }) => {
	useEffect(() => {
		console.log(error);
	}, [error]);

	const handleReset = () => reset();

	return (
		<section className='flex-1 flex flex-col items-center justify-center gap-4 p-4'>
			<div className='flex flex-col sm:flex-row items-center'>
				<BiMessageAltError size={120} color='#ff5555' />

				<div className='flex flex-col items-center sm:items-baseline'>
					<h2 className='text-center sm:text-start text-2xl sm:text-3xl font-semibold text-gray-600'>
						Something went wrong!
					</h2>

					<p className='text-center sm:text-start sm:text-lg text-gray-800'>Try again or contact the developer</p>

					<button onClick={handleReset} className='w-fit px-3 py-1 mt-2 rounded-md bg-[#ff5555] text-sm text-white'>
						Try again
					</button>
				</div>
			</div>
		</section>
	);
};

export default PostDetailsErrorPage;
