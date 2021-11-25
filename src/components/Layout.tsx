import React, { FC } from 'react';
import { AppBar, Container, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';

import MainMenu from './MainMenu';
import UserMenu from './UserMenu';

const Layout: FC = ({ children }) => {
	const user = useLoggedInUser();

	return (
		<>
			<AppBar position="fixed">
				<Container maxWidth="sm">
					<Toolbar>
						<MainMenu />
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1 }}
							color="primary"
						>
							SOLARIS
						</Typography>
						{!user && (
							<Button component={Link} to="/login">
								Login
							</Button>
						)}
						{user && <UserMenu />}
					</Toolbar>
				</Container>
			</AppBar>

			<Container
				maxWidth="sm"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					pt: 8,
					gap: 2
				}}
			>
				{children}
			</Container>
		</>
	);
};
export default Layout;
