import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';

import { signIn, signUp } from '../utils/firebase';
import useField from '../hooks/useField';

const Login = () => {
	const { push } = useHistory();

	const [isSignUp, setSignUp] = useState(false);

	const [email, usernameProps] = useField('email', true);
	const [password, passwordProps] = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

	return (
		<Paper
			component="form"
			onSubmit={async (e: FormEvent) => {
				e.preventDefault();
				try {
					isSignUp
						? await signUp(email, password)
						: await signIn(email, password);
					push('/');
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
