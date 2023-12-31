import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Contact from './components/Contact';
import Footer from './components/Footer/Footer';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import SingleJob from './pages/singleJob';

// Construct our main GraphQL API endpoint
let httpLink;
if (process.env.NODE_ENV === 'production') {
	httpLink = createHttpLink({
    uri: '/graphql',
  });
} else {
  httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql',
  });
}


// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start main-div bg-dark">
          <Header />
          
          <div className="container">
            <Routes>
              {/* Define routes using the Route component to render different page components at different paths */}
              {/* Define a default route that will render the Home component */}
              <Route 
                path="/" //for any user
                element={<Home />} 
              />
              <Route 
                path="/home" //for any user
                element={<Home />} 
              />
              <Route 
                path="/me" 
                element={<Dashboard />}
              />
              <Route 
                path="/dashboard/:username" // for signed-in user only 
                element={<Dashboard />} 
              />
              <Route 
                path="/jobs" 
                element={<Jobs />} 
              />
              <Route 
              path="/contact" 
              element={<Contact />} 
              />
              <Route 
              path="/signup" 
              element={<SignUp />} // for new user
              />
              <Route 
              path="/login" 
              element={<LogIn />} // takes you to user dashboard after you have logged in
              />
              <Route
              path='/singleJob/:id'
              element={<SingleJob />}
              />
            </Routes>
          </div>
          
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
