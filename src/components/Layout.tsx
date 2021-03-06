import { AppBar, Container, Toolbar, Button, Typography } from '@mui/material';
import { FC } from 'react';
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
						<Typography component="div" sx={{ flexGrow: 1 }} color="primary">
							<Button
								disableElevation
								disableRipple
								component={Link}
								to="/"
								style={{
									fontSize: '18px',
									backgroundColor: 'transparent'
								}}
							>
								SOLARIS
							</Button>
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
				maxWidth="md"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					// justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					pt: 15,
					gap: 2
				}}
			>
				{children}
			</Container>
		</>
	);
};
export default Layout;
