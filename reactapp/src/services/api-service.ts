import User from "../models/user.js";
import { createGuid } from "../utils/utils.js";
import { postData, getData, deleteData } from "./call-api.js";

export const login = async (username: string, password: string) => {
  return await postData("auth", { username: username, password: password });
}

export const getSubjects = async () => {
  return await getData("subject");
}

export const deleteSubject = async (id: string) => {
  return await deleteData(`subject?id=${id}`);
}

export const addSubject = async (subject: { name: string }) => {
  return await postData("subject", { id: createGuid(), name: subject.name});
}

export const getStudents = async () => {
  return await getData("student");
}

export const deleteStudent = async (id: string) => {
  return await deleteData(`student?id=${id}`);
}

export const addStudent = async (student: { firstName: string, lastName: string, email: string }) => {
  return await postData("student", { id: createGuid(), firstName: student.firstName, lastName: student.lastName, emailAddress: student.email});
}

export const getMyGrades = async (user: User) => {
  return await getData(`student/getstudentgrade?id=${user.studentId}`);
}