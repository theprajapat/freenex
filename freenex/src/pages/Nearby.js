import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { FaMapMarkerAlt, FaStar, FaConnectdevelop } from 'react-icons/fa';
import '../styles/Nearby.css';

function Nearby() {
  const [freelancers, setFreelancers] = useState([]);
  const [search, setSearch] = useState(''); // Search input

  const searchNearbyFreelancer = (e) => {
    if(e.key == 'Enter'){
      if(e.target.value === ' ' || '' || null || undefined){
        setFreelancers([])
      }else{
        fetchNearbyFreelancers()
        console.log(freelancers)
      }
    };
    }
  const handleSearchChange = (e)=>{
    setSearch(e.target.value)
  }
  const fetchNearbyFreelancers = async () => {
    try {
      const { data } = await API.get('/freelancers/nearby', {
        params: { search: search }, // Send query parameter
      });
      setFreelancers(data); // Save filtered freelancers
    } catch (error) {
      console.error('Failed to fetch nearby freelancers');
    }
  };
  return (
    <div className="nearby">
      <h2>Nearby Freelancers</h2>

      {/* Single search bar for both skills and location */}
      <input
        type="text"
        placeholder="Search by skills or location..."
        value={search}
        onChange={handleSearchChange}
        onKeyDown={searchNearbyFreelancer}
        className="search-bar"
      />

      <div className="freelancer-list">
        {freelancers.length > 0 ? (
          freelancers.map((freelancer) => (
            <div key={freelancer._id} className="freelancer-card">
              <h3>{freelancer.name}</h3>
              <p>{Array.isArray(freelancer.skills) ? freelancer.skills.join(', ') : freelancer.skills}</p>
              <div className="freelancer-info">
                <span><FaMapMarkerAlt /> {freelancer.location}</span>
                <span><FaStar /> {freelancer.rating} / 5</span>
              </div>
              <button className="connect-btn"><FaConnectdevelop /> Connect</button>
            </div>
          ))
        ) : (
          <p>No freelancers found based on your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Nearby;
