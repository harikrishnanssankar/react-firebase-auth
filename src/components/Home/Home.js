import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import db, { auth } from "../../firebase";
import { AuthContext } from "../../store/userContext";
import "./Home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState([]);
  const history = useHistory()

  useEffect(() => {
    db.collection("users")
      .doc(`${user?.uid}`)
      .get()
      .then((res) => {
        setUserDetails(res.data());
      });
    return () => {};
  }, [user]);
  if (!userDetails) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="home__container">
      <div className="home__title">
        <h1>Welcome {userDetails.name}</h1>
        <div>
          <button onClick={()=> history.push('/edit')} >Edit Profile</button>
          <button style={{backgroundColor:'red'}} onClick={() => {auth.signOut(); history.push('/login')}} >Logout</button>
        </div>
      </div>
      <div className="home__details">
        <h2>Profile Details</h2>
        <h3>Name: {userDetails.name}</h3>
        <h3>Username: {userDetails.username}</h3>
        <h3>Age: {userDetails.age}</h3>
        <h2>Company Details</h2>
        <h3>Name: {userDetails.companyname}</h3>
        <h3>Type: {userDetails.companydetails}</h3>
      </div>
    </div>
  );
};

export default Home;
