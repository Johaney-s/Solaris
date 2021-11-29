import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FC } from 'react';

import earthImage from '../images/Earth.png';

import InfoBox from './InfoBox';

type Props = {
	type: 'planet' | 'moon' | 'asteroid';
	name: string; // name or id ?
};

const SpaceBody: FC<Props> = ({ type, name }) => (
	<Card
		sx={{
			display: 'flex',
			flexDirection: 'column',
			width: '50%'
		}}
	>
		<CardContent>
			<Typography variant="h5" color="textSecondary">
				{name}
			</Typography>
			{/*<Typography>{type}</Typography>*/}
			<img
				src={earthImage}
				alt={name}
				style={{
					borderRadius: 20,
					padding: '1',
					width: '70%'
				}}
			/>
			<Grid container spacing={3}>
				{/*TODO: change values for actual ones from API*/}
				<Grid item xs={6}>
					<InfoBox value={365.26} unit="EY" caption="Year Length" />
				</Grid>
				<Grid item xs={6}>
					<InfoBox value={6378.14} unit="km" caption="Radius" />
				</Grid>
				<Grid item xs={6}>
					<InfoBox value={288} unit="K" caption="Mean Temperature" />
				</Grid>
				<Grid item xs={6}>
					<InfoBox value={10} unit="10n kg" caption="Mass" />
				</Grid>
			</Grid>
		</CardContent>
	</Card>
);

export default SpaceBody;
