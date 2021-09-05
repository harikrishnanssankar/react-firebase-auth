import { Route, Switch } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import './App.css'
import SignupPage from "./screens/SignupPage";
import HomePage from "./screens/HomePage";
import EditPage from "./screens/EditPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <ProtectedRoute path='/edit' component={EditPage} />
        <ProtectedRoute exact path='/' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
