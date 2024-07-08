import './App.css';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { SideBar, UpdateSport, DeleteSport, GetAllSports, GetOneSport } from './components';
import {AddSport} from './components';

function App() {
  return (
    <Router>
      <div className='container'>
        <SideBar />
      <div className='content'>
        <Routes>
          <Route path="/getonesport" element={<GetOneSport/>}/>
          <Route path="/addsport" element={<AddSport />} />
          <Route path="/updatesport" element={<UpdateSport />} />
          <Route path="/deletesport"  element={<DeleteSport />}/>
          <Route path="/getallsports" element={<GetAllSports />}/>
        </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;
