import React, { useState } from 'react';
import './administrarM.css';

const subjects = [
    { id: 1, name: 'Matemáticas', code: 'MAT101' },
    { id: 2, name: 'Física', code: 'PHY101' },
    { id: 3, name: 'Química', code: 'CHE101' }
  ];
  
  const initialGrades = {
    MAT101: [
      { id: 1, name: 'Carlos Pérez', partial1: 10, partial2: 12, partial3: 25, participation: 30 },
      { id: 2, name: 'Ana Gómez', partial1: 12, partial2: 14, partial3: 28, participation: 36 }
    ],
    PHY101: [
      { id: 3, name: 'Juan Rodríguez', partial1: 8, partial2: 10, partial3: 20, participation: 25 },
      { id: 4, name: 'María Martínez', partial1: 14, partial2: 13, partial3: 26, participation: 35 }
    ],
    CHE101: [
      { id: 5, name: 'Luis Sánchez', partial1: 15, partial2: 15, partial3: 30, participation: 40 },
      { id: 6, name: 'Elena Ramírez', partial1: 13, partial2: 12, partial3: 28, participation: 38 }
    ]
  };
  
  const AdministrarMComponent = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [grades, setGrades] = useState(initialGrades);
  
    const handleSubjectSelect = (subject) => {
      setSelectedSubject(subject);
      setSelectedStudent(null);
    };
  
    const handleStudentSelect = (student) => {
      setSelectedStudent(student);
    };
  
    const handleGradeChange = (e, part) => {
      const { value } = e.target;
      setSelectedStudent(prevStudent => ({
        ...prevStudent,
        [part]: value
      }));
    };
  
    const updateGrade = () => {
      const updatedStudents = grades[selectedSubject.code].map(student =>
        student.id === selectedStudent.id ? selectedStudent : student
      );
      setGrades(prevGrades => ({
        ...prevGrades,
        [selectedSubject.code]: updatedStudents
      }));
      setSelectedStudent(null);
    };
  
    return (
      <div className="dashboard-container">
        <h1>Panel del Maestro</h1>
        <div className="tables-container">
          <div className="table-wrapper">
            <h2>Materias Impartidas</h2>
            <table >
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map(subject => (
                  <tr key={subject.id}>
                    <td>{subject.code}</td>
                    <td>{subject.name}</td>
                    <td>
                      <button onClick={() => handleSubjectSelect(subject)}>Ver Estudiantes</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedSubject && (
            <div className="table-wrapper">
              <h2>Estudiantes de {selectedSubject.name}</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Parcial 1</th>
                    <th>Parcial 2</th>
                    <th>Parcial 3</th>
                    <th>Participación</th>
                    <th>Total</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {grades[selectedSubject.code].map(student => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.partial1}</td>
                      <td>{student.partial2}</td>
                      <td>{student.partial3}</td>
                      <td>{student.participation}</td>
                      <td>{student.partial1 + student.partial2 + student.partial3 + student.participation}</td>
                      <td>
                        <button onClick={() => handleStudentSelect(student)}>Actualizar Nota</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {selectedStudent && (
            <div className="update-grade-form">
              <h2>Actualizar Nota de {selectedStudent.name}</h2>
              <label>
                Parcial 1 (15 puntos):
                <input type="number" max="15" value={selectedStudent.partial1} onChange={(e) => handleGradeChange(e, 'partial1')} />
              </label>
              <label>
                Parcial 2 (15 puntos):
                <input type="number" max="15" value={selectedStudent.partial2} onChange={(e) => handleGradeChange(e, 'partial2')} />
              </label>
              <label>
                Parcial 3 (30 puntos):
                <input type="number" max="30" value={selectedStudent.partial3} onChange={(e) => handleGradeChange(e, 'partial3')} />
              </label>
              <label>
                Participación y Asistencia (40 puntos):
                <input type="number" max="40" value={selectedStudent.participation} onChange={(e) => handleGradeChange(e, 'participation')} />
              </label>
              <button onClick={updateGrade}>Guardar</button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default AdministrarMComponent;