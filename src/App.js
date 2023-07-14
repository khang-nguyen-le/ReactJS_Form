import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import InfoForm from "./components/InfoForm/InfoForm";
import InfoTable from "./components/InfoTable/InfoTable";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    if (props.students.length > 0) {
      setIsAddedData(true)
    }
  }, [props.students])

  const [isAddedData, setIsAddedData] = useState(false);

  return (
    <>
      <Header />
      <InfoForm />
      {!isAddedData && <p style={{ textAlign: 'center' }}>No student added yet.</p>}
      {isAddedData && <InfoTable />}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    students: state.students.students
  }
}

const ReduxComponent = connect(mapStateToProps)(App);

export default ReduxComponent;