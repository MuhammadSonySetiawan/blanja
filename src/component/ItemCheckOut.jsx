import React from "react"

function ItemCheckOut(props) {
  const { product, quantity } = props

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
    <>
      <div
        className="card mb-2 ItemCheckOut"
        style={{ cursor: "pointer", width: "150%" }}
      >
        <div className="card-body d-flex flex-row justify-content-between align-items-center overPage">
          <div className="d-flex flex-row overPage">
            <div>
              <img
                src={`${product.product_pictures}`}
                className="contentCheckOut me-2 img-fluid"
              />
            </div>

            <div className="">
              <p
                className="navbar-brand ms-2 text-start text-wrap "
                style={{ marginBottom: "2px", width: "10rem" }}
              >
                {product.title}
              </p>
              <p
                className="text-muted text-start ms-2 text-wrap "
                style={{ fontSize: "13px" }}
              >
                {product.storename}
              </p>
            </div>
          </div>

          <div className="d-flex">
            <div className="p-0 me-3">{quantity}x</div>
            <div className="end-2" style={{ width: "100px" }}>
              Rp {handleRupiah(product.price)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemCheckOut
