import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoadingSpinner from './components/loading/Loading';

import ROUTES from './utils/constants/Routes';

const MainPage = lazy(() => import('./pages/MainPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const IssueList = lazy(() => import('./pages/IssueListPage'));
const IssueDetail = lazy(() => import('./pages/IssueDetailPage'));

function App() {
	return (
		<>
			<Suspense fallback={<LoadingSpinner />}>
				<Routes>
					<Route path={ROUTES.MAIN} element={<MainPage />} />
					<Route path={ROUTES.ISSUELIST} element={<IssueList />} />
					<Route path={`${ROUTES.ISSUEDETAIL}:number`} element={<IssueDetail />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
