import logo from './logo_madastur.svg';
import Activity from './activity';
import Activities from './activities';
import { BrowserRouter as Router, Route} from 'react-router-dom';


const filterList = () => {
  alert("TODO");
};

function App() {

  return (
    <div className="App">
      <center>
        <img src={logo} alt="Madastur logo" width="400" />
        <br /><br /><br />
        <a href="https://api.madastur.com">Go to Home</a> &nbsp;
         | &nbsp;<a href="javascript:history.back()">Go Back</a>
         <br/><br/><br/>
        <label>Filter by Date:</label>&nbsp;&nbsp;
        <input
            key='txDate'
            placeholder='yyyy-mm-dd'/>&nbsp;&nbsp;
        <button onClick={filterList}>Filter</button>
        <br/><br/>
        <Router>
          <Route exact path='/strava/activity-det/:activityId' component={Activity} />
          <Route exact path='/strava/activity/:activityId' component={Activity} />
          <Route exact path='/strava/activities/:athleteId' component={Activities} />
        </Router>
        
        
      </center>
    </div>
  );
}

export default App;
