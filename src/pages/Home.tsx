import React from "react";
import Navbar from "../components/Navbar";
import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useAppSelector } from "../hooks";
import Cart from "../components/Cart/Cart";

const Home: React.FC = () => {
  const { filteredProducts } = useAppSelector((state) => state.productReducers)
  return (
    <div>
      <Navbar />
      <Row md={2} xs={1} lg={3} className="g-3">
        {filteredProducts.map((item) => (
          <Col key={item.id}>
            <StoreItem product={item} />
          </Col>
        ))}
      </Row>
      <Cart/>
    </div>
  );
};

export default Home;
