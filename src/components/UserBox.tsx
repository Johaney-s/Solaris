import { Box, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

import astronaut from '../images/Astronaut.png';

type Props = {
	username: string;
	direction: 'left' | 'right' | undefined;
	tokens?: number;
};

const UserBox: FC<Props> = ({ username, direction, tokens }) => (
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
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					mb: 1
				}}
			>
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
			</Box>
			<Typography
				variant="h5"
				color="textSecondary"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					pr: 5,
					pl: 5
				}}
			>
				{username}
			</Typography>
			{tokens !== undefined && (
				<Typography
					variant="h5"
					color="textSecondary"
					sx={{
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					tokens: {tokens}
				</Typography>
			)}
		</CardContent>
	</Card>
);

export default UserBox;
