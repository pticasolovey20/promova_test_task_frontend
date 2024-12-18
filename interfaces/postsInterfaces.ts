import { BlocksContent } from '@strapi/blocks-react-renderer';

export interface IPostData {
	id: number;
	documentId: string;
	title: string;
	description: string;
	slug: string;
	date: string;
	image: IPostImage;
	bodyContent: IPostBodyContent[];
}

export interface IPostImage {
	id: number;
	documentId: string;
	url: string;
	name: string;
	alternativeText: string | null;
	width: number;
	height: number;
	formats: {
		thumbnail: IPostImageFormat;
		medium: IPostImageFormat;
		small: IPostImageFormat;
		large: IPostImageFormat;
	};
}

export interface IPostImageFormat {
	width: number;
	height: number;
	url: string;
}

export interface IPostBodyContent {
	__component: string;
	id: number;
	content: BlocksContent;
	file: any[];
}

export interface IPaginationData {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}
