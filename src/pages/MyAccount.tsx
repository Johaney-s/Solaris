import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { onSnapshot } from '@firebase/firestore';
import { Link } from 'react-router-dom';

import SpaceBody from '../components/SpaceBody';
import {
	UserAdoptions,
	userAdoptionsCollection,
	userTokensCollection
} from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';
import UserBox from '../components/UserBox';
import useAsteroids from '../hooks/useAsteroids';
import usePageTitle from '../hooks/usePageTitle';

const MyAccount = () => {
	usePageTitle('My account');

	const user = useLoggedInUser();
	const data = useAsteroids();
	const [userTokens, setUserTokens] = useState<number>(0);
	const [adoptions, setAdoptions] = useState<UserAdoptions[]>();

	useEffect(() => {
		const unsubscribe = onSnapshot(userTokensCollection, snapshot =>
			setUserTokens(
				snapshot.docs
					.map(doc => doc.data())
					.filter(a => a.user === user?.email)
					.map(a => a.tokens)[0]
			)
		);
		return () => {
			unsubscribe();
		};
	}, [adoptions]);

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
		if (!data || !adoptions) return undefined;
		adoptions
			?.filter(adoption => adoption.user === user?.email)
			.forEach(adoption =>
				cards.push(
					<Grid item key={adoption.asteroid} xs={12} sm={6}>
						<SpaceBody
							body={
								data?.filter(asteroid => asteroid.id === adoption.asteroid)[0]
							}
						/>
					</Grid>
				)
			);
		return cards;
	};

	return (
		<>
			<Box sx={{ width: 'fit-content' }}>
				<UserBox
					username={user?.email ?? ''}
					direction={undefined}
					tokens={userTokens}
				/>
			</Box>
			<Typography variant="h4" sx={{ pt: 5 }}>
				My asteroids:
			</Typography>
			{!adoptions?.filter(adoption => adoption.user === user?.email).length && (
				<>
					<Typography>You have 0 adopted asteroids.</Typography>
					<Button component={Link} to="/adopt" variant="contained">
						LET&apos;S ADOPT!
					</Button>
				</>
			)}
			<Grid container spacing={2}>
				{renderCards()}
			</Grid>
		</>
	);
};

export default MyAccount;
