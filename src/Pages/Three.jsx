import { Canvas } from '@react-three/fiber';
import ThreeCanvas from '../components/ThreeCanvas';
import styled from 'styled-components';
import React from 'react';
import { mobile } from "../responsive";
import Navbar from "../components/Navbar/Navbar";

const Cont=styled.div`
height:100vh;
width:100vw;
background-color:white;
`;
const Image = styled.img`
  position: absolute;
  z-index: 333;
  top: 50%;           /* Move down 50% of the page height */
  left: 50%;          /* Move right 50% of the page width */
  transform: translate(-50%, -50%); /* Shift the image back by its own width and height to truly center it */
`;

const Heading=styled.h1`
 position: absolute;
  z-index: 333;
  top: 40%;           /* Move down 50% of the page height */
  left: 50%;          /* Move right 50% of the page width */
  transform: translate(-50%, -50%); 
  color:White;
  font-size:5rem;
`;

const Tag=styled.h2`
 position: absolute;
 font-weight:300;
   font-family: "Montserrat", sans-serif;
  z-index: 333;
  top: 52%;           /* Move down 50% of the page height */
  left: 50%;          /* Move right 50% of the page width */
  transform: translate(-50%, -50%); 
  color:White;
  font-size:1.6rem;
  font-weight:200;
    ${mobile({ display:"none"})}
`;



const Three = () => {
  return (
    <>
      <Navbar/>
 <Cont>
  <Heading>Rural Sync</Heading>
  <Tag>Bridging Villages with  Services </Tag>
<ThreeCanvas/>
 </Cont>
 </>
  )
}

export default Three