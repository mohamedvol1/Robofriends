import React, { Fragment,useState, useEffect } from 'react';
import Scroll from '../components/Scroll'
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import '../containers/App.css'

const App = () => {

  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users))
  },[])
  
  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }

  const filteredRobots = robots.filter(robot =>{
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  })

  if (!robots.length) {
    return <h1>Loading</h1>;
  } else {
    return (
      <Fragment>
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
          	<ErrorBoundry>
          		<CardList robots={filteredRobots} />
          	</ErrorBoundry>
          </Scroll>
        </div>
      </Fragment>
    );				  	
   }

}

export default App;
