import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SpaceBody, { Body } from '../components/SpaceBody';

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
			<Typography variant="h4">{data?.englishName}</Typography>
			<Grid container spacing={2}>
				{moons.map(p => (
					<Grid key={p.id} item xs={4}>
						<SpaceBody body={p} />
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default Planet;
