import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { Button, Chip, Rating } from "@mui/material";
import Navbar from "../../Components/Navbar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Cart from "../../Components/Cart";
import { addProduct } from "../../Store/carts/cart.slice"
import { auth } from "../../Firebase";
import { User as FirebaseUser } from "firebase/auth";
import "./product.css";

const Product: FC = () => {
  const { productId } = useParams();
  const { products } = useAppSelector((state) => state.productReducers);
  const dispatch = useAppDispatch();
  const product = products.filter(
    (product) => product.id === Number(productId)
  )[0];
  const { cartItems, itemAdded } = useAppSelector((state) => state.cartReducer);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const addToCart = () => {
    dispatch(addProduct({ product, quantity: 1 }));
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((FirebaseUser) => {
      setUser(FirebaseUser);
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <Navbar showFilter={false} />
      <div className={"product"}>
        <div
          className="productWrapper"
          style={{ display: "flex", paddingLeft: 20, paddingRight: 20 }}
        >
          <div className="productImage" style={{ flex: 1, maxWidth: "500px" }}>
            <img
              className="productImg"
              src={product.image}
              alt={product.title}
            />
          </div>
          <div
            className={"productDescription"}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              maxWidth: "750px",
            }}
          >
            <div>
              <Chip
                // style={{width:"150px"}}
                color={"primary"}
                size={"medium"}
                label={product.category}
                variant="outlined"
              />
            </div>
            <h1 className={"productTitle"}>{product.title}</h1>
            <p style={{ maxWidth: "400px" }} className={"productText"}>
              {product.description}
            </p>
            <Rating
              readOnly
              name="size-large"
              value={product.rating.rate}
              size="large"
            />
            <h1 className={"productPrice"}>{product.price} $</h1>
            <div>
              <Button
                disabled={
                  !!cartItems.find((item) => item.product.id === product.id)
                }
                onClick={() => {
                  user !== null ? addToCart() : alert("Login Please");
                }}
                variant={"contained"}
                endIcon={<AddShoppingCartIcon />}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Cart />
    </>
  );
};

export default Product;
