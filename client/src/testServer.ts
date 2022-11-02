import { rest } from 'msw';
import { setupServer } from 'msw/node';

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get('/api/v1/users/login', (req, res, ctx) => {
    return res(
			ctx.json({
				token: '12345',
				status: 'success',
				data: {
					user: {
						_id: 1,
						name: 'admin',
						email: 'admin@gmail.com'
					}
				}
			}),
			ctx.delay(150)
		);
  }),
	rest.get('/api/v1/words', (req, res, ctx) => {
    return res(
			ctx.json({
				status: 'success',
				data: {
					docs: [
						{
							id: 1,
							createdAt: new Date(),
							word: 'word',
							wordTranslation: 'слово'
						}
					]
				}
			}),
			ctx.delay(150)
		);
  }),
	rest.post('/api/v1/words', (req, res, ctx) => {
    return res(
			ctx.json({
				status: 'success',
				data: {
					docs: [
						{
							id: 1,
							createdAt: new Date(),
							word: 'word',
							wordTranslation: 'слово'
						}
					]
				}
			}),
			ctx.delay(150)
		);
  })
];

export const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
