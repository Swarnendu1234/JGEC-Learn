const API_URL = 'http://localhost:3000/api';

export const fetchCourses = async () => {
  const response = await fetch(`${API_URL}/courses`);
  return response.json();
};

export const addCourse = async (course) => {
  const response = await fetch(`${API_URL}/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  });
  return response.json();
};

export const deleteCourse = async (id) => {
  const response = await fetch(`${API_URL}/courses/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};