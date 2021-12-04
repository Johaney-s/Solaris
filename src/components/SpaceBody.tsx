import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import InfoBox from './InfoBox';

export type Body = {
	id: string;
	englishName: string;
	isPlanet: boolean;
	mass: {
		massValue: number;
		massExponent: number;
	};
	vol: {
		volValue: number;
		volExponent: number;
	};
	avgTemp: number;
	sideralOrbit: number;
	meanRadius: number;
	equaRadius: number;
	aroundPlanet: { planet: string; rel: string };
	moons: {
		moon: string;
	}[];
	discoveryDate: string;
	semimajorAxis: number;
	perihelion: number;
	aphelion: number;
	eccentricity: number;
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

export const isMainPlanet = (planetName: string) => mainPlanets.has(planetName);

const SpaceBody: FC<Props> = ({ body, children }) => (
	<Card
		sx={{
			display: 'flex',
			flexDirection: 'column',
			width: '100%'
		}}
	>
		<CardContent>
			<Typography
				variant="h5"
				color="textSecondary"
				sx={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				{body.englishName}
			</Typography>
			{/*<Typography>{type}</Typography>*/}
			<Box
				sx={{
					borderRadius: 20,
					padding: '1',
					display: 'flex',
					justifyContent: 'center',
					width: '100%'
				}}
			>
				<img
					src={
						body.isPlanet
							? isMainPlanet(body.englishName)
								? `/images/${body.englishName}.png`
								: `/images/Dwarf.png`
							: body.aroundPlanet
							? `/images/Moon.png`
							: body.id === 'soleil'
							? `/images/Sun.png`
							: body.englishName.toLowerCase().includes('comet')
							? `/images/Comet.png`
							: `/images/Asteroid${(body.id.length % 5) + 1}.png`
					}
					alt={body.englishName}
					style={{
						borderRadius: 20,
						padding: '1',
						// // margin: '1'
						width: '80%'
					}}
				/>
			</Box>
			<Grid container spacing={3} sx={{ pb: 2 }}>
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
					{body.isPlanet ? (
						<InfoBox value={body.moons?.length ?? 0} unit="" caption="Moons" />
					) : (
						<InfoBox
							value={
								body.discoveryDate?.length >= 4
									? Number(
											body.discoveryDate?.substring(
												body.discoveryDate.length - 4
											)
									  )
									: undefined
							}
							unit=""
							caption="Discovery Year"
						/>
					)}
				</Grid>
				<Grid item xs={6}>
					<InfoBox
						value={body.mass ? Math.round(body.mass.massValue) : undefined}
						unit={body.mass ? `10^${body.mass.massExponent} kg` : undefined}
						caption="Mass"
					/>
				</Grid>
			</Grid>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				{body.isPlanet && (
					<Button
						variant="contained"
						component={Link}
						to={`/explore/${body.id}`}
						sx={{
							display: 'flex',
							justifyContent: 'center'
						}}
					>
						DETAIL
					</Button>
				)}
				{children}
			</Box>
		</CardContent>
	</Card>
);

export default SpaceBody;
