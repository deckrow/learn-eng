// TODO use generics for data
export type Response<T> = {
  status: 'success' | 'fail';
  data: T;

	results?: number;
	token?: string;
};

export type ResponseError = {
  status: number;

  data: {
    status: 'error';
    message: string;
    stack: string;
    err: object;
  };
};
