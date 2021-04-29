import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElement";

function Navbar() {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>Patente</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/pais" activeStyle>
            Pais
          </NavLink>
          <NavLink to="/pregunta" activeStyle>
            Pregunta
          </NavLink>
          <NavLink to="/inventos" activeStyle>
            Inventos
          </NavLink>
          <NavLink to="/respuestas" activeStyle>
            Respuestas
          </NavLink>
          <NavLink to="/consultas" activeStyle>
            Consultas
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signin">sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
}

export default Navbar;
