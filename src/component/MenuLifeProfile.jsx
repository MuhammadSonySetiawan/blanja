import React from "react"
import { Link, useNavigate } from "react-router-dom"

import { HiPencil } from "react-icons/hi"
import { BiMap } from "react-icons/bi"
import { BsFillClipboard2Fill } from "react-icons/bs"
import { VscAccount } from "react-icons/vsc"
import axios from "axios"

function MenuLifeProfile(props) {
  const { fullname, profilepicture } = props
  const navigate = useNavigate()
  // const [profile, setProfile] = React.useState("")

  React.useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login")
    }
  }, [])

  return (
    <>
      <div
        className="bg-light ProfileBgLift"
        style={{
          marginTop: "4rem",
          width: "25%",
          height: "37rem",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <div className="d-flex MenuFotoLife">
          <img
            src={profilepicture}
            className="ImgProfileLife ms-5 mt-5"
            alt="Foto PRofile"
          />
          <div className="ms-3 mt-5 NameProfileLife">
            <p className="lh-1 mt-2 fw-bold ">{fullname}</p>

            <p
              className="text-muted lh-1 me-2"
              style={{ cursor: "pointer", fontSize: "14px" }}
            >
              {" "}
              <HiPencil />
              <Link to="/profile">Edit Profile</Link>
            </p>
          </div>
        </div>

        <div className="ms-5 mt-5 d-flex flex-column">
          <Link
            to="/profile"
            className="mt-3 text-dark"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            <label
              className="bg-primary rounded-circle text-center mx-3"
              style={{ width: "29px", height: "29px", cursor: "pointer" }}
            >
              <VscAccount className=" text-light" />
            </label>
            My Account
          </Link>
          <Link
            to="/profilesippingaddress"
            className="mt-2 text-dark"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            <label
              className=" rounded-circle text-center mx-3"
              style={{
                width: "29px",
                height: "29px",
                backgroundColor: "#fd7e14",
                cursor: "pointer",
              }}
            >
              <BiMap className=" text-light" />
            </label>
            Shipping Adrress
          </Link>
          <Link
            to="/profilemyorder"
            className="mt-2 text-dark"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            <label
              className="bg-danger rounded-circle text-center mx-3"
              style={{ width: "29px", height: "29px", cursor: "pointer" }}
            >
              <BsFillClipboard2Fill className=" text-light " />
            </label>
            My Order
          </Link>
        </div>
      </div>
    </>
  )
}

export default MenuLifeProfile
