export interface IRequest<Data> {
	success: number;
	data: Data;
	error: {} | [];
}
