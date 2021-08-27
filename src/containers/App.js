import React, { Fragment, Component } from 'react';
import Scroll from '../components/Scroll'
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import '../containers/App.css'

class App extends Component {

	constructor() {
	  super();
	  this.state = {
	  	robots: [],
	  	searchfield: ''
	  }
	}

	componentDidMount () {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({robots: users}));
	}

	onSearchChange =  (event) => {
	  this.setState({searchfield: event.target.value})
	}

	render() {
	  const filtereRobots = this.state.robots.filter(robot => {
	  	return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
	  })

	  if (!this.state.robots.length) {
	  	return <h1>Loading</h1>;
	  } else {
      return (
        <Fragment>
          <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange} />
            <Scroll>
            	<ErrorBoundry>
            		<CardList robots={filtereRobots} />
            	</ErrorBoundry>
            </Scroll>
          </div>
        </Fragment>
      );				  	
	  }

	}

}

export default App;