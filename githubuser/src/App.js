import React from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div `
text-align: center;
background-color: #483D8B;
`
const Title = styled.h1 `
color: white
padding: 20px;`
const Images = styled.img `
border-radius: 30px;
padding: 20px;`
const Links = styled.a `
color: white; 
margin-bottom: 20px;
`
const Buttons = styled.button `
margin: 10px;
font-size: 1.0rem;
border-radius: 30px;
color: lavender;
background-color: black;`
const Name = styled.h1 `
color: #FFF0F5;
font-style: italic;
 `
class App extends React.Component {
  state = {
    user: {},
    followers: [],
    // searchTerm: '',
  };
  componentDidMount() {
    axios.get('https://api.github.com/users/jasminekh96').then(res => {
      this.setState({
        user: res.data,

            });
    })
    axios.get(`https://api.github.com/users/jasminekh96/followers`)
    .then(res => {
      this.setState({
        followers: res.data,
      })
      console.log(res.data)
    })
    .catch(err => console.log(err));
   }
//   onSearchChange(e) {
//     this.setState( this.state.searchTerm );

// }
// componentDidUpdate(prevProps, prevState){
//   if(prevState.searchTerm !== this.state.searchTerm){
//   this.props.onSearchChange(this.state.searchTerm)
// }  
// }
 
handleChanges = e => {
  this.setState({
    usersText: e.target.value
  });
};
// onSearchChange(searchTerm){
//   this.setState({searchTerm});
// }
render() {
  return(
    <Container>
      <Title>Lambda GitHub Users</Title>
      <form>
      <input
      type='text'
      value={this.state.usersText}
      placeholder='Github User'
      onChange={this.handleChanges}
      />
       </form>
      <Buttons onClick = {this.fetchUsers}>Find User</Buttons>
      {(! this.state.user? (<p>Loading...</p>): console.log())}
      <div>
        <Images width='200' src= {this.state.user.avatar_url} />
        <Name>{this.state.user.login}</Name>
        <Links href = {this.state.user.html_url}> {this.state.user.html_url} </Links>
      </div>
      <div>
      {this.state.followers.map(follower => 
        (
          <div key={follower.id}>
            <Images width='200' src = {follower.avatar_url} />
            <Name>{follower.login}</Name>
            <Links href = {follower.html_url}> {follower.html_url} </Links>
            </div>
        )
        )}
      </div>
    </Container>
  )
}
  }
export default App;
