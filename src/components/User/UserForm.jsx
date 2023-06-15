import React from "react";
import { useDispatch, useSelector } from "react-redux";

import UserLoginForm from "./UserLoginForm";

import styles from "./User.module.css";
import UserSignupForm from "./UserSignupForm";
import { toggleForm, toggleTypeForm } from "../../store/userSlice/userSlice";

const UserForm = () => {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector(({ user }) => user);
  console.log(formType);

  const closeForm = () => dispatch(toggleForm(false));
  const toggleCurrentFormType = (type) => dispatch(toggleTypeForm(type));

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm} />
      {formType === "signup" ? (
        <UserSignupForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      ) : (
        <UserLoginForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      )}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
