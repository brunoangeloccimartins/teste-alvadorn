import React, { Component } from 'react';
import './DeleteSport.css';

export default class DeleteSport extends Component {
  state = {
    sportName: '',
    errorMessage: ''
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ sportName: e.target.value });
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { sportName } = this.state;

    try {
      const response = await fetch(`http://localhost:3000/sports/${sportName}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete sport');
      }

      alert('Sport deleted successfully');
      this.setState({ sportName: '', errorMessage: '' }); // Limpa o estado após a exclusão
    } catch (error) {
      console.error('Error deleting sport:', error);
      this.setState({ errorMessage: 'Failed to delete sport' });
    }
  };

  render() {
    const { sportName, errorMessage } = this.state;

    return (
      <div>
        <h1>Deletar Atividade</h1>
        <div className='deletesportcontainer'>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='sportname'>Nome da atividade</label>
            <input
              type='text'
              id='sportname'
              name='sportname'
              value={sportName}
              onChange={this.handleChange}
              required
            />
            <button type='submit'>Deletar</button>
          </form>
          {errorMessage && <p className='error'>{errorMessage}</p>}
        </div>
      </div>
    );
  }
}
