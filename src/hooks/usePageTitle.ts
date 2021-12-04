import { useEffect } from 'react';

// from seminar
const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | Solaris`;
	}, [title]);
};

export default usePageTitle;
