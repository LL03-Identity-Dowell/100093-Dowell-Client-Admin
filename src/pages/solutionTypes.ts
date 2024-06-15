export type FormInputs = {
  processName: string,
processId: string,
predecessor: string,
product: string,
portfolio: string,
teammember: string,
user: string,
public: string,
successer: string,
notes: string,
};

export type LinkLandingInput = {
  id: string,
  form: string,
  email: string,
  username : string,
  weight:number,
}

export type DepartmentInput = {
  departmentName:string,
  departmentId:number ,
  departmentHead:string[],
}

export type ClassInput = {
  className:string,
  portfolio:string
}
export type BusInput = {
  busNumber:string,
  portfolio:string
  admin:string
}
export type TeacherInput = {
  teacherName:string,
  departmentName:string,
}
export type StudentInput = {
  studentName:string,
  departmentName:string,
  className:string,
  busNumber:number
}
