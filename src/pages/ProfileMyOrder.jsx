import React from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "../style/ProfileMyOrder.css"

import Navbar from "../component/Navbar"
import MenuLifeProfile from "../component/MenuLifeProfile"

function ProfileMyOrder() {
  const navigate = useNavigate()
  const [profile, setProfile] = React.useState([])
  const [order, setOrder] = React.useState([])

  React.useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login")
    } else {
      const user_id = localStorage.getItem("user_id")
      console.log(user_id)
      
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/${user_id}`)
        .then((response) => {
          console.log(response)
          setProfile(response?.data?.data[0])
        })
      axios
        .get(`${process.env.REACT_APP_API_URL}/orders/user/${user_id}`)
        .then((response) => {
          console.log(response)
          setOrder(response?.data?.data)
          // update status payment
        })
    }
  }, [])

  const handleRupiah = (price) => {
    let priceString = price
    let sisa = priceString?.length % 3
    let rupiah = priceString?.substr(0, sisa)
    let ribuan = priceString?.substr(sisa).match(/\d{3}/g)
    if (ribuan) {
      let separator = sisa ? "." : ""
      rupiah += separator + ribuan.join(".")
      return rupiah
    }
  }

  const handleUpdateStatus = (orderid, id) => {
    console.log(orderid)
    axios
      .get(`https://api.sandbox.midtrans.com/v2/${orderid}/status`)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log("error :", err)
      })
  }

  return (
    <div className="" style={{ backgroundColor: "#eeeeee" }}>
      {/* Navbar */}
      <Navbar />

      <div className="container-fluide d-flex ProfileBg">
        {/* control Profile lift */}
        <MenuLifeProfile
          fullname={profile.fullname}
          profilepicture={profile.profilepicture}
        />

        {/* Control Profile right */}
        <div
          className="bg-light mx-5 ProfileBgRight"
          style={{
            width: "100%",
            height: "100%",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            marginTop: "6rem",
          }}
        >
          <div className="p-3">
            <h5>My order</h5>

            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  All item
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-muted" href="#">
                  Not yet paid
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-muted" href="#">
                  Packed
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-muted" href="#">
                  Sent
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-muted" href="#">
                  Completed
                </a>
              </li>
              <li class="nav-item ">
                <a class="nav-link text-muted" href="#">
                  Order cancel
                </a>
              </li>
            </ul>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Created At</th>
                  <th scope="col">Payment Status</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Total</th>
                  {/* <th scope="col">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {order.map((item) => {
                  return (
                    <tr>
                      <td>{item.created_at.split("T")[0]}</td>
                      <td>{item.payment_status}</td>
                      <td>{item.order_status}</td>
                      <td>Rp {handleRupiah(item.total)}</td>

                      {/* <td>
                        <button
                          className="btn btn-success"
                          onClick={handleUpdateStatus(
                            item.paymentmethod,
                            item.id
                          )}
                        >
                          Check Status
                        </button>
                      </td> */}

                    </tr>
                  )
                })}
              </tbody>
            </table>
            <hr />
            <div style={{ marginBottom: "360px" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileMyOrder
