import { Typography } from '@mui/material';

import SearchForm from '../components/SearchForm';

const Adopt = () => (
	<>
		<Typography variant="h4" align="center">
			Adopt an asteroid!
		</Typography>
		{/* <Typography variant="body1" mt={5} mb={3}>
			Adopt your asteroid now. Enter the indentifier or let us pick one for you.
		</Typography> */}
		<SearchForm />
	</>
);

export default Adopt;
