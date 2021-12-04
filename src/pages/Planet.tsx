import {
	Box,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SpaceBody, { Body, isMainPlanet } from '../components/SpaceBody';

import NotFound from './NotFound';

const Planet = () => {
	const { id } = useParams();
	const [data, setData] = useState<Body | undefined>(undefined);
	const [moons, setMoons] = useState<Body[]>([]);

	const fetchPlanet = async () => {
		fetch(`https://api.le-systeme-solaire.net/rest/bodies/${id}`)
			.then(response => response.json())
			.then((response: Body) => setData(response));
	};

	const fetchMoons = async () => {
		fetch('https://api.le-systeme-solaire.net/rest/bodies')
			.then(response => response.json())
			.then(response => response.bodies)
			.then((response: Body[]) =>
				setMoons(response.filter(a => a.aroundPlanet?.planet === id))
			);
	};

	useEffect(() => {
		fetchPlanet();
		fetchMoons();
	}, []);

	return (
		<>
			{!data?.isPlanet && <NotFound />}
			{data?.isPlanet && (
				<>
					<Typography variant="h4">{data?.englishName}</Typography>
					<Box sx={{ display: 'flex', width: 'auto', gap: 3 }}>
						<TableContainer sx={{ width: 'auto' }} component={Paper}>
							<Table aria-label="simple table">
								<TableBody>
									<TableRow>
										<TableCell sx={{ fontWeight: 'bold' }}>
											Sideral orbit
										</TableCell>
										<TableCell>{`${data?.sideralOrbit} earth days`}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell sx={{ fontWeight: 'bold' }}>Mass</TableCell>
										<TableCell>{`${data?.mass?.massValue} 10^${data?.mass?.massExponent} kg`}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell sx={{ fontWeight: 'bold' }}>Volume</TableCell>
										<TableCell>{`${data?.vol?.volValue} 10^${data?.vol?.volExponent} km^3`}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell sx={{ fontWeight: 'bold' }}>
											Average temperature
										</TableCell>
										<TableCell>{`${data?.avgTemp} K`}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell sx={{ fontWeight: 'bold' }}>
											Mean radius
										</TableCell>
										<TableCell>{`${data?.meanRadius} km`}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell sx={{ fontWeight: 'bold' }}>
											Equatorial radius
										</TableCell>
										<TableCell>{`${data?.equaRadius} km`}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
						<img
							src={
								isMainPlanet(data.englishName)
									? `/images/${data.englishName}.png`
									: `/images/Dwarf.png`
							}
							alt={data.englishName}
							style={{
								borderRadius: 20,
								padding: '1',
								height: '12em',
								width: '12em'
							}}
						/>
					</Box>
					<Typography variant="h5" sx={{ pt: 5 }}>
						Moons:
					</Typography>
					{!data.moons?.length && <Typography>Planet has no moons</Typography>}
					<Grid container spacing={2}>
						{moons.map(p => (
							<Grid key={p.id} item xs={12} sm={6} md={4}>
								<SpaceBody body={p} />
							</Grid>
						))}
					</Grid>
				</>
			)}
		</>
	);
};

export default Planet;
