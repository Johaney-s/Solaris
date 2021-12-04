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

import useAsteroids from '../hooks/useAsteroids';
import {
	tokensDocument,
	UserAdoptions,
	userAdoptionsCollection,
	userTokensCollection
} from '../utils/firebase';

import SpaceBody, { Body } from './SpaceBody';

type Props = {
	username?: string;
};

const SearchForm = ({ username }: Props) => {
	const data = useAsteroids();
	const [params, setParams] = useState<string>('');
	const [query, setQuery] = useState<string>('');
	const [adoptions, setAdoptions] = useState<UserAdoptions[]>();
	const [userTokens, setUserTokens] = useState<number>(0);
	const [notification, setNotification] = useState<string>('');
	const [results, setResults] = useState<Body[]>();

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
		setResults(
			data
				? data.filter(a =>
						a.englishName.toLowerCase().includes(params.toLowerCase())
				  )
				: undefined
		);
	}, [params, data]);

	useEffect(() => {
		setNotification(
			results?.length === 0 && params ? 'No asteroid found.' : ''
		);
	}, [results]);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		setParams(query ? query : '');
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
		scrollTo(0, 0);
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
				{results?.map(obj => (
					<Grid key={obj.englishName} item xs={12} sm={6} md={4}>
						<SpaceBody body={obj}>
							<Tooltip
								title={
									(isAdopted(obj.id) && 'Already adopted') ||
									(!username && 'You need to be logged in') ||
									(userTokens === 0 && 'Out of tokens') ||
									''
								}
							>
								<span style={{ display: 'flex' }}>
									<Button
										variant="outlined"
										sx={{
											alignSelf: 'center',
											marginLeft: 'auto',
											marginRight: 'auto',
											marginTop: '4px'
										}}
										disabled={
											isAdopted(obj.id) || !username || userTokens === 0
										}
										onClick={() => adoptAsteroid(obj.id)}
									>
										ADOPT {obj.englishName}
									</Button>
								</span>
							</Tooltip>
						</SpaceBody>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default SearchForm;
