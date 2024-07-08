import React, { FormEvent, useState } from 'react';
import './AddSport.css';

// Interface para o estado interno do componente
interface AddSportState {
  name: string;
  description: string;
  country: string;
  players: number;
  loading: boolean;
  error: string | null;
}

// Componente funcional AddSport
const AddSport: React.FC = () => {
  const [newSport, setNewSport] = useState<AddSportState>({
    name: '',
    description: '',
    country: '',
    players: 0,
    loading: false,
    error: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSport((prevState) => ({
      ...prevState,
      [name]: name === 'players' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setNewSport((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }));

    const sportData = {
      name: newSport.name,
      description: newSport.description,
      country: newSport.country,
      players: newSport.players,
    };

    console.log('Sending data:', sportData); // Adicionando log

    try {
      const response = await fetch('http://localhost:3000/sports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sportData),
      });

      if (response.ok) {
        setNewSport({
          name: '',
          description: '',
          country: '',
          players: 0,
          loading: false,
          error: null,
        });
        alert('Sport added successfully');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add sport');
      }
    } catch (error) {
      setNewSport((prevState) => ({
        ...prevState,
        loading: false,
        error: (error as Error).message,
      }));
    }
  };

  return (
    <div>
      <div>
        <h1>Cadastrar Atividade</h1>
      </div>
      <div className='addsportcontainer'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Nome</label>
          <input type='text' id='name' name='name' value={newSport.name} onChange={handleChange} required />
          <label htmlFor='description'>Descrição</label>
          <input type='text' id='description' name='description' value={newSport.description} onChange={handleChange} required />
          <label htmlFor='country'>País de origem</label>
          <input type='text' id='country' name='country' value={newSport.country} onChange={handleChange} required />
          <label htmlFor='players'>Número de jogadores</label>
          <input type='number' id='players' name='players' value={newSport.players} onChange={handleChange} required />
          <button type='submit' disabled={newSport.loading}>{newSport.loading ? 'Adding...' : 'Add Sport'}</button>
          {newSport.error && <p className='error'>{newSport.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddSport;
