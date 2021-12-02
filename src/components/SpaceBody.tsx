import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { FC } from 'react';

import InfoBox from './InfoBox';

export type Body = {
	id: string;
	englishName: string;
	isPlanet: boolean;
	mass: {
		massValue: number;
		massExponent: number;
	};
	avgTemp: number;
	sideralOrbit: number;
	meanRadius: number;
	equaRadius: number;
	aroundPlanet: { planet: string; rel: string };
};

type Props = {
	body: Body;
};

const mainPlanets = new Set([
	'Venus',
	'Mercury',
	'Earth',
	'Mars',
	'Jupiter',
	'Saturn',
	'Uranus',
	'Neptune'
]);

const isMainPlanet = (planetName: string) => mainPlanets.has(planetName);

const SpaceBody: FC<Props> = ({ body }) => (
	<Card
		sx={{
			display: 'flex',
			flexDirection: 'column',
			width: '100%'
		}}
	>
		<CardContent>
			<Typography variant="h5" color="textSecondary">
				{body.englishName}
			</Typography>
			{/*<Typography>{type}</Typography>*/}
			<Box
				sx={{
					borderRadius: 20,
					padding: '1',
					width: '100%'
				}}
			>
				<img
					src={
						isMainPlanet(body.englishName)
							? `/images/${body.englishName}.png`
							: `/images/Dwarf.png`
					}
					alt={body.englishName}
					// height="auto"
					// height={300}
					// width="auto"
					// width={300}
					style={{
						borderRadius: 20,
						padding: '1',
						// // margin: '1'
						// width: '70%'
						// width: '350px',
						// width: 'auto',
						height: '12em',
						width: '12em',
						// height: '350px'
						// height: '150px',
						objectFit: 'cover'
					}}
				/>
			</Box>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<InfoBox
						value={Math.round(body.sideralOrbit)}
						unit="days"
						caption="Year Length"
					/>
				</Grid>
				<Grid item xs={6}>
					<InfoBox
						value={Math.round(
							body.equaRadius === 0 ? body.meanRadius : body.equaRadius
						)}
						unit="km"
						caption="Radius"
					/>
				</Grid>
				<Grid item xs={6}>
					<InfoBox value={body.avgTemp} unit="K" caption="Mean Temperature" />
				</Grid>
				<Grid item xs={6}>
					<InfoBox
						value={Math.round(body.mass.massValue)}
						unit={`10^${body.mass.massExponent} kg`}
						caption="Mass"
					/>
				</Grid>
			</Grid>
		</CardContent>
	</Card>
);

export default SpaceBody;
