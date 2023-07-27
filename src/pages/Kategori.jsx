import "../style/Kategori.css"
import React from "react"
import axios from "axios"
import { useLocation } from "react-router"

import Navbar from "../component/Navbar"
import ContentCategory from "../component/ContentCategory"

function App() {
  const location = useLocation()
  const category = location?.pathname?.split("/")[2]
  const [ContentList, setContentList] = React.useState([])

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/products/category/${category}?sortType=DESC&page=1`
      )
      .then((response) => setContentList(response?.data?.data))
      .catch((err) => {
        console.log("error :", err)
      })
  }, [])

  return (
    <div className="App">
      {/* start navbar */}
      <Navbar />
      {/* end navbar */}

      {/* start content */}
      <div className="container" style={{ marginTop: "6rem" }}>
        <div className="">
          <p className="mt-5 text-muted text-start">
            Home / Category / {category}
          </p>
        </div>

        <h2 className="mt-3 mb-3 text-start">{category}</h2>

        <div className="d-flex row">
          <div className="row">
            {ContentList.length !== 0 ? (
              ContentList.map((item) => (
                <ContentCategory
                  title={item?.title}
                  price={item?.price}
                  storename={item?.store_name}
                  productpictures={item.product_pictures}
                  id={item?.id}
                />
              ))
            ) : (
              <div className="alert alert-warning text-center" role="alert">
                No Products For This Category
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
