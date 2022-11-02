import { FC } from 'react';
import { useAppSelector } from '../../hooks/store/store.hooks';
import { useGetWordsQuery } from '../../app/services/words/words.service';
import { selectIsWordDetailOpen } from '../../features/words/words.slice';

import WordDetail from '../../features/words/word-detail/word-detail.component';
import WordsList from '../../features/words/words-list/words-list.component';

import { WordsContainer } from './words.styles';

const Words: FC = () => {
  const { data: words = [], isLoading } = useGetWordsQuery();
	const isOpen = useAppSelector(selectIsWordDetailOpen);

	if (isLoading) {
		return <p>Loading...</p>
	}

  return (
		<WordsContainer full={!isOpen}>
			<WordsList words={words} />

			<WordDetail />
		</WordsContainer>
  );
};

export default Words;
