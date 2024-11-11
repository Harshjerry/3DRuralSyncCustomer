import React from 'react';
import './Service.css';
import { Link } from 'react-router-dom';

const Service = ({ service }) => {
  // Generate stars based on the rating
  const renderStars = (rating) => {
    return [...Array(Math.round(rating))].map((_, index) => (
      <span key={index} className='star_icon'>★</span>
    ));
  };

  return (
    <div className='service'>
      <Link
        to={`/singleService/${service._id}/`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className='service_thumbnail'>
          {service.images.length > 0 ? (
            <img src={service.images[0]} alt={service.name} className='service_image' />
          ) : (
            <div className='no_image'>No Image Available</div>
          )}
        </div>
      </Link>
      <div className='service_info'>
        <div className='service_info_cont1'>
          <h3 className='service_name'>{service.name}</h3>
          <h4 className='service_instructor'>{service.description}</h4>
          <div className='more_info'>
            <div className='service_detail'>
              <span className='detail_label'>Price:</span> ₹{service.basePrice}
            </div>
            <div className='service_detail'>
              <span className='detail_label'>Rating:</span>
              <span className='rating_value'>
                {renderStars(service.ratings.average)}
                <span className='rating_count'> ({service.ratings.count} reviews)</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
