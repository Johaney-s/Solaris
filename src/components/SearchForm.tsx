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
import { FormEvent, useEffect, useState } from 'react';

import SpaceBody, { Body } from '../components/SpaceBody';

const SearchForm = () => {
	const [params, setParams] = useState<string>('');
	const [query, setQuery] = useState<string>('');
	const [data, setData] = useState<Body>();
	const [error, setError] = useState<string>('');

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		setParams(query ? query : '');
	};

	const fetchById = async (id: string) => {
		fetch(`https://api.le-systeme-solaire.net/rest/bodies/${id}`)
			.then(response => response.json())
			.then((response: Body) => setData(response))
			.catch(error => setError(error));
	};

	useEffect(() => {
		setData(undefined);
		setError('');
		params && fetchById(params);
	}, [params]);

	useEffect(() => {
		console.log(data);
	}, [data]);

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
			{data ? (
				<Grid container justifyContent="center" spacing={2}>
					<Grid item xs={4}>
						<SpaceBody body={data} />
						<Tooltip title={data.isPlanet ? 'Cannot adopt planet' : ''}>
							<span>
								<Button disabled={data.isPlanet}>
									ADOPT {data.englishName}
								</Button>
							</span>
						</Tooltip>
					</Grid>
				</Grid>
			) : null}
			{error ? (
				<Typography variant="h5" align="center" color="#ff604f">
					Object with id {params} not found.
				</Typography>
			) : null}
		</>
	);
};

export default SearchForm;
