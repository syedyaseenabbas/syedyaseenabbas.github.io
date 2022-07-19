import React from "react";
import Navbar from "../../Components/Navbar";
import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../../Components/AllProduct";
import { useAppSelector } from "../../Hooks";
import Cart from "../../Components/Cart";

const Home: React.FC = () => {
  const { filteredProducts } = useAppSelector((state) => state.productReducers)

  if (filteredProducts.length === 0)
    return (
      <div>Loading</div>
    )
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
      <Cart />
    </div>
  );
};

export default Home;
