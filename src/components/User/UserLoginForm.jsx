import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./User.module.css";
import { loginUser } from "../../store/userSlice/userSlice";

const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInput = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNotEmpty = Object.values(values).every((item) => item);

    if (!isNotEmpty) return;
    dispatch(loginUser(values));
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Sign In</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={values.email}
            autoComplete="on"
            onChange={handleInput}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleInput}
            required
          />
        </div>

        <div
          className={styles.link}
          onClick={() => toggleCurrentFormType("signup")}
        >
          Create an account
        </div>

        <button type="submit" className={styles.submit}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;
