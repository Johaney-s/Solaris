import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { onAuthChanged } from '../utils/firebase';

// hook from seminar
const useLoggedInUser = () => {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		onAuthChanged(u => setUser(u ?? undefined));
	}, []);

	return user;
};

export default useLoggedInUser;
