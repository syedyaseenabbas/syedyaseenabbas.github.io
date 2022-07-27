import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CategoryFilter from "../CategoryFilter";
import SortByPrice from "../PriceFilter";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { toggleCart } from "../../Store/carts/cart.slice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbars from "react-bootstrap/Navbar";
import BackgroundLetterAvatars from "../Avatar";
import { getAuth, signOut } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";

interface NavbarProp {
  showFilter: boolean;
}

const Navbar: React.FC<NavbarProp> = ({ showFilter }) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cartReducer);
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((FirebaseUser) => {
      setUser(FirebaseUser);
    });

    return unsubscribe;
  }, []);
  const HandleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <>
      <Navbars sticky="top" className="bg-white shadow-sm mb-3" expand="lg">
        <Container>
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
          </Nav>
          <Navbars.Toggle aria-controls="basic-navbar-nav" />
          <Navbars.Collapse id="basic-navbar-nav">
            {user === null ? (
              <Nav className="me-auto">
                <Nav.Link to="/SignUp" as={NavLink}>
                  SignUp
                </Nav.Link>
                <Nav.Link to="/Login" as={NavLink}>
                  Login
                </Nav.Link>
              </Nav>
            ) : (
              <>
                <Button onClick={HandleLogout}>Logout</Button>
                <BackgroundLetterAvatars />
              </>
            )}
            {showFilter === true && (
              <>
                <SortByPrice />
                <CategoryFilter />
              </>
            )}
            <Button
              style={{ height: 55 }}
              onClick={() => dispatch(toggleCart(true))}
              startIcon={<ShoppingCartIcon />}
              variant={"outlined"}
            >
              Cart({cartItems.length})
            </Button>
          </Navbars.Collapse>
        </Container>
      </Navbars>
    </>
  );
};

export default Navbar;
