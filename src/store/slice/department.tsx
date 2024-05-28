import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    department: {
        "workspace_id":"",
        "dept_name":"",
        "dept_id":"",
        "dept_head":""
    },
  },
  reducers: {
    getdepartment(_state, action) {
      return action.payload;
    },
  },
});

export default departmentSlice.reducer;

export const { getdepartment } = departmentSlice.actions;
