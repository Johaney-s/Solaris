import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import rocket from '../images/rocket.png';

const NotFound = () => {
	usePageTitle('Not found');

	return (
		<>
			<Typography variant="h1">404</Typography>
			<img
				src={rocket}
				alt="Explorer rocket"
				style={{
					borderRadius: 20,
					padding: '1',
					width: '30%',
					rotate: '30deg'
				}}
			/>
			<Typography variant="h5" marginTop="30px">
				You reached uncharted place of the Solar System!
			</Typography>
		</>
	);
};
export default NotFound;
