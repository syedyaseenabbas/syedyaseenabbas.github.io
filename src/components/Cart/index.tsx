import { Box, Button, SwipeableDrawer } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { toggleCart, toggleItemRemoved } from "../../Store/carts/cart.slice";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CartProduct from "../CartProduct";
import AlertComponent from "../Alert";
import CloseIcon from "@material-ui/icons/Close";
import "./cart.css";

const Cart = () => {
  const { isOpen, cartItems, isEmpty, totalSum, itemRemoved } = useAppSelector(
    (state) => state.cartReducer
  );
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(toggleCart(false));
  };
  const handleSubmit = () => {
    dispatch(toggleCart(false));
  };
  return (
    <div className={"cart"}>
      <SwipeableDrawer
        anchor={"right"}
        onClose={handleClose}
        onOpen={handleClose}
        open={isOpen}
      >
        <Box sx={{ width: 400, paddingTop: 2 }}>
          <AlertComponent
            open={itemRemoved}
            setOpen={() => dispatch(toggleItemRemoved(false))}
            text={"Successfully removed product!"}
            severity={"info"}
          />

          <div className={"cartHeader"}>
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleSubmit()}
            />
            <h1 className={"cartTitle"}>Your cart</h1>
            <ShoppingBasketIcon className={"cartIcon"} />
          </div>
          <div className={"cartSpan"} />
          <div className={"cartList"}>
            {isEmpty ? (
              <div className={"emptyCart"}>Cart is empty</div>
            ) : (
              cartItems.map((item) => (
                <CartProduct key={item.product.id} product={item} />
              ))
            )}
          </div>
          {!isEmpty && (
            <>
              <div className={"cartSpan"} />
              <div className={"cartBottom"}>
                <h3 className={"cartTotal"}>Total: {totalSum.toFixed(2)} $</h3>
                <Button onClick={handleSubmit} variant={"contained"}>
                  Place order
                </Button>
              </div>
            </>
          )}
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default Cart;
