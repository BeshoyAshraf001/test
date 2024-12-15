import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [accountMessage, setAccountMessage] = useState(null);
const navigate = useNavigate();
  const validateEmail = (email) => {
    if (!email) {
      return "Email is required.";
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return "Invalid email address.";
    }
    return null;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: ({ email }) => {
      const errors = {};
      const emailError = validateEmail(email);
      if (emailError) errors.email = emailError;
      return errors;
    },
    onSubmit: async (values) => {
      const loadingToastId = toast.loading("Wait a moment, please...");
      try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        );

        if (response.data.statusMsg === "success") {
          toast.success("Email sent successfully.");
          setTimeout(() => {
            navigate("/auth/varify-code");
          }, 2000);
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.message || "An error occurred.";
        toast.error(errorMessage);
        setAccountMessage(errorMessage);
        console.error(error);
      } finally {
        toast.dismiss(loadingToastId);
      }
    },
  });

  return (
    <div className="forget-password-container">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2 className="text-2xl font-semibold text-primary-400 hover:text-primary-600 mb-4">
          <i className="fa-solid fa-user"></i>
          <span className="ml-2">Forget Password</span>
        </h2>

        <div className="email mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className={`form-control ${formik.errors.email && "border-red-500"}`}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onFocus={() => setAccountMessage(null)}
          />
          {formik.errors.email && (
            <p className="text-red-500 font-semibold mt-1">{formik.errors.email}</p>
          )}
        </div>

        <button type="submit" className="btn-primary mt-3 w-full">
          Reset Password
        </button>

        {accountMessage && (
          <p className="text-red-500 font-semibold mt-3">{accountMessage}</p>
        )}
      </form>
    </div>
  );
}
