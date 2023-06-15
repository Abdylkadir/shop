import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleForm, updateUser } from "../../store/userSlice/userSlice";
import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleInput = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNotEmpty = Object.values(values).every((item) => item);

    if (!isNotEmpty) return;

    dispatch(updateUser(values));
  };

  const handleClick = () => {
    dispatch(toggleForm(true));
  };

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span className={styles.signup} onClick={handleClick}>
          You need to sign up <span>(click on me)</span>
        </span>
      ) : (
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
              type="name"
              placeholder="Your name"
              name="name"
              value={values.name}
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

          <div className={styles.group}>
            <input
              type="avatar"
              placeholder="Your avatar"
              name="avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleInput}
              required
            />
          </div>

          <button type="submit" className={styles.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
