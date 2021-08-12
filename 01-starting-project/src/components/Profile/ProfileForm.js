import { useRef, useContext } from "react";
import { useHistory } from "react-router";

import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const newPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // Validate

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCFGez5eHFf9n_5lZtP2BnE0DVnFQMiFg4",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
          // 'Authorization' : 'Bearer abc'
        },
      }
    ).then((response) => {
      history.replace("/");
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
