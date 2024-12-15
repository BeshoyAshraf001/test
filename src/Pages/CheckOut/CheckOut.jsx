import React, { useContext, useState } from "react";
import axios from "axios";
import { cartContext } from "../../components/Context/cart.context";
import { userContext } from "../../components/Context/userData.Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckOut() {
  const { product } = useContext(cartContext) || {};
  const { cartId } = product || {};
  const { token } = useContext(userContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formValues, setFormValues] = useState({
    city: "",
    phone: "",
    details: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handlePayment = async (paymentMethod) => {
    setIsSubmitting(true);
    const loadingToastId = toast.loading("Processing your order...");

    const url =
      paymentMethod === "online"
        ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`
        : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

    try {
      const { data } = await axios.post(url, formValues, { headers: { token } });
      if (data.status === "success") {
        toast.success("Order placed successfully!");
        if (paymentMethod === "online") {
          setTimeout(() => (window.location.href = data.session.url), 2000);
        } else {
          setTimeout(() => navigate("/allorders"), 2000);
        }
      }
    } catch (error) {
      toast.error("Failed to place the order. Please try again.");
      console.error(error);
    } finally {
      toast.dismiss(loadingToastId);
      setIsSubmitting(false);
    }
  };

  return (
    <section className="checkout-section p-4">
      <h2 className="text-center mb-4">Checkout</h2>
      <form>
        <div className="container space-y-4">
          <div className="form-group">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              id="city"
              type="text"
              name="city"
              className="form-control"
              placeholder="Enter your city"
              value={formValues.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Enter your phone number"
              value={formValues.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="details" className="form-label">
              Details
            </label>
            <textarea
              id="details"
              name="details"
              className="form-control"
              placeholder="Enter additional details"
              value={formValues.details}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-primary"
            disabled={isSubmitting}
            onClick={() => handlePayment("cash")}
          >
            Pay with Cash
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={isSubmitting}
            onClick={() => handlePayment("online")}
          >
            Pay Online
          </button>
        </div>
      </form>
    </section>
  );
}
