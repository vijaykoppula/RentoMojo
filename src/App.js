import React from "react";
import './App.css';
// import './searchButton.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: false,
      isError: false
    }
  }
  
  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json')
    if (response.ok) {
      const users = await response.json()
      this.setState({ users, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }
  render() {
    const { users, isLoading, isError } = this.state
    
    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>
    }

    return users.length > 0
      ? (
        <table>
          <thead>
            <tr>
              {this.renderTableHeader()}
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      ) : (
        <div>
          No users.
      </div>
      )
  }
 
  renderTableHeader = () => {
	
    return Object.keys(this.state.users[1]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
  }
  renderTableRows = () => {
    return this.state.users.map(user => {
      return (
        <tr>
          <td>{user.title}</td>
          <td>{user.platform}</td>
          <td>{user.score}</td>
          <td>{user.genre}</td>
          <td>{user.editors_choice}</td>
        </tr>
      )
    })
	
  }
}
export default App;