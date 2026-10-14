import React, { useState, useEffect } from 'react';
import { C, fontDisplay, fontBody } from "../theme.js";
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";
import GreenfieldHomePageHeaderBar from "../components/GreenfieldHomePageHeaderBar.jsx";
import { Link } from "react-router-dom";

const SchoolMap = () => {
  return (
    <div style={{ width: '100%', height: '450px' }}>
      <iframe
        title="Greenfield Academy Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.8!2d94.2020082!3d26.6070951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3742c56032a9efed%3A0x2b380e2482ad4e15!2sGreenfield%20Academy!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

const GreenfieldAcademy = () => {
  // Register service worker on component mount
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => console.log('Service Worker registered!', reg))
          .catch((err) => console.log('Service Worker registration failed', err));
      });
    }
  }, []);

  const handleActionClick = (actionName) => {
    if (actionName === 'Apply') {
      alert('Redirecting to Application Form...');
    } else {
      alert('Exploring Greenfield Academy...');
    }
  };

  return (
    <>
      {/* Scoped CSS styles injected into the component */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', sans-serif;
          background-color: #f4f7f6;
          color: #333;
          min-height: 100vh;
        }

        .ga-page-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
          width: 100%;
        }

        .ga-container {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ga-banner-wrapper {
          width: 100%;

          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 50px 50px 40px 50px;
          gap: 30px;
        }

        .ga-header-bar-top-right {
          position: absolute;
          top: 20px;
          right: 30px;
          z-index: 10;
        }

        .ga-left-content {
          flex: 1;
          max-width: 560px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ga-coming-soon {
          font-family: 'Oswald', sans-serif;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #bb0000;
          margin-bottom: 6px;
          font-weight: 600;
        }

        .ga-banner-title {
          font-family: 'Bentham', serif;
          font-size: clamp(2.2rem, 4.5vw, 4.8rem);
          font-weight: 400;
          color: #0b6623;
          margin: 80px 0;
          letter-spacing: 1px;
          line-height: 1.05;
        }

        .ga-banner-subtitle {
          font-family: 'Noto Serif Todhri', serif;
          font-size: clamp(1.4rem, 1.4vw, 1.4rem);
          font-weight: 400;
          color: #4a5568;
          margin-bottom: 20px;
          line-height: 1.5;
          padding: 0px;
        }

        .ga-banner-buttons {
          display: flex;
          gap: 12px;
          justify-content: flex-start;
          flex-wrap: wrap;
        }

        .ga-btn-primary, .ga-btn-secondary {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 10px 20px;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .ga-btn-primary {
          background-color: #7DCCAD;
          color: #ffffff;
          border: 2px solid #24B1B1;
        }

        .ga-btn-primary:hover {
          background-color: #7DCCAD;
          border-color: #24B1B1;
        }

        .ga-btn-secondary {
          background-color: transparent;
          color: #0b6623;
          border: 2px solid #0b6623;
        }

        .ga-btn-secondary:hover {
          background-color: rgba(11, 102, 35, 0.05);
        }

        .ga-right-image-container {
          flex: 0 0 40%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .ga-banner-image {
          max-height: 380px;
          object-fit: cover;
          border-radius: 8px;
          margin: 30px;
        }

        .ga-banner-boy-image {
          display: none
        }

        .ga-content-section {
          padding: 30px 15px 15px;
          text-align: center;
          max-width: 800px;
        }

        .ga-section-title {
          font-size: clamp(1.6rem, 2.5vw, 2.1rem);
          color: #0b6623;
          margin-bottom: 12px;
          font-family: 'Bentham', serif;
        }

        .ga-section-text {
          font-size: 1rem;
          line-height: 1.7;
          color: #555;
        }

        .ga-cards-container {
          display: flex;
          
          justify-content: center;
          max-width: 1200px;
          width: 100%;
          margin: 20px auto 40px;
          flex-wrap: wrap;
        }

        .ga-section-image-card {
          flex: 1;
          width: 150px;
          height: 520px;
          background-color: #ffffff;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          background-image: url('/images/md.jpeg');
          background-size: cover;
    
          /* Step 4: Center the background */
          background-position: center;
        }
        .ga-section-princi-image-card {
          flex: 1;
          width: 150px;
          height: 520px;
          background-color: #ffffff;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          background-image: url('/images/princi.jpeg');
          background-size: cover;
    
          /* Step 4: Center the background */
          background-position: center;
        }
        .ga-section-image-text-card {
          text-align: justify;
          flex: 1;
          width: 150px;
          height: 520px;
          background-color: #ffffff;
          
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          font-family: 'Noto Serif Todhri', serif;
          padding: 60px;
          font-size: 16px;
        }

        .ga-section-image {
          
          object-fit: cover;
          object-position: top;
          display: block;
        }
        .modle {
          display: none;
        }

        /* Responsive Media Query for Tablets and Mobiles */
        @media screen and (max-width: 992px) {
          .ga-banner-title
          {
            margin: 10px 0;
            margin-bottom:30px;
          }
          .desk {
            display: none;
          }
            .ga-banner-boy-image {
              max-height: 350px;
              object-fit: cover;
              display: block;
              margin-bottom: 15px;
            }

          .ga-banner-subtitle {
            padding: 10px 20px;
            font-size: clamp(0.8rem, 0.8vw, 0.8rem);
          }
          .ga-banner-wrapper {
            flex-direction: column;
            padding: 60px 20px 30px 20px;
            text-align: center;
            align-items: stretch;
          }

          .ga-header-bar-top-right {
            top: 15px;
            right: 15px;
          }

          .ga-left-content {
            max-width: 100%;
            align-items: center;
            margin-top: 15px;
            margin-bottom: 25px;
          }

          .ga-banner-buttons {
            justify-content: center;
            width: 100%;
            align-items: center;
          }

          .ga-right-image-container {
            width: 100%;
            margin-top: 15px;
          }

          .ga-banner-image {
            max-height: 280px;
          }
        }

        @media screen and (max-width: 576px) {
          .ga-page-wrapper {
            padding: 0px;
          }

          .ga-banner-wrapper {
            padding: 60px 20px 30px 20px;
          }

          .ga-banner-buttons {
            flex-direction: column;
            width: 100%;
          }

          .ga-btn-primary, .ga-btn-secondary {
            width: 70%;
            font-weight: 900;
            text-align: center;

          }

          .ga-section-image {
            height: 200px;
          }
        }
      `}</style>

      <div className="ga-page-wrapper">
        <div className="ga-container">
          
          <header className="ga-banner-wrapper">
            <div className="ga-header-bar-top-right">
              <GreenfieldHomePageHeaderBar />  
            </div>
            
            <div className="ga-left-content">
              <div className="ga-right-image-container mobile">
              <img 
                src={Math.round(Math.random()) ? "/images/the-girl.png" : "/images/the-boy.png"} 
                alt="Student studying code sketches" 
                className="ga-banner-boy-image" 
              />
            </div>
              <h1 className="ga-banner-title">
                GREENFIELD <br />
                ACADEMY
              </h1>

              <p className="ga-banner-subtitle">
                Empowering minds, cultivating character, and shaping the leaders of
                tomorrow through excellence in education.
              </p>
              
              <div className="ga-banner-buttons">
                <a href="#more" className="ga-btn-primary">
                  Discover More
                </a>
              </div>
            </div>

            <div className="ga-right-image-container desk">
              <img 
                src={Math.round(Math.random()) ? "/images/the-boy.png" : "/images/the-boy.png"}  ///images/the-girl.png
                alt="Student studying code sketches" 
                className="ga-banner-image" 
              />
            </div>
          </header>

          <section className="ga-content-section">
            <h2 className="ga-section-title">Welcome to Excellence</h2>
            <p className="ga-section-text">
              At Greenfield Academy, we foster a dynamic learning ecosystem built on
              integrity, academic rigor, and creative exploration. Discover our
              programs designed to bring out the absolute best in every student.
            </p>
          </section>

          <div className="ga-cards-container" id="more">
            
            <div className="ga-section-image-card">
              
            </div>
            <div className="ga-section-image-text-card">
              <h3>Welcome to Greenfield Academy!</h3>
              <br/>
              Education isn’t about just memorizing textbooks or surviving another round of exams—it’s about figuring out who you are, what you love, and how to leave the world a little better than you found it.

              Here at Greenfield, nestled right in the heart of Titabar, we’re doing things differently. We’ve traded rigid, old-school classrooms for spaces that actually spark curiosity. Whether it’s building tech solutions in the computer lab, getting hands-on in our science spaces, or dominating the sports field, we want every student to feel seen, heard, and genuinely excited to walk through those school gates every morning.

              Let’s be real: the world is moving fast. AI, climate shifts, creator economies—the rulebook is rewriting itself in real-time. That’s why our approach focuses less on rote learning and more on adaptability, emotional intelligence, and critical thinking. We’re building a community of creators, problem-solvers, and kind human beings.

              To our amazing parents: thank you for trusting us with your kids' futures. We’re in this together, so let's keep the communication open, ditch the stress, and make this school journey unforgettable.

              Let’s build something awesome together.

              <br/>
              <br/>
              <br/><i><h4>Manish Krishna Kachari</h4>
              Director, Greenfield Academy</i>
            </div>

          </div>
          <div className="ga-cards-container" id="more">
            
            <div className="ga-section-princi-image-card">
              
            </div>
            <div className="ga-section-image-text-card">
              <h3>গ্রীনফিল্ড একাডেমীলৈ স্বাগতম!</h3>
              <br/>
              শিক্ষা কেৱল পাঠ্যপুথি মুখস্থ কৰা বা ইখনৰ পাছত সিখন পৰীক্ষাত উত্তীৰ্ণ হোৱাই নহয়—ই হৈছে আপুনি প্ৰকৃততে কোন, 
              আপুনি কি ভাল পায় আৰু এই পৃথিৱীখনক কেনেকৈ আৰু অলপ সুন্দৰ কৰি তুলিব পাৰি, 
              তাক বিচাৰি উলিওৱাৰ এক যাত্ৰা। টিীয়কৰ ঠিক প্রাণকেন্দ্রত অৱস্থিত আমাৰ এই গ্রীনফিল্ডত আমি অলপ ভিন্ন ধৰণে কাম-কাজবোৰ কৰিছোঁ। 
              পুৰণি, গতানুগতিক শ্ৰেণীকোঠা সলনি কৰি আমি এনে কিছুমান পৰিৱেশ গঢ়ি তুলিছোঁ যিয়ে ছাত্ৰ-ছাত্ৰীৰ মনত কৌতুহল জাগ্ৰত কৰে। 
              

              আমাৰ আদৰণীয অভিভাৱকসকললৈ: সন্তানৰ উজ্জ্বল ভৱিষ্যতৰ দায়িত্ব আমাৰ ওপৰত অৰ্পণ কৰাৰ বাবে আপোনালোকক অশেষ ধন্যবাদ। আমি এই যাত্ৰাত ইজনে সিজনৰ সংগী, সেয়েহে আহক আমি যোগাযোগ সুদৃঢ় ৰাখোঁ, মানসিক মানসিক চাপ আঁতৰাওঁ আৰু এই বিদ্যালয়ৰ যাত্ৰাটোক অবিস্মৰণীয় কৰি তোলোঁ। আহক, সকলোৱে মিলি কিবা এক সুন্দৰ সূচনা কৰোঁ।

              <br/>
              <br/>
              <br/><i><h4>প্ৰশান্ত কুমাৰ ভাগৱতী</h4>
              অধ্যক্ষ, গ্ৰীণফিল্ড একাডেমী</i>
            </div>
            
          </div>
          
        </div>
        <h2>How to reach Greenfield Academy </h2>
          {SchoolMap()}
      </div>
    </>
  );
};

export default GreenfieldAcademy;