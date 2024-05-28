import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teacher: {
        "workspace_id":"",
        "teacher_name":"",
        "dept_name":""
    },
  },
  reducers: {
    getteacher(_state, action) {
      return action.payload;
    },
  },
});

export default teacherSlice.reducer;

export const { getteacher } = teacherSlice.actions;
