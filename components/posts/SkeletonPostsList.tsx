import { classNames } from '@/utils/classNames';

const SkeletonPostsList = () => {
	return (
		<div className='flex-1'>
			<ul className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'>
				{Array.from({ length: 6 }).map((_, index) => (
					<li key={index}>
						<div
							className={classNames(
								'relative flex flex-col aspect-square group',
								'rounded-xl shadow-md bg-gray-200 overflow-hidden',
								'transition-all duration-300 ease-in-out'
							)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SkeletonPostsList;
