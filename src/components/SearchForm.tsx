import { onSnapshot, setDoc } from '@firebase/firestore';
import { Search } from '@mui/icons-material';
import {
	Box,
	Button,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Tooltip,
	Typography
} from '@mui/material';
import { addDoc } from 'firebase/firestore';
import { FormEvent, useEffect, useState } from 'react';

import SpaceBody, { Body } from '../components/SpaceBody';
import {
	tokensDocument,
	UserAdoptions,
	userAdoptionsCollection,
	userTokensCollection
} from '../utils/firebase';

type Props = {
	username?: string;
};

const SearchForm = ({ username }: Props) => {
	const [params, setParams] = useState<string>('');
	const [query, setQuery] = useState<string>('');
	const [data, setData] = useState<Body[]>();
	const [error, setError] = useState<string>('');
	const [adoptions, setAdoptions] = useState<UserAdoptions[]>();
	const [userTokens, setUserTokens] = useState<number>(0);
	const [notification, setNotification] = useState<string>('');

	/* Update adoptions regularly */
	useEffect(() => {
		const unsubscribe = onSnapshot(userAdoptionsCollection, snapshot => {
			setAdoptions(snapshot.docs.map(doc => doc.data()));
		});
		return () => {
			unsubscribe();
		};
	}, []);

	/* Update user tokens */
	useEffect(() => {
		const unsubscribe = onSnapshot(userTokensCollection, snapshot => {
			setUserTokens(
				snapshot.docs
					.map(doc => doc.data())
					.filter(a => a.user === username)
					.map(a => a.tokens)[0]
			);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		setData(undefined);
		setError('');
		setNotification('');
		params && fetchById(params);
	}, [params]);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		setParams(query ? query : '');
	};

	const fetchById = async (id: string) => {
		fetch(
			`https://api.le-systeme-solaire.net/rest/bodies?filter=englishName,cs,${id}`
		)
			.then(response => response.json())
			.then(response => response.bodies)
			.then((response: Body[]) =>
				setData(response.filter(a => !a.isPlanet && !a.aroundPlanet))
			)
			.catch(error => setError(error));
	};

	const isAdopted = (id: string) =>
		adoptions ? adoptions.some(a => a.asteroid === id) : false;

	const adoptAsteroid = (id: string) => {
		addDoc(userAdoptionsCollection, {
			asteroid: id,
			user: username
		});
		setDoc(tokensDocument(username ? username : ''), {
			user: username,
			tokens: userTokens - 1
		});
		setNotification(
			`Successfuly adopted ${id}, ${userTokens - 1} tokens left.`
		);
	};

	return (
		<>
			<Box component="form" onSubmit={onSubmit} sx={{ width: '60%' }}>
				<TextField
					id="query"
					label="Search"
					variant="standard"
					value={query}
					onChange={e => setQuery(e.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton type="submit" size="large">
									<Search />
								</IconButton>
							</InputAdornment>
						),
						sx: { typography: 'h3' }
					}}
				/>
			</Box>
			{notification ? (
				<Typography variant="h5" align="center">
					{notification}
				</Typography>
			) : null}
			<Grid container spacing={2}>
				{data?.map(obj => (
					<Grid key={obj.englishName} item xs={4}>
						<SpaceBody body={obj} />
						<Tooltip
							title={
								(isAdopted(obj.id) && 'Already adopted') ||
								(!username && 'You need to be logged in') ||
								(userTokens === 0 && 'Out of tokens') ||
								''
							}
						>
							<span>
								<Button
									disabled={isAdopted(obj.id) || !username || userTokens === 0}
									onClick={() => adoptAsteroid(obj.id)}
								>
									ADOPT {obj.englishName}
								</Button>
							</span>
						</Tooltip>
					</Grid>
				))}
			</Grid>
			{error ? (
				<Typography variant="h5" align="center" color="#ff604f">
					Object with id {params} not found.
				</Typography>
			) : null}
		</>
	);
};

export default SearchForm;
