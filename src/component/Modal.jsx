import React from "react"
import axios from "axios"
import ContentCategory from "./ContentCategory"

function Modal() {
  const [keyword, setKeyword] = React.useState("")
  const [searchResult, setSearchResult] = React.useState([])

  const handleSearch = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products?keyword=${keyword}`)
      .then((response) => setSearchResult(response?.data?.data))
  }

  return (
    <div
      class="modal"
      id="search-product"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Search Product
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search Product"
              onChange={(e) => {
                setKeyword(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handleSearch()
                }
              }}
            />
            <div className="row justify-content-center gap-1 gap-sm-2 gap-md-4 mt-4">
              {searchResult.length > 0
                ? searchResult.map((item) => {
                    return (
                      <ContentCategory
                        title={item?.title}
                        price={item.price}
                        storename={item.store_name}
                        productpictures={item.product_pictures}
                        id={item.id}
                      />
                    )
                  })
                : "Product Not Found"}
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
