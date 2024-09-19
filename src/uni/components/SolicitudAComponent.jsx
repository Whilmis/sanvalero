import React, { useState } from 'react';

const initialTeacherRequests = [
  { id: 1, teacherName: 'Juan Pérez', subject: 'Matemáticas', status: 'Pendiente' },
  { id: 2, teacherName: 'María Gómez', subject: 'Física', status: 'Pendiente' },
  { id: 3, teacherName: 'Ana Ramírez', subject: 'Química', status: 'Rechazado' }
];

const initialStudentRequests = [
  { id: 1, studentName: 'Carlos López', subject: 'Historia', status: 'Pendiente', paymentStatus: 'Pendiente' },
  { id: 2, studentName: 'Laura Torres', subject: 'Literatura', status: 'Pendiente', paymentStatus: 'Pendiente' },
  { id: 3, studentName: 'José Rodríguez', subject: 'Biología', status: 'Pendiente', paymentStatus: 'Completado' }
];

const SolicitudAComponent = () => {
  const [teacherRequests, setTeacherRequests] = useState(initialTeacherRequests);
  const [studentRequests, setStudentRequests] = useState(initialStudentRequests);

  const approveTeacherRequest = (id) => {
    setTeacherRequests(teacherRequests.map(request => 
      request.id === id ? { ...request, status: 'Aprobado' } : request
    ));
  };

  const approveStudentRequest = (id) => {
    setStudentRequests(studentRequests.map(request =>
      request.id === id && request.paymentStatus === 'Completado' 
      ? { ...request, status: 'Aprobado' } 
      : request
    ));
  };

  const markPaymentAsCompleted = (id) => {
    setStudentRequests(studentRequests.map(request =>
      request.id === id ? { ...request, paymentStatus: 'Completado' } : request
    ));
  };

  return (
    <div>
      <h1>Solicitudes de Materias</h1>

      <h2>Solicitudes de Maestros</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del Maestro</th>
            <th>Materia Solicitada</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {teacherRequests.map(request => (
            <tr key={request.id}>
              <td>{request.teacherName}</td>
              <td>{request.subject}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'Pendiente' && (
                  <>
                  <button onClick={() => approveTeacherRequest(request.id)}>Aprobar</button>
                  <button onClick={() => approveTeacherRequest(request.id)}>Cancelar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Solicitudes de Estudiantes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del Estudiante</th>
            <th>Materia Solicitada</th>
            <th>Estado</th>
            <th>Estado del Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {studentRequests.map(request => (
            <tr key={request.id}>
              <td>{request.studentName}</td>
              <td>{request.subject}</td>
              <td>{request.status}</td>
              <td>{request.paymentStatus}</td>
              <td>
                {request.paymentStatus === 'Pendiente' && (
                  <>
                  <button onClick={() => markPaymentAsCompleted(request.id)}> Pago Realizado</button>
                  <button onClick={() => approveTeacherRequest(request.id)}>Cancelar</button>
                  </>
                )}
                {request.status === 'Pendiente' && request.paymentStatus === 'Completado' && (
                    <>
                    <button onClick={() => approveTeacherRequest(request.id)}>Aprobar</button>
                    <button onClick={() => approveTeacherRequest(request.id)}>Cancelar</button>
                    </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SolicitudAComponent;