import { FC } from 'react';
import { useAppDispatch } from '../../../hooks/store/store.hooks';
import { toggleWordDetail } from '../words.slice';

import { WordContainer, CloseIcon } from './words-list-item.styles';

type WordsListItemProps = {
	word: string;
};

const WordsListItem: FC<WordsListItemProps> = ({ word }) => {
	const dispatch = useAppDispatch();

	return (
		<WordContainer>
			<p onClick={() => dispatch(toggleWordDetail(true))}>{word}</p>

			<CloseIcon />
		</WordContainer>
	);
};

export default WordsListItem;
