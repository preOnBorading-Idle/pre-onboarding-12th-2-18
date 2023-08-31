import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
//import { ROUTES } from './utils/constants/Routes';
import ROUTES from './utils/constants/Routes';
import './utils/styles/reset.scss';

const Layout = lazy(() => import('./components/Layout'));
const MainPage = lazy(() => import('./pages/MainPage'));
const LoadingPage = lazy(() => import('./components/Layout/Spinner'));
const IssuesListPage = lazy(() => import('./pages/IssueListPage'));
const IssuesDetailPage = lazy(() => import('./pages/IssueDetailPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
	return (
		<>
			<Layout>
				<Suspense fallback={<LoadingPage />}>
					<Routes>
						<Route path={ROUTES.MAIN}>
							<Route index element={<MainPage />} />
							<Route path={ROUTES.ISSUELIST} element={<IssuesListPage />} />
							<Route path={ROUTES.ISSUEDETAIL} element={<IssuesDetailPage />} />
							<Route path={ROUTES.ERROR} element={<ErrorPage />} />
							<Route path={ROUTES.NOTFOUND} element={<NotFoundPage />} />
						</Route>
					</Routes>
				</Suspense>
			</Layout>
		</>
	);
}

export default App;
