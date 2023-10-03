import React from 'react';
import { ContactForm } from '../components/ContactForm/ContactForm';
import twoSmiles from '../styles/images/man_and_woman_smiling_at_camera.jpg';
import './Contact.css';

// Styling for the component/page. //
const contactContainer = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '20px',
};

const contactImageStyle = {
	flex: '1',
	paddingLeft: '50px',
	width: '400px',
};
const contactHeaderStyle = {
	color: '#F6F6F6',
};

const contactFormSection = {
	minWidth: '300px',
};

const Contact = () => {
	return (
		<>
			<section style={contactContainer}>
				<div
					style={contactFormSection}
					className='contactContainer'
				>
					<h4 style={contactHeaderStyle}>Contact Us</h4>
					<ContactForm />
				</div>

				<div>
					<img
						src={twoSmiles}
						alt='Git Icon'
						className='contactImage'
						style={contactImageStyle}
					/>
				</div>
			</section>
		</>
	);
};

export default Contact;
