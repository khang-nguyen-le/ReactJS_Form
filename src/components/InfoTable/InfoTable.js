import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import classes from "./InfoTable.module.css";

const InfoTable = (props) => {
  const [users, setUsers] = useState({
    filteredStudents: [],
    searchTerm: "",
  });

  useEffect(() => {
    setUsers((prevState) => {
      return {
        ...prevState,
        filteredStudents: props.students,
      };
    });
  }, [props.students]);

  useEffect(() => {
    setUsers((prevState) => {
      return {
        ...prevState,
        filteredStudents: props.students.filter((student) =>
          student.fullName.includes(users.searchTerm)
        ),
      };
    });
  }, [users.searchTerm]);

  const deleteStudentHandler = (student) => {
    props.deleteStudent(student);
  };

  const getStudentHandler = (student) => {
    props.getStudent(student);
  };

  const searchStudentHandler = (event) => {
    setUsers((prevState) => {
      return {
        ...prevState,
        searchTerm: event.target.value,
      };
    });
  };

  return (
    <>
      <div className={`${classes.searchBox} my-3 mx-auto`}>
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for students..."
            onChange={searchStudentHandler}
          />
        </div>
      </div>

      <table
        className={`${classes.result} table text-white table-borderless table-hover`}
      >
        <thead>
          <tr>
            <th scope="col">Student ID</th>
            <th scope="col">Fullname</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.filteredStudents.map((student) => {
            return (
              <tr key={student.studentID}>
                <td>{student.studentID}</td>
                <td>{student.fullName}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.email}</td>
                <td className={classes.actions}>
                  <button
                    className={`${classes.buttonIcon} btn btn-dark btn-sm`}
                    onClick={() => {
                      getStudentHandler(student);
                    }}
                  >
                    <i className="fa fa-pencil-alt" />
                  </button>
                  <button
                    className={`${classes.buttonIcon} btn btn-dark btn-sm`}
                    onClick={() => {
                      deleteStudentHandler(student);
                    }}
                  >
                    <i className="fa fa-trash-alt" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    students: state.students.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (student) => {
      const action = {
        type: "DELETE_STUDENT",
        payload: student,
      };
      dispatch(action);
    },
    getStudent: (student) => {
      const action = {
        type: "GET_STUDENT",
        payload: student,
      };
      dispatch(action);
    },
  };
};

const ReduxComponent = connect(mapStateToProps, mapDispatchToProps)(InfoTable);

export default ReduxComponent;
