import Navbar from "../components/Navbar";
import { Button } from "@material-ui/core";
import React, { useState, useContext, useRef } from "react";
import UserContext from "../context/users/UserContext";
import axios from "axios";
import "./userSettings.css";
import { updateProfile } from "../context/users/UserActions";
import { toast } from "react-toastify";
import uploadFile from "../utils/uploadFile";
import CircularProgress from "@mui/material/CircularProgress";

function UserSettings() {
  const { user, dispatch } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem("token"));
  const [count, setCount] = React.useState(0);
  const pic = useRef();
  const cover = useRef();
  const [pfp, setPfp] = useState(user.profilePicture);
  const [coverPic, setCoverPic] = useState(user.coverPicture);
  const [userSettingData, setUserSettingData] = useState({
    name: "",
    username: "",
    email: "",
    foreignName: "",
    nativeLanguage: "English",
    foreignLanguage: "English",
    nativeProficiency: "Novice",
    foreignProficiency: "Novice",
    profilePicture: "",
    coverPicture: "",
    role: "Student",
    courses: "",
    ...user,
  });

  const onChange = async (e) => {
    setUserSettingData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let pfpUrl = user.profilePicture;
    let coverpicUrl = user.coverPicture;

    if (pfp != userSettingData.profilePicture) {
      console.log("uploading1");
      pfpUrl = await uploadFile(pfp, token);
    }
    if (coverPic != userSettingData.coverPicture) {
      console.log("uploading2");
      coverpicUrl = await uploadFile(coverPic, token);
    }

    const newUserinfo = {
      ...userSettingData,
      profilePicture: pfpUrl,
      coverPicture: coverpicUrl,
    };

    await axios
      .put("/api/users/" + user.username, newUserinfo, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        updateProfile(response.data, dispatch);
        toast.success("sucessfully updated profile");
      })
      .catch((error) => console.log(error.response.data));
  };

  const cancelChanges = () => {
    setUserSettingData((prev) => {
      return {
        name: "",
        username: "",
        email: "",
        foreignName: "",
        nativeLanguage: "English",
        foreignLanguage: "English",
        nativeProficiency: "Novice",
        foreignProficiency: "Novice",
        profilePicture: "",
        coverPicture: "",
        role: "Student",
        courses: "",
        ...user,
      };
    });
    setPfp(user.profilePicture);
    setCoverPic(user.coverPicture);
    pic.current.value = "";
    cover.current.value = "";
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (e.target.name === "profilePicture") {
        setPfp(reader.result);
      } else if (e.target.name === "coverPicture") {
        setCoverPic(reader.result);
      }
    };
  };

  return (
    <>
      <Navbar />
      <div className="userSetting">
        <form className="userSetting-form" onSubmit={onSubmit}>
          <div className="userSetting-top">
            <img src={pfp} alt="pic" className="userSetting-pfp" />
            )
            <img src={coverPic} alt="Cover" className="userSetting-cover" />
          </div>
          <h1>Profile Setting</h1>
          <h2 className="setting-subheading">Personal Info</h2>
          <h4 className="setting-description">
            Update your photo and personal details
          </h4>
          {/* User setting: section 1 personal information */}
          <div className="form-section">
            <div className="form-inner-section">
              <div className="userSetting-form-info">
                <h5>Username</h5>
                <input
                  contentEditable="true"
                  placeholder="Username"
                  name="username"
                  value={userSettingData.username}
                  disabled={true}
                />
              </div>
              <div className="userSetting-form-info">
                <h5>Email</h5>
                <input
                  contentEditable="true"
                  placeholder="User email"
                  name="email"
                  value={userSettingData.email}
                  onChange={onChange}
                />
              </div>
              <div className="userSetting-form-info">
                <h5>Name</h5>
                <input
                  contentEditable="true"
                  placeholder="User name"
                  name="name"
                  value={userSettingData.name}
                  onChange={onChange}
                />
              </div>
              <div className="userSetting-form-info">
                <h5>Foreign Name</h5>
                <input
                  contentEditable="true"
                  placeholder="Foreign Name"
                  name="foreignName"
                  value={userSettingData.foreignName}
                  onChange={onChange}
                />
              </div>
            </div>

            <h5>Upload a profile picture</h5>
            <input
              type="file"
              accept="image/*"
              name="profilePicture"
              id="input"
              ref={pic}
              onChange={handleFileInput}
            />

            <h5>Upload a cover picture</h5>
            <input
              type="file"
              accept="image/*"
              name="coverPicture"
              id="input"
              ref={cover}
              onChange={handleFileInput}
            />
          </div>

          <br></br>
          {/* User setting: section 2 profile userSetting-form-information */}
          <h2 className="setting-subheading">Profile</h2>
          <h4 className="setting-description">Update your profile</h4>
          <div className="form-section">
            <div className="form-inner-section">
              <h5>Bio</h5>
              <textarea
                id="bio"
                name="bio"
                className="bio"
                placeholder="Tell us something about you (such as, Quick Introduction, Hobbies, Goals"
                rows="3"
                maxLength="300"
                value={userSettingData.bio}
                onChange={(e) => {
                  setCount(e.target.value.length);
                  onChange(e);
                }}
              />
              <p>{count}/ 300</p>
              <div className="userSetting-userType">
                <h5>
                  Are you a student or teacher?
                  <select
                    id="userType"
                    name="role"
                    value={userSettingData.role}
                    onChange={onChange}
                    disabled={
                      (user.role === "Student" || user.role === "Teacher") &&
                      true
                    }
                  >
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                  </select>
                </h5>
              </div>
              <div className="userSetting-form-info">
                <h5>What is your native language?</h5>
                <select
                  id="sourceLanguage"
                  name="nativeLanguage"
                  value={userSettingData.nativeLanguage}
                  onChange={onChange}
                >
                  <option value="English">English</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="userSetting-form-info">
                <h5>What is your level of proficiency?</h5>
                <select
                  id="sourceLanguageProficiency"
                  name="nativeProficiency"
                  value={userSettingData.nativeProficiency}
                  onChange={onChange}
                >
                  <option value="Beginner">Novice</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <>
                <div className="userSetting-form-info">
                  <h5>What is your target language?</h5>
                  <select
                    id="targetLanguage"
                    name="foreignLanguage"
                    value={userSettingData.foreignLanguage}
                    onChange={onChange}
                  >
                    <option value="English">English</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
                <div className="userSetting-form-info">
                  <h5>What is your level of proficiency?</h5>
                  <select
                    id="targetLanguageProficiency"
                    name="foreignProficiency"
                    value={userSettingData.foreignProficiency}
                    onChange={onChange}
                  >
                    <option value="Beginner">Novice</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </>
            </div>
          </div>

          <div className="userSetting-save-section">
            <Button className="userSetting-btn" type="submit">
              Save
            </Button>
            <Button className="userSetting-btn" onClick={cancelChanges}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserSettings;
