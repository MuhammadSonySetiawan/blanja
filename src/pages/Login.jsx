import React from "react"
import mainLogo from "../assets/images/Main Logo.svg"
import authCSS from "../assets/css/auth.module.css"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleLogin = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        const token = response?.data?.token
        const user_id = response?.data?.data?.id

        Swal.fire({
          title: "Login Success",
          text: "Login Success, redirect to app...",
          icon: "success",
        }).then(() => {
          localStorage.setItem("auth", "true")
          localStorage.setItem("token", token)
          localStorage.setItem("user_id", user_id)
          window.location.href = "/"
        })
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error?.response?.data?.message ?? "Something wrong in our app",
          icon: "error",
        })
      })
  }

  return (
    <div>
      <div className="vh-100 d-flex align-items-center">
        <div className="container">
          {/* Logo Start */}
          <div className="row">
            <Link to="/">
              <div className="col d-flex justify-content-center align-items-center">
                <img src={mainLogo} alt="shopbag" />
                <h1 className="mt-3 ms-2 fnt-color metropolis-b fs-3">
                  Blanja
                </h1>
              </div>
            </Link>
          </div>
          {/* Logo End */}
          {/* Text Start */}
          <div className="row mt-3">
            <div className="col d-flex justify-content-center align-items-center">
              <p className="metropolis-b">Please login with your account</p>
            </div>
          </div>
          {/* Text End */}
          {/* Button Start */}
          <div className="row justify-content-center">
            <div
              className="col-2 nav nav-pills d-flex justify-content-center align-items-center"
              id="v-pills-tab"
              role="tablist"
            >
              {/* <div className="btn-group w-100 d-flex justify-content-center align-items-center">
                <button
                  className={`${authCSS.authButton} nav-left nav-link active`}
                  id="v-pills-customer-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-customer"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-customer"
                  aria-selected="true"
                >
                  Customer
                </button>
                <button
                  className={`${authCSS.authButton} nav-link nav-right`}
                  id="v-pills-seller-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-seller"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-seller"
                  aria-selected="false"
                >
                  Seller
                </button>
              </div> */}
            </div>
          </div>
          {/* Button End */}
          {/* Input Start */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="tab-content" id="v-pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="v-pills-customer"
                role="tabpanel"
                aria-labelledby="v-pills-customer-tab"
              >
                <div className="row mt-4 my-3 justify-content-center">
                  <div className="col-lg-4 ">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mt-3 justify-content-center">
                  <div className="col-lg-4">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mt-4 mb-4 justify-content-center">
                  <div className="col-lg-4 d-flex justify-content-center">
                    <button
                      className="btn btn-primary rounded-pill w-100"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="v-pills-seller"
                role="tabpanel"
                aria-labelledby="v-pills-seller-tab"
              >
                {/* <div className="row mt-4 my-3 justify-content-center">
                  <div className="col-lg-4 ">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mt-3 justify-content-center">
                  <div className="col-lg-4">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div> */}
                {/* <div className="row mt-4 mb-4 justify-content-center">
                  <div className="col-lg-4 d-flex justify-content-center">
                    <button
                      className="btn btn-primary rounded-pill w-100"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <p>
                Don't have an account?{" "}
                <Link to="/register">
                  <span className="">Register</span>
                </Link>
              </p>
            </div>
          </div>
          {/* Register End */}
        </div>
      </div>
    </div>
  )
}

export default Login
