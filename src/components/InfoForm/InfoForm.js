import React, { useEffect, useState } from "react";
import classes from "./../InfoForm/InfoForm.module.css";
import { connect } from "react-redux";

const InfoForm = (props) => {
  console.log(props);
  const inititalUserInput = {
    studentID: "",
    fullName: "",
    phoneNumber: "",
    email: "",
  };

  const [userInput, setUserInput] = useState(inititalUserInput);
  const [studentIdError, setStudentIdError] = useState();
  const [fullNameIsValid, setFullNameIsValid] = useState();
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState();
  const [emailIsValid, setEmailIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(fullNameIsValid && phoneNumberIsValid && emailIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [fullNameIsValid, phoneNumberIsValid, emailIsValid]);

  useEffect(() => {
    if (Object.keys(props.updatedStudent).length !== 0) {
      setUserInput({
        studentID: `${props.updatedStudent.studentID}`,
        fullName: `${props.updatedStudent.fullName}`,
        phoneNumber: `${props.updatedStudent.phoneNumber}`,
        email: `${props.updatedStudent.email}`,
      });
    }
  }, [props.updatedStudent]);

  const inputChangeHandler = (input, value) => {
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [input]: value,
      };
    });
  };

  const validateStudentIDHandler = () => {
    let students = [...props.students];
    let index = students.findIndex(
      (student) => student.studentID === userInput.studentID
    );

    if (userInput.studentID.length === 0) {
      setStudentIdError({
        message: "Please enter a student ID.",
      });
    } else if (index !== -1) {
      setStudentIdError({
        message: "ID already exists. Please enter an another ID.",
      });
    } else {
      setStudentIdError(null);
    }
  };

  const validateFullNameHandler = () => {
    if (userInput.fullName.match(/^[\p{L} ]+$/u)) {
      setFullNameIsValid(true);
    } else {
      setFullNameIsValid(false);
    }
  };

  const validatePhoneNumberHandler = () => {
    if (userInput.phoneNumber.match(/^\d{10}$/)) {
      setPhoneNumberIsValid(true);
    } else {
      setPhoneNumberIsValid(false);
    }
  };

  const validateEmailHandler = () => {
    if (
      userInput.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.addStudent(userInput);

    setUserInput(inititalUserInput);

    setStudentIdError(null);
    setFullNameIsValid(null);
    setPhoneNumberIsValid(null);
    setEmailIsValid(null);
    setFormIsValid(false);
  };

  const updateHandler = (userInput) => {
    props.updateStudent(userInput);

    setUserInput(inititalUserInput);
    setStudentIdError(null);
    setFullNameIsValid(null);
    setPhoneNumberIsValid(null);
    setEmailIsValid(null);
  };

  const cancelHandler = () => {
    props.updateStudent({});

    setUserInput(inititalUserInput);
    setStudentIdError(null);
    setFullNameIsValid(null);
    setPhoneNumberIsValid(null);
    setEmailIsValid(null);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className="row g-3 mb-3">
        <div
          className={`${
            studentIdError &&
            Object.keys(props.updatedStudent).length === 0 &&
            classes.invalid
          } col`}
        >
          <label htmlFor="studentID" className="form-label">
            Student ID
          </label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            id="studentID"
            value={userInput["studentID"]}
            onChange={(event) => {
              inputChangeHandler("studentID", event.target.value);
            }}
            onBlur={validateStudentIDHandler}
            readOnly={
              Object.keys(props.updatedStudent).length !== 0 ? true : false
            }
          />
          {studentIdError && Object.keys(props.updatedStudent).length === 0 && (
            <div
              id="studentIDHelp"
              className={`${classes.messageText} form-text`}
            >
              {studentIdError &&
                Object.keys(props.updatedStudent).length === 0 &&
                studentIdError.message}
            </div>
          )}
        </div>

        <div
          className={`${fullNameIsValid === false ? classes.invalid : ""} col`}
        >
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            id="fullName"
            value={userInput["fullName"]}
            onChange={(event) => {
              inputChangeHandler("fullName", event.target.value);
            }}
            onBlur={validateFullNameHandler}
          />
          {fullNameIsValid === false ? (
            <div
              id="fullNameHelp"
              className={`${classes.messageText} form-text`}
            >
              Please enter a valid name.
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div
          className={`${
            phoneNumberIsValid === false ? classes.invalid : ""
          } col`}
        >
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            id="phoneNumber"
            value={userInput["phoneNumber"]}
            onChange={(event) => {
              inputChangeHandler("phoneNumber", event.target.value);
            }}
            onBlur={validatePhoneNumberHandler}
          />
          {phoneNumberIsValid === false ? (
            <div
              id="phoneNumberHelp"
              className={`${classes.messageText} form-text`}
            >
              Please enter a valid phone number.
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={`${emailIsValid === false ? classes.invalid : ""} col`}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            placeholder=""
            id="email"
            value={userInput["email"]}
            onChange={(event) => {
              inputChangeHandler("email", event.target.value);
            }}
            onBlur={validateEmailHandler}
          />
          {emailIsValid === false ? (
            <div id="emailHelp" className={`${classes.messageText} form-text`}>
              Please enter a valid email.
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={classes.actions}>
        {Object.keys(props.updatedStudent).length !== 0 && (
          <button
            type="reset"
            className={`${classes.buttonAlt} btn btn-primary`}
            onClick={() => {
              cancelHandler(userInput);
            }}
          >
            Cancel
          </button>
        )}
        {Object.keys(props.updatedStudent).length === 0 ? (
          <button
            type="submit"
            className={`${classes.button} btn btn-primary`}
            disabled={!formIsValid}
          >
            Add Student
          </button>
        ) : (
          <button
            type="button"
            className={`${classes.button} btn btn-primary`}
            onClick={() => {
              updateHandler(userInput);
            }}
          >
            Update
          </button>
        )}
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    students: state.students.students,
    updatedStudent: state.students.updatedStudent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (student) => {
      const action = {
        type: "ADD_STUDENT",
        payload: student,
      };
      dispatch(action);
    },
    updateStudent: (student) => {
      const action = {
        type: "UPDATE_STUDENT",
        payload: student,
      };
      dispatch(action);
    },
  };
};

const ReduxComponent = connect(mapStateToProps, mapDispatchToProps)(InfoForm);

export default ReduxComponent;
