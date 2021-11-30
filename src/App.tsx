import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import theme from './utils/theme';
import Routing from './components/Routing';

const App = () => (
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<CssBaseline />
			<Layout>
				<Routing />
			</Layout>
		</BrowserRouter>
	</ThemeProvider>
);

export default App;
