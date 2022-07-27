import { FC } from "react";
import "./successOrder.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrderHistory from "../../Components/OrderHistory";

const SuccessOrder: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>Order History</h1>
      </div>
      <div style={{ marginTop: "50px" }}>
        <OrderHistory />
        <div className={"successOrder"}>
          <h1>Your order placed successfully!</h1>
          <div className={"successButton"}>
            <Button variant={"contained"} onClick={() => navigate("/")}>
              Return to home page
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessOrder;
