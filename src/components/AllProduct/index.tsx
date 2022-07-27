import React from "react";
import { Card } from "react-bootstrap";
import { Button, Rating } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { formatCurrency } from "../../Utilities";
import { User as FirebaseUser } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../../Firebase";
import { IProduct } from "../../Types/index";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { addProduct } from "../../Store/carts/cart.slice";

interface storeItemProps {
  product: IProduct;
}

export const StoreItem: React.FC<storeItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const { cartItems } = useAppSelector((state) => state.cartReducer);

  const addToCart = () => {
    dispatch(addProduct({ product, quantity: count }));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((FirebaseUser) => {
      setUser(FirebaseUser);
    });

    return unsubscribe;
  }, []);

  const navigateToProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        onClick={navigateToProduct}
        variant="top"
        src={product.image}
        height="280px"
        width="280px"
        style={{
          objectFit: "contain",
          cursor: "pointer",
          paddingTop: "10px",
          paddingLeft: "1px",
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline">
          <span
            onClick={navigateToProduct}
            style={{
              cursor: "pointer",
              fontFamily: "Urbanist",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
            className="fs-2"
          >
            {product.title}
          </span>
        </Card.Title>
        <span
          style={{ paddingBottom: "7px", fontWeight: "500", fontSize: "20px" }}
        >
          {formatCurrency(product.price)}
        </span>
        <div className="mt-auto">
          <div
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              paddingBottom: "9px",
            }}
          >
            <Rating name="read-only" value={product.rating.rate} readOnly />
            <span style={{ color: "gray", fontSize: "15px" }}>
              ({product.rating.count})
            </span>
          </div>
          <div>
            <Button
              disabled={
                !!cartItems.find((item) => item.product.id === product.id)
              }
              variant={"contained"}
              endIcon={<AddShoppingCartIcon />}
              className="w-100"
              onClick={() => {
                user !== null ? addToCart() : navigate(`/Login`);
              }}
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
