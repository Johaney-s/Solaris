import { Typography } from '@mui/material';

import SearchForm from '../components/SearchForm';

type Props = {
	username?: string;
};

const Adopt = ({ username }: Props) => (
	<>
		<Typography variant="h4" align="center">
			Adopt an asteroid!
		</Typography>
		<SearchForm username={username} />
	</>
);

export default Adopt;
