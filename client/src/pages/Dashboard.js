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
		<>
			<div style={someStyle}>
				<section>
					<h1>
						Viewing {userParam ? `${user.username}'s` : 'your'}
						profile.
					</h1>
					{/* react logic for pulling user info - name, &c. */}
				</section>
				<div>
					<section>
						<h1>
							JOB GRID - USER-based, will pull up user-contingent
							info, based on their uploaded resume and jobs they
							have posted/applied to.
						</h1>
						<p1></p1>
						<ul>
							<li></li>
						</ul>
					</section>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
