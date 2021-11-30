import { Routes, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Explore from '../pages/Explore';
import Adopt from '../pages/Adopt';

const Routing = () => {
	const user = useLoggedInUser();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/explore" element={<Explore />} />
			{!user && <Route path="/login" element={<Login />} />}
			<Route path="/adopt" element={<Adopt />} />
		</Routes>
	);
};
export default Routing;
