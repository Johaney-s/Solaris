import { useEffect, useState } from 'react';

import { Body } from '../components/SpaceBody';

const useAsteroids = () => {
	const [data, setData] = useState<Body[]>();

	const fetchById = async () => {
		fetch(`https://api.le-systeme-solaire.net/rest/bodies`)
			.then(response => response.json())
			.then(response => response.bodies)
			.then((response: Body[]) =>
				setData(
					response.filter(
						a =>
							(a.englishName = !a.englishName ? a.id : a.englishName) &&
							!a.isPlanet &&
							!a.aroundPlanet &&
							a.id !== 'soleil'
					)
				)
			);
	};

	useEffect(() => {
		fetchById();
	}, []);

	return data;
};

export default useAsteroids;
