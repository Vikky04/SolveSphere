import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import image1 from '../assets/profile2.png';


function AboutUs() {
    // Sample data for demonstration
    const profiles = [
        {
            name: 'Vikas Bishnoi',
            email: 'vickybishnoi0100@gmail.com',
            image: image1,
            alt: 'Vikas Profile',
            number:8000291947,
        },
    ];

    return (
        <React.Fragment>
            <Navbar />
           
            <div id="abtus">
                {profiles.map((profile, index) => (
                    <div key={index} className="card">
                        <div className="image">
                            <img src={profile.image} alt={profile.alt} />
                        </div>
                        <div className="details">
                            <h2>{profile.name}</h2>
                            <p>
                               <a href={`mailto:${profile.email}`}>{profile.email}</a>
                            </p>
                            <p>
                               <a href={`tel:${profile.number}`} >{profile.number}</a>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default AboutUs;
