import { Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import SearchForm from '../components/SearchForm';

const Adopt = () => {
	const [params] = useSearchParams();
	const query = params.get('q');
	return (
		<>
			<Typography variant="h3" align="center">
				Adopt an asteroid!
			</Typography>
			<Typography variant="body1" mt={5} mb={3}>
				Adopt your asteroid now. Enter the indentifier or let us pick one for
				you.
			</Typography>
			<SearchForm />
			{/* {query && <SearchResults query={query} />} */}
		</>
	);
};

export default Adopt;
