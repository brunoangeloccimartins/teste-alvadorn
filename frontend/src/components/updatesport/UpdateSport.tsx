import React, { useState } from 'react';
import './UpdateSport.css';

const UpdateSport: React.FC = () => {
  const [sportId, setSportId] = useState<number | null>(null);
  const [sportName, setSportName] = useState('');
  const [sport, setSport] = useState({
    id: 0,
    name: '',
    description: '',
    country: '',
    players: 0,
  });
  const [searched, setSearched] = useState(false);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/sports/findsport/${sportName}`);
      if (!response.ok) {
        throw new Error('Sport not found');
      }

      const data = await response.json();
      setSport(data);
      setSportId(data.id);
      console.log('Sport found:', data);
      setSearched(true);
    } catch (error) {
      console.error('Error fetching sport:', error);
      setSearched(false);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sportId === null) {
      return;
    }

    try {
      console.log('Updating sport with data:', sport);

      const response = await fetch(`http://localhost:3000/sports/${sportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sport),
      });

      if (!response.ok) {
        throw new Error('Failed to update sport');
      }

      alert('Sport updated successfully');
      setSportName('');
      setSport({ id: 0, name: '', description: '', country: '', players: 0 });
      setSportId(null);
      setSearched(false);
    } catch (error) {
      console.error('Error updating sport:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSport((prevState) => ({
      ...prevState,
      [name]: name === 'players' ? Number(value) : value,
    }));
  };

  return (
    <div>
      <div>
        <h1>Atualizar Atividade</h1>
      </div>
      <div className='updatesportcontainer'>
        <form onSubmit={handleSearchSubmit}>
          <label htmlFor='sportname'>Nome da atividade</label>
          <input
            type='text'
            id='sportname'
            name='sportname'
            value={sportName}
            onChange={(e) => setSportName(e.target.value)}
            required
          />
          <button type='submit'>Buscar</button>
        </form>

        {searched && sport.id ? (
          <form onSubmit={handleUpdateSubmit}>
            <label htmlFor='name'>Nome</label>
            <input
              type='text'
              id='name'
              name='name'
              value={sport.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='description'>Descrição</label>
            <input
              type='text'
              id='description'
              name='description'
              value={sport.description}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='country'>País de origem</label>
            <input
              type='text'
              id='country'
              name='country'
              value={sport.country}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='players'>Número de jogadores</label>
            <input
              type='number'
              id='players'
              name='players'
              value={sport.players}
              onChange={handleInputChange}
              required
            />
            <button type='submit'>Atualizar</button>
          </form>
        ) : searched ? (
          <p>Nenhuma atividade encontrada</p>
        ) : null}
      </div>
    </div>
  );
};

export default UpdateSport;
