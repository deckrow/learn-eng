import styled from 'styled-components';
import { ReactComponent as SvgIcon } from '../../../assets/close-icon.svg';

export const CloseIcon = styled(SvgIcon)`
	position: absolute;
	right: 10px;
	top: 10px;
	display: none;
	cursor: pointer;
`;

export const WordContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	padding: 10px 0;
	border-bottom: 1px solid;

	p {
		font-size: 18px;
		font-weight: 600;
		cursor: pointer;
	}

	&:hover {
		${CloseIcon} {
			display: block;
		}
	}
`;
