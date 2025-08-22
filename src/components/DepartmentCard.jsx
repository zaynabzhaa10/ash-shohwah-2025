import React from 'react';

function DepartmentCard({ title, description }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px 0',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9'
    }}>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}

export default DepartmentCard;