import reducer, {
	toggleWordDetail,
	toggleAddWord,
	initialState
} from './words.slice';

describe('words slice', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, { type: undefined })).toEqual(initialState);
	});

	it('should open a word detail sidebar by click', () => {
		expect(reducer(initialState, toggleWordDetail(true))).toEqual({
			...initialState,
			isWordDetailOpen: true
		});
	});
});
