import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { addDoc } from '@firebase/firestore';

import { signIn, signUp, userTokensCollection } from '../utils/firebase';
import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';

const Login = () => {
	const navigate = useNavigate();
	usePageTitle('Login');

	const [isSignUp, setSignUp] = useState(false);

	const [email, usernameProps] = useField('email', true);
	const [password, passwordProps] = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

	const handleRegistration = async () => {
		await signUp(email, password);
		addDoc(userTokensCollection, {
			user: email,
			tokens: 2
		});
	};

	return (
		<Paper
			component="form"
			onSubmit={async (e: FormEvent) => {
				e.preventDefault();
				try {
					isSignUp ? await handleRegistration() : await signIn(email, password);
					navigate('/');
				} catch (err) {
					setSubmitError(
						(err as { message?: string })?.message ?? 'Unknown error occurred'
					);
				}
			}}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '80%',
				p: 4,
				gap: 2
			}}
		>
			<Typography variant="h4" component="h2" textAlign="center" mb={3}>
				Login
			</Typography>
			<Typography mb={-2}>EMAIL</Typography>
			<TextField {...usernameProps} type="email" />
			<Typography mb={-2} mt={2}>
				PASSWORD
			</Typography>
			<TextField {...passwordProps} type="password" />
			{submitError && (
				<Typography
					variant="caption"
					textAlign="left"
					sx={{ color: 'error.main' }}
				>
					{submitError}
				</Typography>
			)}
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					alignItems: 'center',
					justifyContent: 'center',
					mt: 2
				}}
			>
				<Button
					type="submit"
					variant="outlined"
					onClick={() => setSignUp(true)}
				>
					Register
				</Button>
				<Button type="submit" variant="contained">
					Login
				</Button>
			</Box>
		</Paper>
	);
};

export default Login;
