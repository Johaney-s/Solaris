import { Box, Divider, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
	value: number;
	unit: string;
	caption: string;
};

const InfoBox: FC<Props> = ({ value, unit, caption }) => (
	<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
		<Box sx={{ display: 'flex', width: '100%', gap: 1, alignItems: 'end' }}>
			<Typography variant="h5" color="primary">
				{value}
			</Typography>
			<Typography>{unit}</Typography>
		</Box>
		<Divider />
		<Typography variant="caption">{caption}</Typography>
	</Box>
);

export default InfoBox;
