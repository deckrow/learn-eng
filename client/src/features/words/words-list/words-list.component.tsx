import { FC } from 'react';
import type { Word } from '../../../types/words/words.types';

import WordsListItem from '../words-list-item/words-list-item.component';
import { WordsListContainer } from './words-list.styles';

type WordsListProps = {
	words: Word[];
};

const WordsList: FC<WordsListProps> = ({ words }) => {
	if (words.length === 0) return <p>There are no words yet</p>;

	return (
		<WordsListContainer>
			<h1>Your words</h1>

			{words.map(({ id, word }) => (
				<WordsListItem word={word} key={id} />
			))}
		</WordsListContainer>
	);
};

export default WordsList;
