import Typography from '@mui/material/Typography';
import { Box, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

import solarSystemClipart from '../solar-system-clipart-md.png';
import { userAdoptionsCollection } from '../utils/firebase';

const Home = () => {
	const [adoptionsCounter, setAdoptionsCounter] = useState<number>(0);

	useEffect(() => {
		const unsubscribe = onSnapshot(userAdoptionsCollection, snapshot => {
			setAdoptionsCounter(snapshot.docs.length);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				width: '160%'
			}}
		>
			<Card
				style={{
					borderRight: '0.1em solid white',
					width: '100%',
					height: '100%',
					borderRadius: 0
				}}
			>
				<CardContent>
					<Typography variant="h3" align="center">
						Save the Universe!
					</Typography>
					<Typography variant="body1" mt={5} mb={3}>
						The amount of pollution around our planet is becoming a huge
						problem. Help us save the Universe and adopt your asteroid today!
						The money will be used to build cleaning station on Earth&apos;s
						orbit.
					</Typography>
					<Typography variant="body1" mt={5} mb={3}>
						Join us in making bright future for the next generations and look
						upon the sky to see the stars again. So, what are you waiting for?
					</Typography>
					<Typography variant="h6" mt={4} mb={3}>
						{`There are currently ${adoptionsCounter} asteroids adopted!`}
					</Typography>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button
							component={Link}
							to="/adopt"
							variant="contained"
							sx={{
								alignSelf: 'center',
								marginLeft: 'auto',
								marginRight: 'auto'
							}}
						>
							LET&apos;S ADOPT!
						</Button>
					</div>
				</CardContent>
			</Card>
			<Card
				style={{
					width: '100%'
				}}
			>
				<CardContent>
					<img
						src={solarSystemClipart}
						alt="Solar System"
						style={{
							borderRadius: 20,
							padding: '1',
							width: '100%'
						}}
					/>
					<Typography variant="h5" mt={1}>
						Explore the Solar System
					</Typography>
					<Typography variant="body1" mt={3} mb={3}>
						Check out information about objects in the Solar system and learn
						more about our neighbours!
					</Typography>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button
							component={Link}
							to="/explore"
							variant="outlined"
							sx={{
								alignSelf: 'center',
								marginLeft: 'auto',
								marginRight: 'auto'
							}}
						>
							EXPLORE NOW!
						</Button>
					</div>
				</CardContent>
			</Card>
		</Box>
	);
};

export default Home;
