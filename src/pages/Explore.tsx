import { Grid } from '@mui/material';

import SpaceBody from '../components/SpaceBody';

const Explore = () => (
	<Grid container spacing={2}>
		<Grid item xs={4}>
			<SpaceBody type="planet" name="Earth" />
		</Grid>
		<Grid item xs={4}>
			<SpaceBody type="planet" name="Earth" />
		</Grid>
		<Grid item xs={4}>
			<SpaceBody type="planet" name="Earth" />
		</Grid>
		<Grid item xs={4}>
			<SpaceBody type="planet" name="Earth" />
		</Grid>
		<Grid item xs={4}>
			<SpaceBody type="planet" name="Earth" />
		</Grid>
		<Grid item xs={4}>
			<SpaceBody type="planet" name="Earth" />
		</Grid>
	</Grid>
);

export default Explore;
