import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(res => {
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user
        });
      })
      .catch(err => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://image.flaticon.com/icons/png/512/124/124034.png"
          alt=""
        />
        <div className="login__Text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
