import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import theme from './utils/theme';
import Routes from './components/Routes';

const App = () => (
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<CssBaseline />
			<Layout>
				<Routes />
			</Layout>
		</BrowserRouter>
	</ThemeProvider>
);

export default App;
