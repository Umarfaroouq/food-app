import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav>
        <GiKnifeFork />
        <Logo to={"/"} >Delicioooooous</Logo>
      </Nav>
      <Search />
      <Category/>
     <Pages/>
     </BrowserRouter>
</div>
  );
  }

  const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-family: 'Lobster Two', cursive;
  color: #333; 
  padding: 0.5rem 1rem; 
  border-radius: 0.5rem; 
  background-color: #f8f8f8; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  transition: all 0.3s ease; 

  &:hover {
    color: #555; /* Text color on hover */
    background-color: #eaeaea; /* Background color on hover */
    transform: translateY(-2px); /* Move logo slightly up on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect on hover */
  }
`;
  const Nav=styled.div`
  padding:flex;
  justify-content:flex-start;
  align-items:center;
  svg{
    font-size:2rem;
  }
  `;
export default App;
