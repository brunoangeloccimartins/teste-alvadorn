import React, { useState } from 'react';
import './GetOneSport.css';
import Sport from '../../types/SportType';

const GetOneSport: React.FC = () => {
  
  const [sport, setSport] = useState<Sport>({
    name: '',
    description: '',
    country: '',
    players: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSport({ ...sport, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/sports/findsport/${sport.name}`);
      const data = await response.json();
      setSport(data);
    } catch (error) {
      console.error('Error fetching sport:', error);
    }
  };

  return (
    <div>
      <div>
        <h1>Buscar Atividade</h1>
      </div>
      <div className='getonesportcontainer'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Nome</label>
          <input type='text' id='name' name='name' value={sport.name} onChange={handleChange} required autoComplete='off' />
          <button type='submit'>Buscar</button>
        </form>
        <div className='resultcontainer'>
          <h2>Resultado</h2>
          <p>Nome: <span>{sport.name}</span></p>
          <p>Descrição: <span>{sport.description}</span></p>
          <p>País de origem: <span>{sport.country}</span></p>
          <p>Número de jogadores: <span>{sport.players}</span></p>
        </div>
      </div>
    </div>
  );
};

export default GetOneSport;
