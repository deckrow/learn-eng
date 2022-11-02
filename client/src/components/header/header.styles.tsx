import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
	padding: 0 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	min-height: 70px;
`;

export const MainContainer = styled.div`
	margin-top: 100px;
`;

export const NavLink = styled(Link)`
	text-decoration: none;
`;
