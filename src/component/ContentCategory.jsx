import React from "react"
import { Link } from "react-router-dom"
import "../style/MyOrder.css"

function ContentCategory(props) {
  const {
    title,
    price,
    storename,
    stock,
    description,
    category,
    productpictures,
    id,
  } = props

  let priceString = price.toString()
  let sisa = priceString.length % 3
  let rupiah = priceString.substr(0, sisa)
  let ribuan = priceString.substr(sisa).match(/\d{3}/g)

  if (ribuan) {
    let separator = sisa ? "." : ""
    rupiah += separator + ribuan.join(".")
  }

  return (
    <>
      <Link
        className="card mb-3 me-3 ItemCategory text-decoration-none "
        style={{ overflowY: "scroll", boxSizing: "border-box", minHeight: "400px", maxHeight: "400px", width: "15rem", cursor: "pointer" }}
        to={`/product/${id}`}
      >
        <img
          src={`${productpictures}`}
          className="card-img-top img-fluid imgItem"
          alt="item"
          style={{ height: "15rem", width: "15rem" }}
        />
        <div className="card-body" />
        <h5 className="card-title text-start ms-3">{title}</h5>
        <p className="card-text text-danger text-start ms-3">Rp {rupiah}</p>
        <p className="text-muted text-start ms-3">{storename}</p>
      </Link>
    </>
  )
}

export default ContentCategory
