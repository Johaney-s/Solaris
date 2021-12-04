import { Routes, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Explore from '../pages/Explore';
import Adopt from '../pages/Adopt';
import NotFound from '../pages/NotFound';
import Planet from '../pages/Planet';
import Adopted from '../pages/Adopted';
import MyAccount from '../pages/MyAccount';

const Routing = () => {
	const user = useLoggedInUser();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/explore" element={<Explore />} />
			<Route path="/explore/:id" element={<Planet />} />
			{!user && <Route path="/login" element={<Login />} />}
			{user && <Route path="/account" element={<MyAccount />} />}
			<Route
				path="/adopt"
				element={<Adopt username={user?.email ?? undefined} />}
			/>
			<Route path="/adopted" element={<Adopted />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
export default Routing;
