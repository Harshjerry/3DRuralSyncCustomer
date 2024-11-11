import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Services from '../../components/Services/Services';
import styled from 'styled-components';
import NavbarWhite from '../../components/NavbarWhite/NavbarWhite';
import { mobile } from "../../responsive";

const Container = styled.div`
  height: 10vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  ${mobile({ marginTop: "5vh" })}
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
  ${mobile({ top: "8vh" })}
`;

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5002/client/booking/services');
        setServices(response.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Function to determine if the search term is a price filter and extract the operator and value
  const parsePriceQuery = (query) => {
    const match = query.match(/([<>]=?|=)?\s*(\d+)/);
    if (match) {
      return {
        operator: match[1] || '=', // Default to '=' if no operator
        value: parseFloat(match[2])
      };
    }
    return null;
  };

  // Filtered services based on search term
  const filteredServices = services.filter(service => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const priceQuery = parsePriceQuery(searchTerm);

    return (
      // Check name
      service.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      // Check category in service category or company categories
      service.category.toLowerCase().includes(lowerCaseSearchTerm) ||
      service.serviceCompany.categories.some(category =>
        category.toLowerCase().includes(lowerCaseSearchTerm)
      ) ||
      // Check price if query has an operator (e.g., <400)
      (priceQuery &&
        ((priceQuery.operator === '<' && service.basePrice < priceQuery.value) ||
         (priceQuery.operator === '>' && service.basePrice > priceQuery.value) ||
         (priceQuery.operator === '<=' && service.basePrice <= priceQuery.value) ||
         (priceQuery.operator === '>=' && service.basePrice >= priceQuery.value) ||
         (priceQuery.operator === '=' && service.basePrice === priceQuery.value)
        )) ||
      // Fallback to basePrice as a string match for non-operator searches
      service.basePrice.toString().includes(lowerCaseSearchTerm)
    );
  });

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
