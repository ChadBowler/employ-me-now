import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../styles/logo/employ-me-now-low-resolution-logo-color-on-transparent-background.png';
import { Link, NavLink } from 'react-router-dom';
import Auth from '../utils/auth';
import useMediaQuery from '../hooks/useMediaQuery';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Header.module.scss';

const headerContainerStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	background: '#1F5014', // Adjust background color as needed
	padding: '10px 20px',
	margin: '0',
};
const logoStyle = {
	height: '75px',
	width: '200px',
};

const navStyle = {
	display: 'flex',
	alignItems: 'center',
};

const buttonStyle = {
	background: '#1F5014',
	borderRadius: '10px',
	color: 'white',
};

function Header() {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};

	const [isMenuToggled, setIsMenuToggled] = useState(false);
	const isDesktop = useMediaQuery('(min-width: 768px)');

	return (
		<>
			<div style={headerContainerStyle}>
				<img
					src={logo}
					alt='Employ Me Now Logo'
					style={logoStyle}
				/>
				{isDesktop ? (
					<nav
						className='px-3'
						style={navStyle}
					>
						<NavLink
							className='px-3 text-light text-decoration-none'
							to='/home'
						>
							Home
						</NavLink>
						<NavLink
							className='px-3 text-light text-decoration-none'
							to='/me'
						>
							Dashboard
						</NavLink>
						<NavLink
							className='px-3 text-light text-decoration-none'
							to='/jobs'
						>
							Jobs
						</NavLink>
						<NavLink
							className='px-3 text-light text-decoration-none'
							to='/contact'
						>
							Contact
						</NavLink>
					</nav>
				) : (
					<button
						className='rounded-full p-2'
						onClick={() => setIsMenuToggled(!isMenuToggled)}
					>
						<FaBars />
					</button>
				)}

				{!isDesktop && isMenuToggled && (
					<div
						className='fixed-top right-0 bottom-0 h-100'
						style={{ background: '#1F5014' }}
					>
						{/* CLOSE ICON */}
						<div className='d-flex justify-content-end p-3'>
							<button
								onClick={() => setIsMenuToggled(!isMenuToggled)}
							>
								<FaTimes />
							</button>
						</div>

						{/* MENU ITEMS */}
						<div className='d-flex flex-column'>
							<NavLink
								className='px-3 text-light text-center fs-4 link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'
								to='/home'
							>
								Home
							</NavLink>
							<NavLink
								className='px-3 text-light text-center fs-4 link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'
								to='/me'
							>
								Dashboard
							</NavLink>
							<NavLink
								className='px-3 text-light text-center fs-4 link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'
								to='/jobs'
							>
								Jobs
							</NavLink>
							<NavLink
								className='px-3 text-light text-center fs-4 link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'
								to='/contact'
							>
								Contact
							</NavLink>
							{Auth.loggedIn() ? (
								<>
									<Link
										className='text-light m-2 text-decoration-none'
										to='/me'
									>
										Welcome,{' '}
										{Auth.getProfile().data.username}
									</Link>
									<button
										className='btn btn-success text-light m-2'
										onClick={logout}
									>
										Logout
									</button>
								</>
							) : (
								<>
									<Link
										className='btn btn-outline-secondary text-light m-2 mt-4'
										to='/signup'
									>
										SIGN UP
									</Link>
									<Link
										className='btn btn-success text-light m-2'
										style={buttonStyle}
										to='/login'
									>
										LOG IN
									</Link>
								</>
							)}
						</div>
					</div>
				)}

				<div className='d-none d-md-flex'>
					{Auth.loggedIn() ? (
						<>
							<Link
								className='text-light m-2 text-decoration-none'
								to='/me'
							>
								Welcome, {Auth.getProfile().data.username}
							</Link>
							<button
								className='btn btn-success text-light m-2'
								onClick={logout}
							>
								Logout
							</button>
						</>
					) : (
						<>
							<Link
								className='btn btn-outline-secondary text-light m-2'
								to='/signup'
							>
								SIGN UP
							</Link>
							<Link
								className='btn btn-success text-light m-2'
								style={buttonStyle}
								to='/login'
							>
								LOG IN
							</Link>
						</>
					)}
				</div>
			</div>
		</>
	);

}

export default Header;
