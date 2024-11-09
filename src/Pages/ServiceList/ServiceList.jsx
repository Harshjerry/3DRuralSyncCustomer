import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Services from '../../components/Services/Services';
import styled from 'styled-components';
import NavbarWhite from '../../components/NavbarWhite/NavbarWhite';
import { mobile } from "../../responsive";
import { Margin, Padding } from '@mui/icons-material';

const Container = styled.div`
  height: 10vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
    ${mobile({ marginTop:"5vh"})}
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  position: absolute;
  top: 3vh;
  z-index: 555;
  margin-left: 20px;
   ${mobile({ top:"8vh"})}
`;

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5002/client/booking/services'); // Direct GET request without headers
        setServices(response.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []); // No dependencies, runs once on component mount

  // Filter services based on the name property
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) // Updated to use service.name
  );

  return (
    <>
      <NavbarWhite />
      <Container>
        <SearchInput
          type="text"
          placeholder="Search for Services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
         
        />
      </Container>
      <Services services={filteredServices} />
    </>
  );
};

export default ServiceList;
