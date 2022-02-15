import React, { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../contexts/UserInfoContext";
import api from "../api/siteApi";

const validationSchema = yup.object({
  email: yup
    .string()
    .lowercase()
    .email("Invalid Email Address")
    .required("Please Enter Your Email Address"),
  password: yup.string().min(5, "Password should be at least 5 characters"),
});

const formInputList = [
  { key: 0, label: "Email", name: "email", type: "email", required: true },
  {
    key: 1,
    label: "Password",
    name: "password",
    type: "password",
    required: true,
  },
];

const LoginPage = () => {
  const { setUserInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          const { email, password } = values;
          try {
            const { data } = await api.post("api/user/login", {
              email,
              password,
            });
            setUserInfo(data.token);
            navigate("/admin/overview");
            window.location.reload();
          } catch (err) {
            console.log(err);
          }
        }}
        validationSchema={validationSchema}
      >
        {(props) => (
          <>
            <div className="min-w-screen min-h-screen flex items-center justify-center bg-pink-50">
              <div className="px-1 py-6 mx-2 md:p-12 w-full sm:w-3/4 lg:w-2/5  border-2 border-cyan-800 rounded-xl bg-white shadow-2xl">
                <h2 className="text-center text-cyan-700 text-3xl md:text-5xl font-semibold mb-3 md:mb-5">
                  Login
                </h2>
                <Form
                  className="flex flex-col h-full items-center justify-center"
                  autoComplete="nope"
                >
                  {formInputList.map((item, index) => (
                    <div key={index} className="w-11/12 my-2">
                      <label
                        htmlFor={item.name}
                        className={`mt-5 w-full ${
                          item.required
                            ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                            : null
                        } `}
                      >
                        {item.label}
                      </label>
                      <Field
                        className="mt-2 w-full h-11 py-2 px-3 rounded-md border border-slate-300 shadow-sm bg-gray-50 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 invalid:border-red-500 
                focus:invalid:border-red-500 focus:invalid:ring-red-500 selection:bg-amber-500 selection:text-white "
                        type={item.type}
                        name={item.name}
                        placeholder={item.label}
                        maxLength={item.maxLength}
                        autoComplete="off"
                      />
                      <ErrorMessage
                        className="italic w-full text-red-500 text-sm "
                        name={item.name}
                        component="div"
                      />
                    </div>
                  ))}
                  {/* Submit Button */}
                  <button
                    className="p-2 w-11/12 mt-5 text-white font-semibold tracking-wider bg-cyan-700 rounded-full hover:shadow-md "
                    type="submit"
                  >
                    Log In
                  </button>
                </Form>
              </div>
            </div>
          </>
        )}
      </Formik>
    </>
  );
};

export default LoginPage;
