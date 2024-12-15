import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import * as Yup from "yup";
import { userContext } from "../../components/Context/userData.Context";

export default function Login() {
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const loadingToastId = toast.loading("Logging in, please wait...");
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        if (data.message === "success") {
          setToken(data.token);
          toast.success("Login successful!");
          navigate("/");
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
    <form onSubmit={formik.handleSubmit} className="container space-y-5">
      <h2 className="text-2xl font-bold text-center text-primary-400">
        <i className="fa-solid fa-circle-user fa-beat"></i> Login
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
          name="password"
          placeholder="Enter your password"
          className="form-control"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 font-semibold">{formik.errors.password}</p>
        )}
      </div>

      {error && <p className="text-red-500 font-semibold">{error}</p>}

      <div className="flex items-center justify-between">
        <button type="submit" className="btn-primary">
          Login
        </button>

        <p className="">
          <Link to="/auth/forget-password" className="navLinkStyle">
            Forget Password?{" "}
          </Link>
        </p>
      </div>
    </form>
  );
}
