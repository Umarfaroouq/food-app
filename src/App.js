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
        <logo to={"/"} >Delicious</logo>
      </Nav>
      <Search />
      <Category/>
     <Pages/>
     </BrowserRouter>
</div>
  );
  }

  const Logo=styled(Link)`
  text-decoration:none;
  font-size: 1.5rem;
  font-family: 'Lobster Two, cursive;
  `
  const Nav=styled.div`
  padding:flex;
  justify-content:flex-start;
  align-items:center;
  svg{
    font-size:2rem;
  }
  `;
export default App;
