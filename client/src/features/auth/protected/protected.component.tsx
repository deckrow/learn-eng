import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/store/store.hooks';
import { selectIsAuthenticated } from '../auth.slice';

type ProtectedProps = {
	children: JSX.Element;
};

const Protected: FC<ProtectedProps> = ({ children }) => {
	const location = useLocation();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	if (!isAuthenticated) {
		return (
			<Navigate
				to='/login'
				state={{ from: location }}
				replace
			/>
		);
	}

	return children;
};

export default Protected;
