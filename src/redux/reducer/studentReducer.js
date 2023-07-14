const initialState = {
    students: [],
    updatedStudent: {}
}

export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_STUDENT': {
            const newStudents = [...state.students]
            newStudents.push(action.payload)
            return { ...state, students: newStudents }
        }
        case 'DELETE_STUDENT': {
            const newStudents = [...state.students]
            const updatedStudents = newStudents.filter(student => student.studentID !== action.payload.studentID)
            return { ...state, students: updatedStudents }
        }
        case 'GET_STUDENT': {
            const newStudents = [...state.students]
            const updatedStudent = newStudents.find(student => student.studentID === action.payload.studentID)
            return { ...state, updatedStudent: updatedStudent }
        }
        case 'UPDATE_STUDENT': {
            const newStudents = [...state.students]
            const index = newStudents.findIndex(student => student.studentID === action.payload.studentID)

            if (index !== -1) {
                newStudents[index] = action.payload
            }

            return { ...state, students: newStudents, updatedStudent: {} }
        }
        default:
            return state
    }
}