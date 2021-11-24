import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import Layout from './components/Layout';
import theme from './utils/theme';

const App = () => (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Layout />
	</ThemeProvider>
);

export default App;
