import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import SpaceBody, { Body } from '../components/SpaceBody';

const Explore = () => {
	const [data, setData] = useState<Body[]>([]);

	const fetchPlanets = async () => {
		fetch(
			'https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,neq,false&order=sideralOrbit,asc'
		)
			.then(response => response.json())
			.then(response => response.bodies)
			.then((response: Body[]) => setData(response));
	};

	useEffect(() => {
		fetchPlanets();
	}, []);

	return (
		<Grid container spacing={2}>
			{data.map(p => (
				<Grid key={p.englishName} item xs={4}>
					<SpaceBody body={p} />
				</Grid>
			))}
		</Grid>
	);
};

export default Explore;
