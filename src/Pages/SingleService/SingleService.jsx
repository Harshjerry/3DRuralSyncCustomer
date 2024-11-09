import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addBooking } from '../../redux/cartRedux'; // Import your Redux action
import './SingleService.css';
import NavbarWhite from "../../components/NavbarWhite/NavbarWhite";

const SingleService = () => {
  const cart = useSelector((state) => state.cart);
  const location = useLocation();
  const id = location.pathname.split('/')[2]; // Adjust the index based on the URL structure
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [service, setService] = useState({});
  const [showAvailability, setShowAvailability] = useState(false);

  useEffect(() => {
    // Fetch service details from the API
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/client/booking/service/${id}`);
        if (response.data.success) {
          setService(response.data.data);
          console.log(response.data.data);
        } else {
          console.error("Failed to fetch service data");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [id]);

  const handleBook = () => {
    // Check if there's already a booking in the cart
    if (cart.bookings.length > 0) {
      alert("Please complete the previously added booking before adding a new one.");
    } else {
      const bookingDetails = {
        _id: service._id, // Ensure this matches the cart slice's logic
        name: service.name,
        service: service.category,
        price: service.basePrice,
        quantity: 1,
        img: service.images?.[0] || '/default-image.png', // Use default image if none exists
        rating: service.ratings?.average || 0,
      };
  
      // Dispatch the booking action to add it to the Redux cart
      dispatch(addBooking(bookingDetails));
  
      // Navigate to the cart page after booking
      navigate('/cart');
    }
  };
        

  const toggleAvailability = () => {
    setShowAvailability(!showAvailability);
  };

  return (
    <>
      <NavbarWhite />
      <div className="single_service">
        <div className="singleServiceThumbnail">
          <img src={service.images?.[0]} className="singleServiceImg" alt={service.name} />
        </div>

        <div className="singleServiceInfo">
          <div className='single_service_secHead'>
            <h1>{service.name}</h1>
            <h2>Provided by: <span className="highlightedText">{service.serviceProvider?.name}</span></h2>
            <h4>{service.description}</h4>
          </div>

          <div className="single_service_sec1">
            <div className="category">
              <h3>Category: <span className="highlightedText">{service.category}</span></h3>
            </div>
            <div className="duration">
              <h3>Estimated Duration: <span className="highlightedText">{service.estimatedDuration}</span></h3>
            </div>
          </div>

          <div className="single_service_sec1">
            <div className="company">
              <h3>Company: <span className="highlightedText">{service.serviceCompany?.name || "Not Available"}</span></h3>
            </div>
            <div className="basePrice">
              <h3>Base Price: <span className="highlightedText">${service.basePrice}</span></h3>
            </div>
          </div>

          <div className="single_service_sec3">
            <div className="single_service_btn">
              {showAvailability ? (
                <div className="availabilityPopup">
                  <ul>
                    {service.availability?.length > 0 ? (
                      service.availability.map((slot, index) => <li key={index}>{slot}</li>)
                    ) : (
                      <li>No available slots</li>
                    )}
                  </ul>
                  <button className="closeBtn" onClick={toggleAvailability}>
                    Close
                  </button>
                </div>
              ) : (
                <button className="availability" style={{ backgroundColor: 'transparent', border: '1px solid black', color: 'black' }} onClick={toggleAvailability}>
                  View Availability
                </button>
              )}
            </div>

            <div className="single_service_btn">
              <button className="book" onClick={handleBook}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleService;
