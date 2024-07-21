import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`;
const Items = styled.ul`
  display: flex;
  justify-content: center;
`;
const Item = styled.li`
  padding: 0 20px;
  font-weight: 600;
  position: relative;
  a {
    display: flex;
    height: 70px;
    align-items: center;
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.red};
  bottom: 5px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export default function Header() {
  const location = useLocation();

  return (
    <Nav>
      <Items>
        <Item>
          <Link to="/">
            POPULAR{" "}
            {location.pathname === "/" && <Circle layoutId="circle" />}
          </Link>
        </Item>
        <Item>
          <Link to="/coming-soon">
            COMMING SOON{" "}
            {location.pathname === "/coming-soon" && (
              <Circle layoutId="circle" />
            )}
          </Link>
        </Item>
        <Item>
          <Link to="/now-playing">
            NOW PLAYING{" "}
            {location.pathname === "/now-playing" && (
              <Circle layoutId="circle" />
            )}
          </Link>
        </Item>
      </Items>
    </Nav>
  );
}
