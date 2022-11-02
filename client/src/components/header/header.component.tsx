import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { logout } from '../../features/auth/auth.slice';
import { useAppDispatch } from '../../hooks/store/store.hooks';

import { HeaderContainer, MainContainer, NavLink } from './header.styles';

const Header: FC = () => {
	const dispatch = useAppDispatch();

	return (
		<>
			<HeaderContainer>
				<NavLink to='/add-word'>Add a new word</NavLink>

				<NavLink to='/'>Learn eng words</NavLink>

				<button onClick={() => dispatch(logout())}>Log out</button>
			</HeaderContainer>

			<MainContainer>
				<Outlet />
			</MainContainer>
		</>
	);
};

export default Header;
