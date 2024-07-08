import React, { useState, useEffect } from 'react';
import './GetAllSports.css';
import Sport from '../../types/SportType';


const GetAllSports: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await fetch('http://localhost:3000/sports'); // Substitua pela URL correta da sua rota backend
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json() as Sport[];
      setSports(data);
    } catch (error) {
      console.error('Error fetching sports:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Atividades</h1>
      <div className='getallsportscontainer'>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>País de origem</th>
              <th>Número de jogadores</th>
            </tr>
          </thead>
          <tbody className='sportcard'>
            {sports.map((sport) => (
              <tr key={sport.id}>
                <td>{sport.name}</td>
                <td>{sport.description}</td>
                <td>{sport.country}</td>
                <td>{sport.players}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllSports;
