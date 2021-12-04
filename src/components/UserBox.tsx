import { Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

import astronaut from '../images/Astronaut.png';

type Props = {
	username: string;
	direction: 'left' | 'right' | undefined;
};

const UserBox: FC<Props> = ({ username, direction }) => (
	<Card
		sx={{
			flexDirection: 'column',
			width: '100%',
			borderColor: 'textSecondary',
			border: '0.1em solid white',
			borderRadius: 15,
			borderTopLeftRadius: direction === 'left' ? '0' : '100',
			borderTopRightRadius: direction === 'right' ? '0' : '100',
			display: 'flex',
			minWidth: 50,
			marginTop: 2
		}}
	>
		<CardContent>
			<img
				src={astronaut}
				alt="Solar System"
				style={{
					borderRadius: 100,
					padding: '1',
					background: 'white',
					height: '6em',
					width: '6em'
				}}
			/>
			<Typography
				variant="h5"
				color="textSecondary"
				sx={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				{username}
			</Typography>
		</CardContent>
	</Card>
);

export default UserBox;
