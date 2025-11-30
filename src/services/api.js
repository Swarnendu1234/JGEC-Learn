const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://jgec-learn-backend.vercel.app' : '/api');

// Helper function to handle API errors
const handleApiError = (error, endpoint) => {
  console.error(`❌ API Error [${endpoint}]:`, error);
  
  // Check if it's a network error (backend not running)
  if (!error.status && error instanceof TypeError) {
    console.error('⚠️ Backend server may not be running. Check server logs.');
    throw new Error('Backend server is not available. Make sure the server is running on port 3000.');
  }
  
  throw error;
};

export const fetchCourses = async () => {
  try {
    console.log('📡 Fetching courses from:', `${API_BASE}/courses`);
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Courses fetched successfully:', data.length, 'courses');
    return data;
  } catch (error) {
    handleApiError(error, 'GET /api/courses');
  }
};

export const addCourse = async (course) => {
  try {
    console.log('📡 Adding course:', course.title);
    const response = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Course added successfully:', data);
    return data;
  } catch (error) {
    handleApiError(error, 'POST /api/courses');
  }
};

export const deleteCourse = async (id) => {
  try {
    console.log('📡 Deleting course ID:', id);
    const response = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Course deleted successfully:', data);
    return data;
  } catch (error) {
    handleApiError(error, `DELETE /api/courses/${id}`);
  }
};


export const fetchCourseDetails = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE}/courses/${courseId}/details`);
    if (!response.ok) throw new Error('Failed to fetch course details');
    return await response.json();
  } catch (error) {
    handleApiError(error, `GET /api/courses/${courseId}/details`);
  }
};

export const updateModuleProgress = async (courseId, moduleId, completed) => {
  try {
    const response = await fetch(`${API_BASE}/courses/${courseId}/modules/${moduleId}/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    return await response.json();
  } catch (error) {
    handleApiError(error, `PUT /api/courses/${courseId}/modules/${moduleId}/progress`);
  }
};

export const saveUserNote = async (courseId, moduleId, note) => {
  try {
    const response = await fetch(`${API_BASE}/courses/${courseId}/modules/${moduleId}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note })
    });
    return await response.json();
  } catch (error) {
    handleApiError(error, `POST /api/courses/${courseId}/modules/${moduleId}/notes`);
  }
};

export const fetchUserNotes = async (courseId, moduleId) => {
  try {
    const response = await fetch(`${API_BASE}/courses/${courseId}/modules/${moduleId}/notes`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.note;
  } catch (error) {
    console.error('Error fetching notes:', error);
    return null;
  }
};

export const updateVideoProgress = async (courseId, moduleId, progress) => {
  try {
    await fetch(`${API_BASE}/courses/${courseId}/modules/${moduleId}/video-progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress })
    });
  } catch (error) {
    console.error('Error updating video progress:', error);
  }
};
