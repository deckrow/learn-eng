import { api } from '../api/api.service';

import type { Word, AppWord } from '../../../types/words/words.types';
import type { Response } from '../../../types/response/response.types';

type WordsResponse = Response<{ docs: Word[] }>;
type AddWordResponse = Response<{ doc: Word }>;

export const wordsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getWords: builder.query<Word[], void>({
			query: () => '/words',

			// call that will executes by such tags
			providesTags: ['Words'],

			transformResponse: (response: WordsResponse) => {
				return response.data.docs.sort((a, b) => {
					return (
						new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
					);
				});
			}
		}),
		addNewWord: builder.mutation<Word, AppWord>({
			query: (word) => ({
				url: '/words',
				method: 'post',
				body: word
			}),

			// call that will triger such tags
			invalidatesTags: ['Words'],

			transformResponse: (response: AddWordResponse) => {
				return response.data.doc;
			}
		})
	})
});

export const { useGetWordsQuery, useAddNewWordMutation } = wordsApi;

export const {
	endpoints: { getWords, addNewWord }
} = wordsApi;
