import { useEffect, RefObject } from 'react';

const useIntersectionObserver = (targetRef: RefObject<Element>, callback: () => void) => {
	useEffect(() => {
		const lastElement = targetRef.current;
		const observer = new IntersectionObserver(([entry]) => {
			const isIntersecting = entry.isIntersecting;
			if (isIntersecting) {
				callback();
			}
		});

		if (lastElement) {
			observer.observe(lastElement);
		}

		return () => {
			if (lastElement) {
				observer.unobserve(lastElement);
			}
		};
	}, [targetRef, callback]);
};

export default useIntersectionObserver;
