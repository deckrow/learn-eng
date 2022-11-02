import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWords } from '../../app/services/words/words.service';
import { RootState } from '../../app/store';
import { Word } from '../../types/words/words.types';

type WordsState = {
	words: Word[] | null;
	isWordDetailOpen: boolean;
	isAddWordOpen: boolean;
};

export const initialState: WordsState = {
	words: null,
	isWordDetailOpen: false,
	isAddWordOpen: false
};

const slice = createSlice({
	name: 'words',
	initialState,

	reducers: {
		toggleWordDetail: (state, action: PayloadAction<boolean>) => {
			state.isWordDetailOpen = action.payload;
		},
		toggleAddWord: (state, action: PayloadAction<boolean>) => {
			state.isAddWordOpen = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(getWords.matchFulfilled, (state, action) => {
			state.words = action.payload;
		});
	}
});

export const { toggleAddWord, toggleWordDetail } = slice.actions;
export default slice.reducer;

export const selectWords = (state: RootState) => state.words.words;
export const selectIsWordDetailOpen = (state: RootState) =>
	state.words.isWordDetailOpen;
