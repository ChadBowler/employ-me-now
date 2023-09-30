import React from "react";

// import pages/components
import Contact from "../components/Contact";
import Jobs from "./Jobs";

// import images
import heroImage from "../styles/images/people_in_a_meeting_at_a_table.jpg";
import aboutImage from "../styles/images/two_women_planning.jpg";
import missionImage from "../styles/images/four_people_smiling_together.jpg";

// styles 
const heroSection = {
    display: "flex",
    alignItems: "center",
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",  
    backgroundRepeat: "no-repeat",
    padding: "10px",
    borderRadius: "10px",
    border: "4px solid white",
    marginBottom: "20px",
    height: "50vh"
  };

const heroDiv = {
    display: "flex", 
    alignItems: "center", 
    marginRight: "600px"
};

const heroText = {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  };

const aboutSection = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid black",
    marginBottom: "20px",
    backgroundColor: "#1F5014", // Background color
    color: "white", // Text color
  };
  
  const aboutDiv = {
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
  };

  const aboutText = {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  };
  
  const aboutImageStyle = {
    width: "300px",
    height: "200px",
    borderRadius: "15px", 
    border: "6px solid white",
  };

  const missionSection = {
    display: "flex",
  alignItems: "center",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid black",
  marginBottom: "20px",
  backgroundColor: "bg-dark", // Bootstrap dark background color class
  color: "#FFFFFF" // Set text color to white
  };

  const missionDiv = {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
    border: "10px solid #CCCCC", 
    borderRadius: "5px",
    color: "#000000"
  };

  const missionText = {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    width: "40vh"
  };

  const missionImageStyle = {
    width: "420px",
    height: "300px",
    borderRadius: "10px", 
    border: "4px solid black",
  };

  const contactSection = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid black",
    marginBottom: "20px",
    backgroundColor: "#1F5014", // Background color
    color: "white", // Text color
  };
  
  const jobsSection = {
    display: "flex", 
    alignItems: "center",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid black",
    marginBottom: "20px",
    // height: "50vh"
  };

const Home = () => {
 return (
  <>
   <div>
    <section style={heroSection}>
     <div style={heroDiv}>
      <div style={heroText}>
       <h1>Find a Job that fits you!</h1>
       <p>
        Welcome to Employ Me Now - Your Gateway to Opportunity! Are you ready to
        take the next step in your career or find the perfect candidate for your
        company? Look no further! Employ Me Now is your one-stop destination for
        job seekers and recruiters alike. Explore thousands of job listings,
        create a standout profile, and connect with top employers. Join us today
        and embark on your journey to professional success!
       </p>
      </div>
     </div>
    </section>

    <section style={aboutSection}>
     <div style={aboutDiv}>
      <img src={aboutImage} alt="Two people in a meeting." style={aboutImageStyle}/>
     </div>
     <div style={aboutText}>
      <h4>About Us</h4>
      <h5>Committed to Your Employment Goals</h5>
      <p>
       At Employ Me Now, we believe that finding the right job or talent should
       be effortless. With a passion for connecting people to their dream
       careers, we've created a platform that caters to both job seekers and
       recruiters. Our user-friendly interface and powerful features make it
       easy to navigate the job market or discover exceptional talent.
      </p>
     </div>
    </section>

    <section style={missionSection}>
     <div style={missionDiv}>
      <div style={missionText}>
       <h4>Mission</h4>
       <h5>Empowering Careers, Fulfilling Dreams</h5>
       <p>
        Our mission at Employ Me Now is to empower individuals to achieve their
        career aspirations and help businesses find the talent they need to
        thrive. We are dedicated to providing a seamless and transparent
        job-seeking experience, where every user can build their profile,
        showcase their skills, and connect with opportunities that match their
        goals. For recruiters, we aim to simplify the hiring process, making it
        efficient and effective. Together, we're shaping a brighter future, one
        job at a time. Join Employ Me Now today and let us be your partner on
        your journey to professional success! Feel free to customize these
        statements further to align with your specific goals and branding for
        the "Employ Me Now" website.
       </p>
      </div>
     </div>
     <div style={{ marginLeft: "20px" }}>
     <img src={missionImage} alt="Four people in a meeting." style={missionImageStyle}/>
     </div>
    </section>

    <section style={contactSection}>
     <div>
      <div>
       <h5>We'd Love to Hear from You!</h5>
       <Contact />
      </div>
     </div>
    </section>

    <section style={jobsSection}>
     <div>
      <h5>Job Posts</h5>
      {/* The jobs list should not be clickable unless logged in. */}
      <Jobs />
     </div>
    </section> 
   </div>
  </>
 );
};

export default Home;
