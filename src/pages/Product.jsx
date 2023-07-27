import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Card from "../component/Card"
// import "../assets/css/product.css";
import iconStar from "../assets/images/Icon Star.svg"
import ellipseBlack from "../assets/images/Ellipse Black.svg"
import ellipseOrange from "../assets/images/Ellipse Orange.svg"
import ellipseGrey from "../assets/images/Ellipse Grey.svg"
import ellipseBeige from "../assets/images/Ellipse Beige.svg"
import ellipseBlue from "../assets/images/Ellipse Blue.svg"
import iconLine from "../assets/images/Icon Line.svg"
import iconLineInactive from "../assets/images/Icon Line Inactive.svg"
import Navbar from "../component/Navbar"
import cardImage from "../assets/images/Product Dummy.png"

import Adder from "../component/Adder"
import axios from "axios"
import { useLocation } from "react-router"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const cardData1 = [
  {
    photo_path: cardImage,
    product_name: "Boy's suit - Black - White",
    product_price: 40.0,
    cardStore: "Zalora Cloth",
  },
  {
    photo_path: cardImage,
    product_name: "Boy's suit - Black - White",
    product_price: 40.0,
    cardStore: "Zalora Cloth",
  },
  {
    photo_path: cardImage,
    product_name: "Boy's suit - Black - White",
    product_price: 40.0,
    cardStore: "Zalora Cloth",
  },
  {
    photo_path: cardImage,
    product_name: "Boy's suit - Black - White",
    product_price: 40.0,
    cardStore: "Zalora Cloth",
  },
  {
    photo_path: cardImage,
    product_name: "Boy's suit - Black - White",
    product_price: 40.0,
    cardStore: "Zalora Cloth",
  },
  {
    photo_path: cardImage,
    product_name: "Boy's suit - Black - White",
    product_price: 40.0,
    cardStore: "Zalora Cloth",
  },
  {
    photo_path: cardImage,
    product_name: "Boy's suit - Black - White",
    product_price: 40.0,
    cardStore: "Zalora Cloth",
  },
  {
    photo_path: cardImage,
    product_name: "Boy's suit - Black - White",
    product_price: 40.0,
    cardStore: "Zalora Cloth",
  },
]

function Product() {
  const navigate = useNavigate()
  const location = useLocation()
  const id = location?.pathname?.split("/")[2]
  const [product, setProduct] = React.useState([])

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

  React.useEffect(() => {
    window.scroll(0, 0)

    axios
      .get(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((response) => setProduct(response?.data?.data[0]))
      .catch((err) => {
        console.log("error :", err)
      })
  }, [])

  const handleValidation = () => {
    const quantity = document.querySelector("#quantity")?.firstChild?.nodeValue
    if (quantity === "0") {
      Swal.fire({
        title: "Check Quantity",
        text: "Quantity invalid, please check!",
        icon: "error",
      })
    } else {
      navigate(`/CheckOut/${product.id}/${quantity}`)
    }
  }

  return (
    <>
      <Navbar />
      <section className="container mt-5 pt-5">
        <div className="row">
          <nav style={{}} aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link className="text-secondary" to="/">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link className="text-secondary" to="/">
                  Category
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link className="text-secondary" to="/">
                  Detail Product
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="row mb-5">
          <div className="col-lg-4">
            <img
              src={`${product.product_pictures}`}
              crossOrigin="anonymous"
              className="w-100 mb-2"
              alt=" product1"
              style={{
                aspectRatio: "1/1",
              }}
            />
            {/* <div className="d-flex gap-2">
              <img
                // src={productDetail.photo_path}
                crossOrigin="anonymous"
                className="w-100"
                alt="product1"
                style={{
                  aspectRatio: "1/1",
                }}
              />
              <img
                // src={productDetail.photo_path}
                crossOrigin="anonymous"
                className="w-100"
                alt="product2"
                style={{
                  aspectRatio: "1/1",
                }}
              />
              <img
                // src={productDetail.photo_path}
                crossOrigin="anonymous"
                className="w-100"
                alt="product3"
                style={{
                  aspectRatio: "1/1",
                }}
              />
              <img
                // src={productDetail.photo_path}
                crossOrigin="anonymous"
                className="w-100"
                alt="product4"
                style={{
                  aspectRatio: "1/1",
                }}
              />
              <img
                // src={productDetail.photo_path}
                crossOrigin="anonymous"
                className="w-100"
                alt="product5"
                style={{
                  aspectRatio: "1/1",
                }}
              />
            </div> */}
          </div>
          <div className="col-lg-8 d-flex flex-column justify-content-between">
            <div className="mb-lg-0 mb-3 mt-lg-0 mt-4">
              <h1 className="text-dark metropolis-b fs-2">{product.title}</h1>
              <span className="text-secondary fs-5">{product.store_name}</span>
              {/* <div className="d-flex justify-content-start align-items-center text-center gap-1">
                <img src={iconStar} alt="star" width="20px" />
                <img src={iconStar} alt="star" width="20px" />
                <img src={iconStar} alt="star" width="20px" />
                <img src={iconStar} alt="star" width="20px" />
                <img src={iconStar} alt="star" width="20px" />
                <span className="text-secondary">(10)</span>
              </div> */}
            </div>
            <div className="mb-lg-0 mb-3">
              <span className="text-secondary fs-5">Price</span>
              <br />
              <span className="metropolis-b fs-3 primary-color">
                Rp {handleRupiah(product.price)}
              </span>
            </div>
            {/* <div className="mb-lg-0 mb-3">
              <span className="fs-5">
                <b>Color</b>
              </span>
              <div className="d-flex justify-content-start align-items-center gap-3">
                <img src={ellipseBlack} alt="black" />
                <img src={ellipseOrange} alt="orange" />
                <img src={ellipseGrey} alt="grey" />
                <img src={ellipseBeige} alt="beige" />
                <img src={ellipseBlue} alt="blue" />
              </div>
            </div> */}
            <div className="d-flex justify-content-start gap-5 mb-lg-0 mb-3">
              {/* <div>
                <br />
                <span className="fs-5">
                  <b>Size</b>
                </span>
                <Adder />
              </div> */}
              <div>
                <br />
                <span className="fs-5">
                  <b>Jumlah</b>
                </span>
                <Adder />
              </div>
            </div>
            <br />
            <div className="d-flex gap-1 justify-content-between w-100">
              {/* <button className="btn btn-lg btn-outline-secondary rounded-pill text-nowrap w-100">
                Chat
              </button>
              <button className="btn btn-lg btn-outline-secondary rounded-pill text-nowrap w-100">
                Add bag
              </button> */}
              <button
                className="btn btn-lg btn-primary rounded-pill text-nowrap w-50"
                onClick={handleValidation}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <h2 className="metropolis-b">Informasi Produk</h2>
        </div>
        <div className="row mb-3">
          <h4 className="metropolis-b">Condition</h4>
          <h5 className="metropolis-b text-danger">New</h5>
        </div>
        <div className="row mb-3">
          <h4 className="metropolis-b">Description</h4>
          <p>{product.description}</p>
        </div>
        {/* <div className="row">
          <h3 className="metropolis-b">Product Review</h3>
        </div>
        <div className="row g-0">
          <div className="col-lg-2 col-sm-4 col-6">
            <span className="fs-1">5.0</span>
            <span className="text-secondary fs-5">/10</span>
            <div>
              <img src={iconStar} alt="star" width="25px" />
              <img src={iconStar} alt="star" width="25px" />
              <img src={iconStar} alt="star" width="25px" />
              <img src={iconStar} alt="star" width="25px" />
              <img src={iconStar} alt="star" width="25px" />
            </div>
          </div>
          <div className="col-3 d-flex flex-column">
            <div className="d-flex align-items-center gap-1">
              <img src={iconStar} alt="star" width={20} />
              <span className="text-secondary fs-6">5</span>
              <img src={iconLine} alt="" width="120px" />
              <span className="text-secondary fs-6">4</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <img src={iconStar} alt="star" width={20} />
              <span className="text-secondary fs-6">4</span>
              <img src={iconLineInactive} alt="" width="120px" />
              <span className="text-secondary fs-6">0</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <img src={iconStar} alt="star" width={20} />
              <span className="text-secondary fs-6">3</span>
              <img src={iconLineInactive} alt="" width="120px" />
              <span className="text-secondary fs-6">0</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <img src={iconStar} alt="star" width={20} />
              <span className="text-secondary fs-6">2</span>
              <img src={iconLineInactive} alt="" width="120px" />
              <span className="text-secondary fs-6">0</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <img src={iconStar} alt="star" width={20} />
              <span className="text-secondary fs-6">1</span>
              <img src={iconLineInactive} alt="" width="120px" />
              <span className="text-secondary fs-6">0</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="row justify-content-center">
          <h2 className="metropolis-b">You can also like this</h2>
          <span>You've never seen it before</span>
          <div className="row g-4 align-items-center">
            <Card cardData={cardData1} />
          </div>
        </div> */}
        <br />
        <br />
      </section>
    </>
  )
}

export default Product
