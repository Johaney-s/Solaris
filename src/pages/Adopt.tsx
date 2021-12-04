import { Typography } from '@mui/material';

import SearchForm from '../components/SearchForm';
import usePageTitle from '../hooks/usePageTitle';

type Props = {
	username?: string;
};

const Adopt = ({ username }: Props) => {
	usePageTitle('Adopt asteroid');
	return (
		<>
			<Typography variant="h4" align="center">
				Adopt an asteroid!
			</Typography>
			<SearchForm username={username} />
		</>
	);
};

export default Adopt;
