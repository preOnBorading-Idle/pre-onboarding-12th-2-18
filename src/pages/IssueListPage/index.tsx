import { useEffect, useState, useRef, Fragment } from 'react';
import { getIssueList } from '../../api/IssueApi';
import { IssueListType } from '../../utils/types/issueList.interface';
import LoadingSpinner from '../../components/loading/Loading';
import IssueItem from '../../components/issueItem/IssueItem';
import { useNavigate } from 'react-router-dom';
import AdBanner from '../../components/AdBanner/AdBanner';

function IssueList() {
	const [issues, setIssues] = useState<IssueListType[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isloading, setIsLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	const observerRef = useRef<any>(null);

	useEffect(() => {
		getIssueListData();
	}, []);

	const getIssueListData = async () => {
		setIsLoading(true);
		try {
			const res = await getIssueList(currentPage);
			// @ts-ignore
			setIssues(prevIssues => [...prevIssues, ...res]);
			setCurrentPage(prevPage => prevPage + 1);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					setCurrentPage(prev => prev + 1);
				}
			},
			{ threshold: 1 },
		);
		if (observerRef.current) {
			observer.observe(observerRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [issues]);

	if (isloading) return <LoadingSpinner />;

	return (
		<>
			<ul>
				{issues.map((item, index) => (
					<Fragment key={item.id}>
						<IssueItem item={item} />
						{(index + 1) % 4 === 0 && <AdBanner />}
					</Fragment>
				))}
			</ul>
			<div ref={observerRef}>
				<LoadingSpinner />
			</div>
		</>
	);
}

export default IssueList;
