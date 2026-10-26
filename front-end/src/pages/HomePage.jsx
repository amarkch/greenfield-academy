import React, { useState, useEffect } from 'react';
import { C, fontDisplay, fontBody } from "../theme.js";
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";
import GreenfieldHomePageHeaderBar from "../components/GreenfieldHomePageHeaderBar.jsx";
import { Link } from "react-router-dom";
import "./Home.css";

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
              <h3>A NOTE FROM THE MANAGING DIRECTOR</h3>
              <br/>
              Dear <br/>
              &nbsp; &nbsp;
              &nbsp;
              Students, Parents and Well-wishers,

It gives me great pleasure to welcome you to GREENFIELD ACADEMY, Titabor, a place where learning goes beyond textbooks and every child is encouraged to grow with confidence, curiosity and character.

At Greenfield Academy, we believe that education should nurture not only academic excellence but also creativity, empathy, discipline and a strong sense of responsibility. Our dedicated teachers work closely with students to help them discover their strengths, pursue their passions and become thoughtful contributors to society.

              <br/>
              We are equally grateful to our parents for their continued trust and partnership. Together, we strive to create a safe, inclusive and inspiring environment where every learner feels valued and empowered to achieve their best.

Thank you for being a part of Greenfield Academy.

              <br/>
              <br/><i><h4>Manish Krishnan</h4>
              Managing Director, Greenfield Academy</i>
            </div>

          </div>
          <div className="ga-cards-container">
            <div className="ga-section-princi-image-card">
            </div>
            <div className="ga-section-image-text-card">
              <h3>গ্রীনফিল্ড একাডেমীলৈ স্বাগতম!</h3>
              <br/>
              শিক্ষা কেৱল পাঠ্যপুথি মুখস্থ কৰা বা ইখনৰ পাছত সিখন পৰীক্ষাত উত্তীৰ্ণ হোৱাই নহয়—ই হৈছে আপুনি প্ৰকৃততে কোন, 
              আপুনি কি ভাল পায় আৰু এই পৃথিৱীখনক কেনেকৈ আৰু অলপ সুন্দৰ কৰি তুলিব পাৰি, 
              তাক বিচাৰি উলিওৱাৰ এক যাত্ৰা। তিতাবৰৰ ঠিক প্রাণকেন্দ্রত অৱস্থিত আমাৰ এই গ্রীনফিল্ডত আমি অলপ ভিন্ন ধৰণে কাম-কাজবোৰ কৰিছোঁ। 
              পুৰণি, গতানুগতিক শ্ৰেণীকোঠা সলনি কৰি আমি এনে কিছুমান পৰিৱেশ গঢ়ি তুলিছোঁ যিয়ে ছাত্ৰ-ছাত্ৰীৰ মনত কৌতুহল জাগ্ৰত কৰে। 
              আমাৰ আদৰণীয অভিভাৱকসকললৈ: সন্তানৰ উজ্জ্বল ভৱিষ্যতৰ দায়িত্ব আমাৰ ওপৰত অৰ্পণ কৰাৰ বাবে আপোনালোকক অশেষ ধন্যবাদ। আমি এই যাত্ৰাত ইজনে সিজনৰ সংগী, সেয়েহে আহক আমি যোগাযোগ সুদৃঢ় ৰাখোঁ, মানসিক মানসিক চাপ আঁতৰাওঁ আৰু এই বিদ্যালয়ৰ যাত্ৰাটোক অবিস্মৰণীয় কৰি তোলোঁ। আহক, সকলোৱে মিলি কিবা এক সুন্দৰ সূচনা কৰোঁ।

              <br/>
              <br/>
              <br/><i><h4>প্ৰশান্ত কুমাৰ ভাগৱতী</h4>
              অধ্যক্ষ, গ্ৰীণফিল্ড একাডেমী</i>
            </div>
            
          </div>

          <div className="ga-cards-container">
            <div className="ga-section-princi-image-card" style={{backgroundImage: "url('/images/adv.jpg')"}}>
            </div>
            <div className="ga-section-image-text-card">
              <h3>At Greenfield Academy, You Are More Than Your Marks!</h3>
              <br/>
              At Greenfield Academy, we believe that every child is unique and has something special to offer. We look beyond marks and focus on helping each student discover their strengths and grow with confidence. We want our students to enjoy learning and feel free to ask questions, explore new ideas and learn from their mistakes. Our teachers guide them with care and encourage them to do better every day. For us, education is not just about academic success. It is also about learning honesty, respect, kindness and responsibility. We believe that a good education helps children become not only successful students but also good human beings. With the support of our dedicated teachers and the cooperation of parents, we strive to create a happy and welcoming environment where every child feels valued and encouraged to follow their dreams. At Greenfield Academy, every child matters, every effort counts and every dream deserves a chance to shine.

              <br/>
              <br/>
              <br/><i><h4>Bidyut P. Bharali</h4>
              Advisor, Greenfield Academy</i>
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