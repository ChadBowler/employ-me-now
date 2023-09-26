import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const someStyle = {
	//add styles
};

const Dashboard = () => {
	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});

	const user = data?.me || data?.user || {};
	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <Navigate to='/dashboard' />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user?.username) {
		return <h4>You need to be logged.</h4>;
	}

	return (
		<div>
			<div style={someStyle}>
				<h2>
					Viewing {userParam ? `${user.username}'s` : 'your'} profile.
				</h2>
			</div>
		</div>
	);
};

export default Dashboard;
