import { FC, lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAppDispatch } from './hooks/store/store.hooks';
import { loginFromStorage } from './features/auth/auth.slice';

import { GlobalStyles } from './global.styles';
import Header from './components/header/header.component';

const Protected = lazy(() => import('./features/auth/protected/protected.component'));
const Login = lazy(() => import('./routes/login/login.component'));
const Words = lazy(() => import('./routes/words/words.component'));
const AddWord = lazy(() => import('./routes/add-word/add-word.component'));

const App: FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loginFromStorage());
	}, []);

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<GlobalStyles />

			<Routes>
				<Route path='/' element={<Header />}>
					<Route index element={<Words />} />
					<Route path='login' element={<Login />} />

					<Route
						path='add-word'
						element={
							<Protected>
								<AddWord />
							</Protected>
						}
					/>
				</Route>
			</Routes>
		</Suspense>
	);
};

export default App;
