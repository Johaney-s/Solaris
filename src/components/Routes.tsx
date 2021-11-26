import { Switch, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Explore from '../pages/Explore';

const Routes = () => {
	const user = useLoggedInUser();
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/explore" exact component={Explore} />
			{!user && <Route path="/login" exact component={Login} />}
		</Switch>
	);
};
export default Routes;
