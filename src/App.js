import React from 'react';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import History from './components/History';
import './styles.css';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import FindDoctors from './components/FindDoctors';

const Home = () => (
  <div className="content" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>
      Welcome to Skin Disease Diagnosis
    </h2>
    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
      This application helps in diagnosing skin diseases using advanced machine learning models.
      You can upload an image of the affected skin area and get an instant prediction.
    </p>
    <div className="project-details" style={{ marginTop: '20px' }}>
      <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Project Overview</h3>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
        Our application leverages deep learning algorithms to analyze and classify skin conditions from uploaded images. The goal is to assist in early detection and treatment of various skin conditions.
      </p>
      <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>How It Works</h3>
      <ol style={{ paddingLeft: '20px', color: '#555', lineHeight: '1.6' }}>
        <li style={{ marginBottom: '10px' }}>Upload an image of the affected skin area.</li>
        <li style={{ marginBottom: '10px' }}>The model processes the image and generates a prediction.</li>
        <li style={{ marginBottom: '10px' }}>View the prediction result along with the probability of each diagnosis.</li>
        <li style={{ marginBottom: '10px' }}>Check the history page to review past diagnoses and predictions.</li>
      </ol>
      <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Doctors Near You</h3>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
        If you need further consultation, we recommend visiting a dermatologist. Find a doctor near you for a more comprehensive diagnosis and treatment plan.
        <Link to="/doctors" style={{ display: 'inline-block', marginTop: '10px', color: '#007bff', textDecoration: 'none' }}>
          Find Doctors
        </Link>
      </p>
      <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Team and Acknowledgments</h3>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
        <strong>Project Supervisor: </strong> Dr. Jatinder Manhas
        <a href="https://admin.jammuuniversity.ac.in/juprofiles/profilepage.aspx?id=8" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}> (Click here)</a>
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
        <strong>Team Members:</strong>
        <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: '#555' }}>
          <li>Tanisha Mahajan</li>
          <li>Mohsin Hassan</li>
          <li>Taiba Banoo</li>
        </ul>
      </p>
    </div>
  </div>
);



const App = () => {
  return (
    <div id="root">
      <Header />
      <Routes>
        {/* Default route that redirects to the upload page */}
        <Route path="/" element={<Navigate to="/upload" />} />

        {/* Defined routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/history" element={<History />} />
        <Route path="/doctors" element={<FindDoctors />} /> {/* New Route */}
      </Routes>
      <footer>
        <div className="footer-content">
          <div className="contact-item">
            <span>Developed by Students of Bhaderwah Campus, University of Jammu</span> <br />
            <span>&copy; 2024 All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
