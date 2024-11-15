import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import axios from "axios";
import LaptopCanvas from "../components/LaptopCanvas";

// Styled Components
const ProfileContainer = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  width: 82%;
  justify-content: center;
  gap: 15px;
  margin-top: 30vh;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  font-size: 3rem;
  margin: 0;
  color: Black;
`;

const UserEmail = styled.p`
  font-size: 1rem;
  color: gray;
  margin: 5px 0;
`;

const UserRole = styled.p`
  font-size: 0.9rem;
  color: #333;
`;

const BookingsSection = styled.div`
  width: 80%;
`;

const BookingsTitle = styled.h1`
  font-size: 1.8rem;
  color: #914EC2;
  margin-bottom: 10px;
`;

const BookingList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-height: 35vh; /* Set a max height */
  overflow-y: auto;  /* Enable scrolling */
  overflow-x:hidden;
  border: 1px solid #ccc; /* Optional: add a border for better visibility */
  border-radius: 5px; /* Optional: rounded corners */
`;

const BookingItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  padding: 15px; /* Increased padding for better spacing */
  background-color: #f9f9f9;
  width: 100%;
  height: 10vh;  /* Increased height to make the items taller */
  margin-bottom: 5px;
  border-radius: 5px;
  color: #333;
`;


const BookingField = styled.div`
  flex: 1;
  text-align: center;
`;

const NoBookings = styled.p`
  font-size: 1rem;
  color: #888;
`;

const Cont = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
  z-index: -2;
  display: flex;
  overflow-y: hidden;
`;

const RS = styled.img`
  position: fixed;
  top: 18vh;
  left: -10vw;
  filter: brightness(20%);
  opacity: 0.1; 
  z-index: -1;
`;

const LaptopCont = styled.div`
  position: fixed;
  top: 1vh;
  left: 50%;
  height: 50vh;
  width: 50vw;
  z-index: 4;
  transform: translateX(-50%);
  ${mobile({ width: "100vw", top: "5vh" })};
`;

const Profi = styled.img`
  position: absolute;
  top: 10vh;
  height: 35vh;
  width: 20vw;
  left: 50%;
  transform: translateX(-50%);
  ${mobile({ width: "90vw", height: "30vh" })};
`;

const IMG=styled.img`
width:8vw;
height:9vh;
`;

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState({});

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (currentUser.data?._id) {
        try {
          const response = await axios.get(`http://localhost:5002/client/booking/bookings2/${currentUser.data._id}`);
          setBookings(response.data); // Assuming response.data is an array of bookings
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    };

    fetchBookings();
  }, [currentUser.data?._id]);

  // Fetch service details for each booking
  useEffect(() => {
    const fetchServices = async () => {
      const serviceDetails = {};

      for (const booking of bookings) {
        const serviceId = booking.service; // Assuming 'service' in booking refers to service ID
        if (!serviceDetails[serviceId]) {
          try {
            const response = await axios.get(`http://localhost:5002/client/booking/service/${serviceId}`);
            serviceDetails[serviceId] = response.data.data; // Store service details
          } catch (error) {
            console.error(`Error fetching service details for ${serviceId}:`, error);
          }
        }
      }

      setServices(serviceDetails); // Update the state with the fetched service details
    };

    if (bookings.length > 0) {
      fetchServices();
    }
  }, [bookings]);

  return (
    <Cont>
      <Navbar />
      <ProfileContainer>
        <RS src='/flower.png' />
        <LaptopCont>
          <LaptopCanvas />
        </LaptopCont>
        <ProfileHeader>
          <ProfileInfo>
            <UserName>{currentUser.data.name}</UserName>
            <UserEmail>{currentUser.data.email}</UserEmail>
            <UserRole>CLIENT</UserRole>
          </ProfileInfo>
        </ProfileHeader>

        <BookingsSection>
          <BookingsTitle>Your Bookings</BookingsTitle>
          {bookings.length > 0 ? (
            <BookingList>
              {bookings.map((booking, index) => {
                const service = services[booking.service]; // Accessing the corresponding service details
                return (
                  <BookingItem key={index}>
                    {service ? (
                      <>
                        <BookingField>
                          <IMG src={service.images[0]} alt={service.name} width="50" height="50" />
                        </BookingField>
                        <BookingField>{service.name}</BookingField>
                        <BookingField>₹{service.basePrice}</BookingField>
                        <BookingField style={{color:" #914EC2"}}>{booking.status}</BookingField>
                      </>
                    ) : (
                      <NoBookings>Loading service details...</NoBookings>
                    )}
                  </BookingItem>
                );
              })}
            </BookingList>
          ) : (
            <NoBookings>No bookings found</NoBookings>
          )}
        </BookingsSection>
      </ProfileContainer>
    </Cont>
  );
};

export default ProfilePage;
