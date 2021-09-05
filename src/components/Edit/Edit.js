import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import db, { auth } from "../../firebase";
import { AuthContext } from "../../store/userContext";
import "./Edit.css";

const Edit = () => {
  const history = useHistory()
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [err, setErr] = useState('')
  const [userDetails, setUserDetails] = useState({
    age: "",
    companydetails: "",
    companyname: "",
    name: "",
  });
  useEffect(() => {
    db.collection("users")
      .doc(`${user?.uid}`)
      .onSnapshot((snapshot) => {
        setUserDetails(snapshot.data());
      });
    return () => { };
  }, [user]);

  const handleProfileUpdate = () => {
    db.collection("users")
      .doc(`${user.uid}`)
      .update({
        ...userDetails,
        name: userDetails.name,
        age: userDetails.age,
        companyname: userDetails.companyname,
        companydetails: userDetails.companydetails,
      })
      .then(alert('profile updated'));
  };
  const handleUpdatePassword = () => {
    if (password.length >= 6) {
      if (password2 === password) {
        auth.currentUser.updatePassword(password).then(res => {
          alert('password updated')
        }).catch(err => alert(err.message))
      }else{
        setErr('Passwords not matching')
      }
    }else{
      setErr('Enter password more than 6 letters')
    }
  }

  if(!userDetails){
    return <div>Loading...</div>
  }
  return (
    <div className="edit__container">
      <p onClick={() => history.push('/')} >Home</p>
      <h1>Edit Profile</h1>
      <div className="edit__profile">
        <h3>Profile details</h3>
        <input
          onChange={(e) =>
            setUserDetails({ ...userDetails, name: e.target.value })
          }
          type="text"
          placeholder="Name"
          value={userDetails.name}
        />
        <input
          onChange={(e) =>
            setUserDetails({ ...userDetails, age: e.target.value })
          }
          type="number"
          placeholder="Age"
          value={userDetails.age}
        />
        <input
          onChange={(e) =>
            setUserDetails({ ...userDetails, companyname: e.target.value })
          }
          type="text"
          placeholder="Company Name"
          value={userDetails.companyname}
        />
        <input
          onChange={(e) =>
            setUserDetails({ ...userDetails, companydetails: e.target.value })
          }
          type="text"
          placeholder="Company Type"
          value={userDetails.companydetails}
        />
        <button onClick={handleProfileUpdate}>Update</button>
      </div>
      <div className="edit__password" >
        <h3>Password</h3>
        <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="Enter password" />
        <input onChange={(e) => setPassword2(e.target.value)} type="password" value={password2} placeholder="Retype password" />
        {err && <p>{err}</p> }
        <button onClick={handleUpdatePassword} >Update Password</button>
      </div>
    </div>
  );
};

export default Edit;
