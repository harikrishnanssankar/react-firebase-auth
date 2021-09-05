import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import db, { auth } from "../../firebase";
import { AuthContext } from "../../store/userContext";
import "./Signup.css";
const Signup = () => {
  const { user } = useContext(AuthContext)
  const history = useHistory();
  const [err, setErr] = useState(null);
  const [personal, setPersonal] = useState(false);
  const [company, setCompany] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [data, setData] = useState({
    username: "",
    name: "",
    age: "",
    companyname: "",
    companydetails: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
    password2: "",
    name: "",
    age: "",
    companyname: "",
    companydetails: "",
  });

  const handleResetTabs = () => {
    setPersonal(false);
    setCompany(false);
  };
  const handlePersonalTab = () => {
    setPersonal(true);
    setCompany(false);
  };
  const handleCompanyTab = () => {
    setPersonal(false);
    setCompany(true);
  };
  const handleSubmit = () => {
    auth
      .createUserWithEmailAndPassword(`${data.username}@mail.com`, password)
      .then((result) => {
        result.user.updateProfile({ displayName: data.username }).then(() => {
          db.doc(`/users/${result.user.uid}`)
            .set({
              id: result.user.uid,
              username: data.username,
              name: data.name,
              age: data.age,
              companyname: data.companyname,
              companydetails: data.companydetails,
            })
            .then(() => {
              history.push("/");
            });
        });
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const handleValidation = () => {
    if (data.username) {
      if (password && password.length > 5) {
        if (password2 === password) {
          if (data.name) {
            if (data.age) {
              if (data.companyname) {
                if (data.companydetails) {
                  handleSubmit();
                } else {
                  setError({
                    ...error,
                    companydetails: "enter company details",
                  });
                }
              } else {
                setError({
                  ...error,
                  companyname: "enter company name",
                });
              }
            } else {
              setError({
                ...error,
                age: "enter age",
              });
            }
          } else {
            setError({
              ...error,
              name: "enter name",
            });
          }
        } else {
          setError({
            ...error,
            password2: "passwords not matching",
          });
        }
      } else {
        setError({
          ...error,
          password: "enter password with length 6 letters",
        });
      }
    } else {
      setError({ ...error, username: "enter username" });
    }
  };
  const handleBack = () => {
    if (company) {
      setCompany(false);
      setPersonal(true);
    } else setPersonal(false);
  };
  const handleNext = () => {
    if (personal) {
      setCompany(true);
      setPersonal(false);
    } else {
      setPersonal(true);
    }
  };
  useEffect(() => {
    if (user) {
      history.push('/')
    }
    return () => {
      
    }
  }, [user])

  return (
    <div className="signup__container">
      <h1>SmarterVending</h1>
      <div className="signup__tabs">
        <p className={!(company||personal) ? 'activeTab' : 'nonActiveTab'} style={{display:'flex'}} onClick={handleResetTabs}>UserLogin {(error.username||error.password||error.password2) && <h3 style={{color:'red'}} >!!!</h3> } </p>
        <p className={(personal) ? 'activeTab' : "nonActiveTab"} style={{display:'flex'}} onClick={handlePersonalTab}>Personal Info {(error.name||error.age) && <h3 style={{color:'red'}} >!!!</h3> }</p>
        <p className={(company) ? 'activeTab' : 'nonActiveTab'} style={{display:'flex'}} onClick={handleCompanyTab}>Company Info {(error.companyname||error.companydetails) && <h3 style={{color:'red'}}>!!!</h3> } </p>
      </div>
      <p className="login__error">{err && ` !!!  ${err}`}</p>
      {company && (
        <div className="signup__companyTab">
          <input
            value={data.companyname}
            onChange={(e) => setData({ ...data, companyname: e.target.value })}
            type="text"
            placeholder="Enter company name"
          />
          {error.companyname && <p>{error.companyname}</p>}
          <input
            value={data.companydetails}
            onChange={(e) =>
              setData({ ...data, companydetails: e.target.value })
            }
            type="text"
            placeholder="Enter company more info"
          />
          {error.companydetails && <p>{error.companydetails}</p>}
        </div>
      )}
      {personal && (
        <div style={{display:'flex', width:'100%', columnGap:'20px'}}  className="signup__personalTab">
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            type="text"
            placeholder="Enter Name"
          />
          <input
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })}
            type="number"
            placeholder="age"
            />
            {error.name && <p>{error.name}</p>}
          {error.number && <p>{error.number}</p>}
        </div>
      )}
      {!company && !personal && (
        <div style={{width:'100%'}} className="signup__loginTab">
          <input
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            type="text"
            placeholder="username"
          />
          {error.username && <p>{error.username}</p>}
          <div style={{display:'flex', width:'100%', columnGap:'20px'}} className="signup__loginTabPasswords">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
            {error.password && <p>{error.password}</p>}
            <input
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              type="password"
              placeholder="Retype password"
            />
            {error.password2 && <p>{error.password2}</p>}
          </div>
        </div>
      )}
      <div  className="signup__btns" >
        {(personal || company) && (
          <button className="btn back__btn" onClick={handleBack}>
            Back
          </button>
        )}
        {company ? (
          <button className="btn submit__btn" onClick={handleValidation}>
            Submit
          </button>
        ) : (
          <button className="btn submit__btn" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
      <p>
        Already a member? <span style={{cursor:'pointer'}} onClick={() => history.push('/login')} className="login__paragraph"> login</span>
      </p>
    </div>
  );
};

export default Signup;
