import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: {
        "workspace_id":"",
        "student_name":"",
        "dept_name":"",
        "class_name":"",
        "bus_num":""
    },
  },
  reducers: {
    getstudent(_state, action) {
      return action.payload;
    },
  },
});

export default studentSlice.reducer;

export const { getstudent } = studentSlice.actions;
