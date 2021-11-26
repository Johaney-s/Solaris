import { Switch, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';

const Routes = () => {
	const user = useLoggedInUser();
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			{!user && <Route path="/login" exact component={Login} />}
		</Switch>
	);
};
export default Routes;
