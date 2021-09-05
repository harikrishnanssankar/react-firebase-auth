import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import db, { auth } from "../../firebase";
import { AuthContext } from "../../store/userContext";
import "./Home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState({});
  const history = useHistory();



  const fetchDetails = async () => {
    setLoading(true)
    const response = await db.collection("users").doc(`${user?.uid}`).get()
    setUserDetails(response.data());
    setLoading(false)
  }


  useEffect(() => {
    fetchDetails()
    return () => { };
  }, [user]);


  if (loading) {
    return <h1>Loading...</h1>
  }
  return (
    <div className="home__container">
      <div className="home__title">
        <h1>Welcome {userDetails?.name}</h1>
        <div>
          <button onClick={() => history.push('/edit')} >Edit Profile</button>
          <button style={{ backgroundColor: 'red' }} onClick={() => { auth.signOut(); history.push('/login') }} >Logout</button>
        </div>
      </div>
      <div className="home__details">
        <h2>Profile Details</h2>
        <h3>Name: {userDetails?.name}</h3>
        <h3>Username: {userDetails?.username}</h3>
        <h3>Age: {userDetails?.age}</h3>
        <h2>Company Details</h2>
        <h3>Name: {userDetails?.companyname}</h3>
        <h3>Type: {userDetails?.companydetails}</h3>
      </div>
    </div>
  );
};

export default Home;
