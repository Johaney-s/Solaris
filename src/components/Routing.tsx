import { Routes, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Explore from '../pages/Explore';
import Adopt from '../pages/Adopt';
import NotFound from '../pages/NotFound';

const Routing = () => {
	const user = useLoggedInUser();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/explore" element={<Explore />} />
			{!user && <Route path="/login" element={<Login />} />}
			<Route
				path="/adopt"
				element={<Adopt username={user?.email ?? undefined} />}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
export default Routing;
