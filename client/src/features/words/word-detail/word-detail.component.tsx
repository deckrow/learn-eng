import { FC } from 'react';
import { useAppDispatch } from '../../../hooks/store/store.hooks';
import { toggleWordDetail } from '../words.slice';

import { WordDetailContainer } from './word-detail.styles';

export const WordDetail: FC = () => {
	const dispatch = useAppDispatch();

	return (
		<WordDetailContainer>
			<span onClick={() => dispatch(toggleWordDetail(false))}>x</span>
			some word
		</WordDetailContainer>
	);
};

export default WordDetail;
