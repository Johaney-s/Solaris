import { onSnapshot } from '@firebase/firestore';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import SpaceBody from '../components/SpaceBody';
import UserBox from '../components/UserBox';
import useAsteroids from '../hooks/useAsteroids';
import usePageTitle from '../hooks/usePageTitle';
import { UserAdoptions, userAdoptionsCollection } from '../utils/firebase';

const Adopted = () => {
	usePageTitle('Adopted asteroids');

	const data = useAsteroids();
	const [adoptions, setAdoptions] = useState<UserAdoptions[]>();

	useEffect(() => {
		const unsubscribe = onSnapshot(userAdoptionsCollection, snapshot => {
			setAdoptions(snapshot.docs.map(doc => doc.data()));
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const renderCards = () => {
		const cards: JSX.Element[] = [];
		for (let i = 0; i < (adoptions ? adoptions.length : 0); i++) {
			if (!data || !adoptions) return undefined;
			cards.push(
				<Grid item key={`body${i}`} xs={4}>
					<SpaceBody
						body={data?.filter(a => a.id === adoptions[i].asteroid)[0]}
					/>
				</Grid>
			);
			cards.push(
				<Grid item key={`owners${i}`} xs={4}>
					<Card
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							background: 'transparent'
						}}
					>
						<CardContent>
							<UserBox
								username={adoptions[i].user.split('@')[0]}
								direction="left"
							/>
							{i + 1 < adoptions.length && (
								<UserBox
									username={adoptions[i + 1].user.split('@')[0]}
									direction="right"
								/>
							)}
						</CardContent>
					</Card>
				</Grid>
			);

			i++;
			{
				i < adoptions.length &&
					cards.push(
						<Grid item key={`body${i}`} xs={4}>
							<SpaceBody
								body={data?.filter(a => a.id === adoptions[i].asteroid)[0]}
							/>
						</Grid>
					);
			}
		}
		return cards;
	};

	return (
		<>
			<Typography variant="h4" align="center">
				These asteroids are already adopted.
			</Typography>
			<Grid container spacing={2}>
				{renderCards()}
			</Grid>
		</>
	);
};

export default Adopted;
