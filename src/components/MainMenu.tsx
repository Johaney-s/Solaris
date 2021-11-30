import React, { FC } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const MainMenu: FC = () => {
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
				edge="start"
				color="primary"
				aria-label="menu"
				sx={{ mr: 2 }}
				onClick={handleMenu}
			>
				<MenuIcon />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose} component={Link} to="/explore">
					Explore
				</MenuItem>
				<MenuItem onClick={handleClose} component={Link} to="/adopt">
					Adopt asteroid
				</MenuItem>
				<MenuItem onClick={handleClose} component={Link} to="/adopted">
					Adopted asteroids
				</MenuItem>
			</Menu>
		</>
	);
};
export default MainMenu;
