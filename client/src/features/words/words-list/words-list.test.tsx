import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.utils';

import WordsList from './words-list.component';

import type { Word } from '../../../types/words/words.types';

const mockWords: Word[] = [
	{
		id: 1,
		word: 'some',
		wordTranslation: 'что-то',
		createdAt: new Date()
	}
];

describe('words-list component', () => {
	it('should render a single word "some"', () => {
		renderWithProviders(<WordsList words={mockWords} />);

		const wordElement = screen.getByText(/some/i);
		expect(wordElement).toBeInTheDocument();
	});

	it('should render "no words yet" if there are no words', () => {
		renderWithProviders(<WordsList words={[]} />);

		const noWordsElement = screen.getByText(/There are no words yet/i);
		expect(noWordsElement).toBeInTheDocument();
	});
});
