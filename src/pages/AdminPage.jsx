import React, { useState, useEffect } from 'react';
import AdminPanel from '../components/AdminPanel';
import { fetchCourses } from '../services/api';

const AdminPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then(setCourses);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <AdminPanel 
        isOpen={true}
        onClose={() => window.location.href = '/'}
        coursesData={courses}
        onUpdateCourses={setCourses}
      />
    </div>
  );
};

export default AdminPage;