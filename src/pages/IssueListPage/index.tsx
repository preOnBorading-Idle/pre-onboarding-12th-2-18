import { useEffect, useState, useRef, Fragment } from 'react';
import { getIssueList } from '../../api/IssueApi';
import { IssueListType } from '../../utils/types/issueList.interface';
import LoadingSpinner from '../../components/loading/Loading';
import IssueItem from '../../components/issueItem/IssueItem';
import AdBanner from '../../components/AdBanner/AdBanner';
import useIntersectionObserver from '../../utils/useIntersectionObserver';

function IssueList() {
	const [issues, setIssues] = useState<IssueListType[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const observerRef = useRef<any>(null);

	useEffect(() => {
		setIsLoading(true);
		getIssueList(currentPage)
			.then((issues: any) => {
				setIssues(prevList => [...prevList, ...issues]);
				setIsLoading(false);
			})
			.catch(error => {
				console.error(error);
			});
	}, [currentPage]);

	useIntersectionObserver(observerRef, () => {
		setCurrentPage(currentPage + 1);
	});

	if (isLoading) return <LoadingSpinner />;

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
