import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [accountMessage, setAccountMessage] = useState(null);
  const navigate = useNavigate();
  const validateCode = (code) => {
    if (!code) {
      return "Code is required.";
    }
    if (code.length !== 6 || isNaN(code)) {
      return "Invalid code. Must be a 6-digit number.";
    }
    return null;
  };

  const formik = useFormik({
    initialValues: { code: "" },
    validate: ({ code }) => {
      const errors = {};
      const codeError = validateCode(code);
      if (codeError) errors.code = codeError;
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const loadingToastId = toast.loading("Verifying code...");
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          {
            resetCode: values.code,
          }
        );

        if (data.status === "Success") {
          toast.success("Code verified successfully.");
          setTimeout(() => {
            navigate("/auth/reset-password");
          }, 2000);

          resetForm();
        }
        console.log(data);
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.statusMsg ||
          error.message ||
          "Failed to verify code. Please try again.";
        toast.error(errorMessage);
        setAccountMessage(errorMessage);
      } finally {
        toast.dismiss(loadingToastId);
      }
    },
  });

  return (
    <div className="verify-code-container">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2 className="text-2xl font-semibold text-primary-400 hover:text-primary-600 mb-4">
          <i className="fa-solid fa-key"></i>
          <span className="ml-2">Verify Code</span>
        </h2>

        <div className="code mb-4">
          <input
            type="text"
            placeholder="Enter your 6-digit code"
            className={`form-control ${
              formik.errors.code ? "border-red-500" : ""
            }`}
            name="code"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
            onFocus={() => setAccountMessage(null)}
          />
          {formik.touched.code && formik.errors.code && (
            <p className="text-red-500 font-semibold mt-1">
              {formik.errors.code}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary mt-3 w-full"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Verifying..." : "Verify Code"}
        </button>

        {accountMessage && (
          <p className="text-red-500 font-semibold mt-3">{accountMessage}</p>
        )}
      </form>
    </div>
  );
}
