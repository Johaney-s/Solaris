import React, { FC } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

import { signOut } from '../utils/firebase';

const UserMenu: FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				color="primary"
				onClick={handleMenu}
			>
				<AccountCircle />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose} component={Link} to="/account">
					My account
				</MenuItem>
				<MenuItem onClick={signOut} component={Link} to="/logout">
					Logout
				</MenuItem>
			</Menu>
		</>
	);
};
export default UserMenu;
