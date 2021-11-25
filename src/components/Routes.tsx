import { Switch, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Login from '../pages/Login';

const Routes = () => {
	const user = useLoggedInUser();
	return (
		<Switch>
			{/*TODO: change this login to Home component*/}
			<Route path="/" exact component={Login} />
			{!user && <Route path="/login" exact component={Login} />}
		</Switch>
	);
};
export default Routes;
