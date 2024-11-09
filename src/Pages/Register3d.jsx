import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ForestCanvas from "../components/ForestCanvas";
import NavbarWhite from "../components/NavbarWhite/NavbarWhite";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: white;
  background-size: cover;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap:1vh;
`;

const Side = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Side1 = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
     ${mobile({ display:"none" })}
`;
const Wrapper = styled.div`
  width: 70%;
  padding: 20px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
   background-color:  #914EC2;
  color: white;
  cursor: pointer;
`;

const Message = styled.span`
  color: green;
  margin-top: 20px;
  margin-left: 30px;
  display: block;
`;

const Register3D = () => {
  const [formData, setFormData] = useState({
    name: "", // Added name to form data
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // Added role to form data
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const response = await axios.post("http://localhost:5001/auth/register", formData);
      console.log("Registration response:", response.data);
      setSuccessMessage("User registered successfully!");
      setFormData({
        name: "", // Reset name after registration
        email: "",
        password: "",
        confirmPassword: "",
        role: "", // Reset role after registration
      });
      navigate("/login3d"); // Navigate to the login page
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <NavbarWhite/>
      <Container>

      <Side1>
          <ForestCanvas />
        </Side1>

        <Side>
        <Wrapper>
          <Title>Join the RuralSync Network </Title>
          <Form onSubmit={handleSubmit}>
            <Input
              name="name" // Changed to name
              placeholder="Name" // Placeholder for name input
              value={formData.name} // Ensure it handles the name field
              onChange={handleChange}
            />
            <Input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Input
              name="role"
              placeholder="Role" // Placeholder for role input
              value={formData.role}
              onChange={handleChange}
            />
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button type="submit">CREATE</Button>
            {successMessage && <Message>{successMessage}</Message>}
          </Form>
        </Wrapper>
        </Side>

      </Container>
    </>
  );
};

export default Register3D;
