import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../style/ProfileMyOrder.css"

import Navbar from "../component/Navbar"
import MenuLifeProfile from "../component/MenuLifeProfile"

function ProfileMyOrder() {
  const navigate = useNavigate()
  const [profile, setProfile] = React.useState([])
  const [order, setOrder] = React.useState([])
  const [orderProduct, setOrderProduct] = React.useState([])

  React.useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login")
    } else {
      const user_id = localStorage.getItem("user_id")
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/${user_id}`)
        .then((response) => {
          setProfile(response?.data?.data[0])
        })
      axios
        .get(`${process.env.REACT_APP_API_URL}/orders/user/${user_id}`)
        .then((response) => {
          setOrder(response?.data?.data)
        })
        .then(() => {
          order.map((item, index) => {
            axios
              .get(
                `${process.env.REACT_APP_API_URL}/products/${item?.product_id}`
              )
              .then((response) => {
                // product.push(response?.data?.data[0]?.product_pictures)
                setOrderProduct((orderProduct) => [
                  ...orderProduct,
                  response?.data?.data[0]?.product_pictures,
                ])
              })
          })
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

  return (
    <div className="" style={{ backgroundColor: "#eeeeee" }}>
      {/* Navbar */}
      <Navbar />

      <div className="container-fluide d-flex ProfileBg">
        {/* control Profile lift */}
        <MenuLifeProfile
          fullname={profile?.fullname}
          profilepicture={profile?.profile_picture}
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
            </ul>
            <table className="table align-items-center">
              <thead>
                <tr>
                  <th scope="col">Created At</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Photo Product</th>
                </tr>
              </thead>
              <tbody>
                {order.length !== 0 ? (
                  order.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item?.created_at.split("T")[0]}</td>
                        <td>{item?.order_status}</td>
                        <td>{item?.quantity}</td>
                        <td>Rp {handleRupiah(item?.total)}</td>
                        {/* <td>{getProductPictures(item?.product_id)}</td> */}
                        <td>
                          <img
                            src={orderProduct[index]}
                            alt="product-pict"
                            style={{ width: "100px" }}
                          />
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <p className="text-center">You don't have order yet</p>
                )}
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
