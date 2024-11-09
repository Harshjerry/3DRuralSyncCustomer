import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height:5vh;
  width:100vw;
background-color:  #914EC2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  position:absolute;
  margin:0;
top:9vh;
  z-index:555;
`;

const Announcement = () => {
  return (
    <Container>
 BRIDING VILLAGES  WITH SERVICES
    </Container>
  );
};

export default Announcement;
