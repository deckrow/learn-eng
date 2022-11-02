import styled from 'styled-components';
import { WordDetailContainer } from '../../features/words/word-detail/word-detail.styles';
import { WordsListContainer } from '../../features/words/words-list/words-list.styles';

type ContainerProps = {
	full: boolean;
};

export const WordsContainer = styled.div<ContainerProps>`
	display: flex;
	justify-content: center;

	${WordsListContainer} {
		width: ${({ full }) => (full ? '100%' : '40%')};
	}

	${WordDetailContainer} {
		width: 60%;
		display: ${({ full }) => full && 'none'};
	}
`;
