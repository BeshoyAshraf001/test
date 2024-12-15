import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { replace, useNavigate } from "react-router-dom";

import * as Yup from "yup";
export default function Signup() {
  //#region ==> regex and validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    rePassword: Yup.string()
      .required("Re-Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(phoneRegex, "Invalid phone number"),
  });
  //#endregion
  const [accountExist, setAccountExist] = useState(null);
  const navigate = useNavigate();
  async function onSubmit(values) {
    const loadingTostId = toast.loading("Wait a moment please.");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      let { data } = await axios(options);
      if (data.message === "success") {
        setTimeout(navigate("/login"), 2000);
        toast.success("Account created successfully.");
      }
    } catch (errors) {
      toast.error(errors.response.data.message);
      setAccountExist(errors.response.data.message);
    } finally {
      toast.dismiss(loadingTostId);
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="container space-y-5">
          <h2 className="text-2xl font-bold text-center text-primary-300 py-2">
            <i className="fa-solid fa-circle-user  fa-beat"></i> Signup
          </h2>
          <div className="name">
            <input
              type="text"
              name="name"
              id=""
              placeholder="Enter your name"
              className="form-control"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          <p className="text-red-500 font-semibold">
            {formik.touched.name && formik.errors.name}
          </p>
          <div className="email">
            <input
              type="email"
              name="email"
              id=""
              placeholder="Enter your email"
              className="form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          <p className="text-red-500 font-semibold">
            {formik.touched.email && formik.errors.email}
          </p>
          <p className="text-red-500 font-semibold">{accountExist}</p>
          <div className="password">
            <input
              type="password"
              name="password"
              id=""
              placeholder="Enter your password"
              className="form-control"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          <p className="text-red-500 font-semibold">
            {formik.touched.password && formik.errors.password}
          </p>
          <div className="rePassword">
            <input
              type="password"
              name="rePassword"
              id=""
              placeholder="Re-Enter your password"
              className="form-control"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              required
              onBlur={formik.handleBlur}
            />
          </div>
          <p className="text-red-500 font-semibold">
            {formik.touched.rePassword && formik.errors.rePassword}
          </p>
          <div className="phone">
            <input
              type="number"
              name="phone"
              id=""
              placeholder="Enter your phone number"
              className="form-control"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          <p className="text-red-500 font-semibold">
            {formik.touched.phone && formik.errors.phone}
          </p>
          <button className="btn-primary" type="submit">
            Signup
          </button>
        </div>
      </form>
    </>
  );
}
