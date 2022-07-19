import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "@mui/material";
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
    <Card className="h-100">
      <Card.Img
        onClick={navigateToProduct}
        variant="top"
        src={product.image}
        height="300px"
        width="300px"
        style={{ objectFit: "contain", cursor: "pointer" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span
            onClick={navigateToProduct}
            style={{ cursor: "pointer" }}
            className="fs-2"
          >
            {product.title}
          </span>
          <span className="ms-2 text-muted">
            {formatCurrency(product.price)}
          </span>
        </Card.Title>
        <div className="mt-auto">
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
      </Card.Body>
    </Card>
  );
};
