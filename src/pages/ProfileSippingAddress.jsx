import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "../style/ProfileSippingAddress.css"

import Navbar from "../component/Navbar"
import MenuLifeProfile from "../component/MenuLifeProfile"
import axios from "axios"
import Swal from "sweetalert2"

function ProfileSippingAddress() {
  const navigate = useNavigate()

  const [profile, setProfile] = React.useState([])
  const [address, setAddress] = React.useState([])
  const [addressas, setAddressas] = React.useState([])
  const [recipientsname, setRecipientsname] = React.useState([])
  const [recipientsphonenumber, setRecipientsphonenumber] = React.useState([])
  const [newaddress, setNewaddress] = React.useState([])
  const [postalcode, setPostalcode] = React.useState([])
  const [city, setCity] = React.useState([])

  const [idupdate, setIdupdate] = React.useState([])
  const [addressasupdate, setAddressasUpdate] = React.useState([])
  const [recipientsnameupdate, setRecipientsnameUpdate] = React.useState([])
  const [recipientsphonenumberupdate, setRecipientsphonenumberUpdate] =
    React.useState([])
  const [addressupdate, setNewaddressUpdate] = React.useState([])
  const [postalcodeupdate, setPostalcodeUpdate] = React.useState([])
  const [cityupdate, setCityUpdate] = React.useState([])

  React.useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login")
    } else {
      const user_id = localStorage.getItem("user_id")
      axios
        .get(`${process.env.REACT_APP_API_URL}/address/user/${user_id}`)
        .then((response) => {
          setAddress(response?.data?.data)
        })
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/${user_id}`)
        .then((response) => {
          setProfile(response?.data?.data[0])
        })
    }
  }, [])

  const handleCreateAddress = () => {
    const user_id = localStorage.getItem("user_id")
    axios
      .post(`${process.env.REACT_APP_API_URL}/address`, {
        addressas,
        recipientsname,
        recipientsphonenumber,
        address: newaddress,
        postalcode,
        city,
        user_id,
      })
      .then((response) => {
        Swal.fire({
          title: "Create Address Success",
          text: "Create Address Success",
          icon: "success",
        }).then(() => {
          window.location.href = "./ProfileSippingAddress"
        })
      })
      .catch((error) => {
        Swal.fire({
          title: "Create Addresss Failed",
          text: error?.response?.data?.message ?? "Something wrong in our app",
          icon: "error",
        })
      })
  }

  const handleUpdateAddress = () => {
    const user_id = localStorage.getItem("user_id")
    axios
      .patch(`${process.env.REACT_APP_API_URL}/address/${idupdate}`, {
        addressasupdate,
        recipientsnameupdate,
        recipientsphonenumberupdate,
        addressupdate,
        postalcodeupdate,
        cityupdate,
        user_id,
      })
      .then((response) => {
        Swal.fire({
          title: "Update Address Success",
          text: "Update Address Success",
          icon: "success",
        }).then(() => {
          window.location.href = "./ProfileSippingAddress"
        })
      })
      .catch((error) => {
        Swal.fire({
          title: "Update Addresss Failed",
          text: error?.response?.data?.message ?? "Something wrong in our app",
          icon: "error",
        })
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
            <h5>Choose another address</h5>

            <p className="text-muted">Manage your shipping address</p>
            <hr />

            {address?.length == 0 ? (
              <div className={"alert alert-warning"} role="alert">
                Please add your address!
              </div>
            ) : (
              ""
            )}

            <div className="d-flex flex-column justify-content-evenly pb-5 mx-5">
              {/* content top */}
              <div className="border border-muted p-2 border-2 rounded-2 borderTop d-flex mt-2 justify-content-center">
                <button
                  type="button"
                  class="btn text-muted border-0 py-4 text-center"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo"
                  style={{ fontSize: "20px" }}
                >
                  Add new address
                </button>
              </div>

              {/* start modal Add Address */}
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title text-center"
                        id="exampleModalLabel"
                      >
                        Add new Address
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-3">
                          <label for="recipient-name" class="col-form-label">
                            Save address as (ex : home address, office address)
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="recipient-name"
                            placeholder="Home"
                            onChange={(e) => setAddressas(e.target.value)}
                          />
                        </div>

                        <div class="row mb-3">
                          <div class="col">
                            <label for="recipient-name" class="col-form-label">
                              Recipient’s name
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="First name"
                              onChange={(e) =>
                                setRecipientsname(e.target.value)
                              }
                            />
                          </div>
                          <div class="col">
                            <label for="recipient-name" class="col-form-label">
                              Recipient's telephone number
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="Last name"
                              onChange={(e) =>
                                setRecipientsphonenumber(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div class="row mb-3">
                          <div class="col">
                            <label for="recipient-name" class="col-form-label">
                              Address
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="First name"
                              onChange={(e) => setNewaddress(e.target.value)}
                            />
                          </div>
                          <div class="col">
                            <label for="recipient-name" class="col-form-label">
                              Postal code
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="Last name"
                              onChange={(e) => setPostalcode(e.target.value)}
                            />
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label for="recipient-name" class="col-form-label">
                            City or Subdistrict
                          </label>
                          <div class="col">
                            <input
                              type="text"
                              class="form-control"
                              aria-label="First name"
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>
                        </div>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        {/* <label
                          class="form-check-label ms-3 "
                          for="flexCheckDefault"
                        >
                          Make it the primary address
                        </label> */}
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-light px-5"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger px-5"
                        onClick={handleCreateAddress}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* end modal Add Address */}

              {/* content bottom */}
              <div className="d-flex flex-column mt-4 pb-3">
                {address?.length > 0
                  ? address.map((item) => {
                      return (
                        <span class="border border-danger my-3 p-4 rounded-2">
                          <h6 className="fw-bold">{item.addressas}</h6>
                          <p>
                            {item.address}, {item.city}, {item.postalcode}
                          </p>
                          <Link
                            to="#"
                            className="text-danger fw-bold"
                            style={{ textDecoration: "none" }}
                            data-bs-toggle="modal"
                            data-bs-target={`#address${item.id}`}
                          >
                            Change Address
                          </Link>
                          <div
                            class="modal fade"
                            id={`address${item.id}`}
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title text-center"
                                    id="exampleModalLabel"
                                  >
                                    Change Address
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  <form>
                                    <div class="mb-3">
                                      <label
                                        for="recipient-name"
                                        class="col-form-label"
                                      >
                                        Save address as (ex : home address,
                                        office address)
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="recipient-name"
                                        placeholder="Home"
                                        defaultValue={item.addressas}
                                        onChange={(e) => {
                                          setAddressasUpdate(e.target.value)
                                          setIdupdate(item.id)
                                        }}
                                      />
                                    </div>

                                    <div class="row mb-3">
                                      <div class="col">
                                        <label
                                          for="recipient-name"
                                          class="col-form-label"
                                        >
                                          Recipient’s name
                                        </label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          aria-label="First name"
                                          defaultValue={item.recipientsname}
                                          onChange={(e) => {
                                            setRecipientsnameUpdate(
                                              e.target.value
                                            )
                                            setIdupdate(item.id)
                                          }}
                                        />
                                      </div>
                                      <div class="col">
                                        <label
                                          for="recipient-name"
                                          class="col-form-label"
                                        >
                                          Recipient's telephone number
                                        </label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          aria-label="Last name"
                                          defaultValue={
                                            item.recipientsphonenumber
                                          }
                                          onChange={(e) => {
                                            setRecipientsphonenumberUpdate(
                                              e.target.value
                                            )
                                            setIdupdate(item.id)
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div class="row mb-3">
                                      <div class="col">
                                        <label
                                          for="recipient-name"
                                          class="col-form-label"
                                        >
                                          Address
                                        </label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          aria-label="First name"
                                          defaultValue={item.address}
                                          onChange={(e) => {
                                            setNewaddressUpdate(e.target.value)
                                            setIdupdate(item.id)
                                          }}
                                        />
                                      </div>
                                      <div class="col">
                                        <label
                                          for="recipient-name"
                                          class="col-form-label"
                                        >
                                          Postal code
                                        </label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          aria-label="Last name"
                                          defaultValue={item.postalcode}
                                          onChange={(e) => {
                                            setPostalcodeUpdate(e.target.value)
                                            setIdupdate(item.id)
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div class="row mb-3">
                                      <label
                                        for="recipient-name"
                                        class="col-form-label"
                                      >
                                        City or Subdistrict
                                      </label>
                                      <div class="col">
                                        <input
                                          type="text"
                                          class="form-control"
                                          aria-label="First name"
                                          defaultValue={item.city}
                                          onChange={(e) => {
                                            setCityUpdate(e.target.value)
                                            setIdupdate(item.id)
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="flexCheckDefault"
                                    />
                                    {/* <label
                          class="form-check-label ms-3 "
                          for="flexCheckDefault"
                        >
                          Make it the primary address
                        </label> */}
                                  </form>
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-light px-5"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-danger px-5"
                                    onClick={handleUpdateAddress}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </span>
                      )
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSippingAddress
