import { Button, Link } from '@mui/material';
import { Box } from '@mui/system';

const NotFound = () => {
	<Box>
		You are lost! Go back to
		<Button component={Link}>HOME</Button> planet and try again.
		<img
			src="images/Asteroid3.png"
			alt="Solar System"
			style={{
				borderRadius: 20,
				padding: '1',
				width: '100%'
			}}
		/>
		;
	</Box>;
};
export default NotFound;
