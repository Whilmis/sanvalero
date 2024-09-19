import React from 'react';
import './calificacionesEComponent.css'

const CalificacionesEComponent = () => {
  // Ejemplo de datos de calificaciones por asignatura
  const grades = [
    {
      subject: 'Matemáticas',
      firstPartial: 14,
      secondPartial: 13,
      thirdPartial: 28,
      participation: 38
    },
    {
      subject: 'Física',
      firstPartial: 13,
      secondPartial: 12,
      thirdPartial: 27,
      participation: 35
    },
    {
      subject: 'Química',
      firstPartial: 15,
      secondPartial: 14,
      thirdPartial: 30,
      participation: 40
    }
  ];

  return (
    <div>
      <h1>Consulta de Calificaciones</h1>
      <table>
        <thead>
          <tr>
            <th>Asignatura</th>
            <th>Primer Parcial (15%)</th>
            <th>Segundo Parcial (15%)</th>
            <th>Tercer Parcial (30%)</th>
            <th>Participación y Asistencia (40%)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => {
            const total = grade.firstPartial + grade.secondPartial + grade.thirdPartial + grade.participation;
            return (
              <tr key={index}>
                <td>{grade.subject}</td>
                <td>{grade.firstPartial}</td>
                <td>{grade.secondPartial}</td>
                <td>{grade.thirdPartial}</td>
                <td>{grade.participation}</td>
                <td>{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CalificacionesEComponent;