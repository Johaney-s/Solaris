import React, { FC } from 'react';
import { AppBar, Container, Toolbar, Button, Typography } from '@mui/material';

import MainMenu from './MainMenu';
import UserMenu from './UserMenu';

const Layout: FC = ({ children }) => (
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
					{/*TODO show if user is not logged in*/}
					<Button>Login</Button>
					{/*TODO show if user is logged in*/}
					<UserMenu />
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
export default Layout;
