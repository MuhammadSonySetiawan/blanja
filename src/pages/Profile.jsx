import FormData from "form-data"
import React from "react"

import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

import "../style/Profile.css"

import Navbar from "../component/Navbar"
import MenuLifeProfile from "../component/MenuLifeProfile"

function Profile() {
  const navigate = useNavigate()
  const [profile, setProfile] = React.useState([])
  const [profile_picture, setProfilepicture] = React.useState([])
  const [fullname, setFullname] = React.useState([])
  const [email, setEmail] = React.useState([])
  const [phone_number, setPhonenumber] = React.useState([])
  const [gender, setGender] = React.useState([])
  const [date_of_birth, setDateofbirth] = React.useState([])

  React.useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login")
    } else {
      const user_id = localStorage.getItem("user_id")
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/${user_id}`)
        .then((response) => {
          setProfile(response?.data?.data[0])
          setFullname(profile.fullname)
          setEmail(profile.email)
          setPhonenumber(profile.phone_number)
          setGender(profile.gender)
          setDateofbirth(profile.date_of_birth?.split("T")[0])
        })
    }
  }, [])

  const handleUpdate = () => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/users`, {
        fullname,
        email,
        phone_number,
        gender,
        date_of_birth,
      })
      .then((response) => {
        Swal.fire({
          title: "Update Profile Success",
          text: "Update Profile Success",
          icon: "success",
        }).then(() => {
          window.location.href = "/profile"
        })
      })
      .catch((error) => {
        Swal.fire({
          title: "Update Profile Failed",
          text: error?.response?.data?.message ?? "Something wrong in our app",
          icon: "error",
        })
      })
  }

  const handleUpdateProfilePicture = () => {
    const formData = new FormData()
    formData.append("photo", profile_picture)
    axios
      .patch(`${process.env.REACT_APP_API_URL}/users/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Success Update Profile Picture!",
          text: "Success Update Profile Picture!",
          icon: "success",
        }).then(() => {
          window.location.href = "/profile"
        })
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          title: "Error!",
          text: error?.response?.data?.message ?? "Something wrong in our App!",
          icon: "error",
        })
      })
  }

  return (
    <div className="" style={{ backgroundColor: "#eeeeee" }}>
      {/* Navbar */}
      <Navbar style={{ zIndex: 100, BackgroundColor: "white" }} />

      <div className="container-fluide d-flex ProfileBg">
        {/* control Profile lift */}
        <MenuLifeProfile
          fullname={profile.fullname}
          profilepicture={profile.profile_picture}
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
            <h5>My Profile</h5>

            <p className="text-muted">Manage your profile information</p>
            <hr />

            <div className="d-flex justify-content-evenly ProfileBgRightTotal">
              {/* content right */}
              <div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div class="row mb-3">
                    <label
                      for="name"
                      class="col-sm-2 col-form-label text-muted"
                    >
                      Name
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="Name"
                        class="form-control"
                        id="Name"
                        defaultValue={profile.fullname}
                        onChange={(e) => {
                          setFullname(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label
                      for="inputEmail3"
                      class="col-sm-2 col-form-label text-muted"
                    >
                      Email
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail3"
                        defaultValue={profile.email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label
                      for="Phone_Number"
                      class="col-sm-2 col-form-label text-muted"
                    >
                      Phone Number
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="number"
                        class="form-control"
                        id="Phone_Number"
                        defaultValue={profile.phone_number}
                        onChange={(e) => {
                          setPhonenumber(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <fieldset class="row mb-3">
                    <legend class="col-form-label col-sm-2 pt-0 text-muted">
                      Gender
                    </legend>
                    <div class="col-sm-10">
                      [{profile.gender}]
                      <div class="form-check form-check-inline ms-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="Male"
                          onChange={(e) => {
                            setGender(e.target.value)
                          }}
                        />
                        <label
                          class="form-check-label text-muted"
                          for="inlineRadio1"
                        >
                          Male
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="Female"
                          onChange={(e) => {
                            setGender(e.target.value)
                          }}
                        />
                        <label
                          class="form-check-label text-muted"
                          for="inlineRadio2"
                        >
                          Female
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  <div class="row mb-3">
                    <label
                      for="Date"
                      class="col-sm-2 col-form-label text-muted"
                    >
                      Date
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="text-muted rounded "
                        defaultValue={profile?.date_of_birth?.split("T")[0]}
                        onChange={(e) => {
                          setDateofbirth(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-danger"
                    style={{ borderRadius: "10px", width: "38%" }}
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                </form>
              </div>

              {/* list center */}
              <div className="garisHorizontal boder-muted"></div>

              {/* content Right */}
              <div className="d-flex flex-column align-items-center">
                <img
                  src={profile.profile_picture}
                  className="ImgProfileRight mb-3"
                  alt="Foto Profile"
                />
                <input
                  type="file"
                  onChange={(e) => setProfilepicture(e.target.files[0])}
                />
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  onClick={handleUpdateProfilePicture}
                >
                  Update image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
