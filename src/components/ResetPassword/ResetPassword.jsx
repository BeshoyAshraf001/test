import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const loadingToastId = toast.loading("Logging in, please wait...");
      try {
        const { data } = await axios.request(
         "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          {
            method: "PUT",
            data: values,
          }
        );
        console.log(data);
        if (data.message === "success") {
          toast.success("Reset Password successful!");
          navigate("/auth/login");
        }
      } catch (error) {
        const message =
          error.response?.data?.message || "An error occurred during login.";
        setError(message);
        toast.error(message);
      } finally {
        toast.dismiss(loadingToastId);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="container space-y-5">
        <h2 className="text-2xl font-bold text-center text-primary-400">
          <i className="fa-solid fa-circle-user fa-beat"></i> Reset Password
        </h2>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 font-semibold">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter your new password"
            className="form-control"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-500 font-semibold">
              {formik.errors.newPassword}
            </p>
          )}
        </div>

        {error && <p className="text-red-500 font-semibold">{error}</p>}

        <div className="flex items-center justify-between">
          <button type="submit" className="btn-primary">
            Reset Password
          </button>
        </div>
      </form>
    </>
  );
}
