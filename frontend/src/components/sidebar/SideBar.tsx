import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './SideBar.css'

export default class SideBar extends Component {
  render() {
    return (
      <div className='sidebar'>
        <div>
          <h1>Atividades</h1>
        </div>
      <ul>
        <li><Link to="/addsport" >Cadastrar Atividade</Link></li>
        <li><Link to="/getallsports">Listar Atividades</Link></li>
        <li><Link to="/deletesport">Excluir Atividade</Link></li>
        <li><Link to="/getonesport">Buscar Atividade</Link></li>
        <li><Link to="/updatesport">Atualizar Atividade</Link></li>
      </ul>
      </div>
    )
  }
}
