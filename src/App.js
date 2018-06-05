import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import ImageInputForm from './Components/ImageInputForm/ImageInputForm'
import 'tachyons'
import Logo from './Components/Logo/Logo'
import Particles from 'react-particles-js'
import FaceDetection from './Components/FaceDetection/FaceDetection'
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'

const ParticleParams = {
    particles: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
   }
 }

 const initialState = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedin: false,
      
      user: {
        id: 0,
        name: '',
        email: '',
        password: '',
        entries: 0,
        date: ''
      }
    }



class App extends Component {
  constructor(){
    super()
    this.state = initialState
  }

  calculateBoxPosition = (data) => {
    const clarifaiData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      top_row: height * clarifaiData.top_row,
      bottom_row: height - (clarifaiData.bottom_row * height),
      left_col: width * clarifaiData.left_col,
      right_col: width - (clarifaiData.right_col * width)
    }
  }

displayFaceBox = (box) => {
  this.setState({box:box})
}

onInputChange = (event) => this.setState({input:event.target.value})

onClick = () => {
    this.setState({imageURL: this.state.input})

      fetch('https://pacific-mountain-54268.herokuapp.com/imageURL',{
          method: 'post',
          headers: {'content-type':'application/json'},
          body: JSON.stringify({input: this.state.input})
      })
      .then(response => response.json()) 
      .then(response => {
          if(response){
          fetch('https://pacific-mountain-54268.herokuapp.com/image',{
            method: 'put',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({id: this.state.user.id})
          })
          .then(response => response.json())
          .then(count => this.setState(Object.assign(this.state.user,{entries:count})))
          .catch(err => console.log(err))
        }
      this.displayFaceBox(this.calculateBoxPosition(response))
     }).catch(err => console.log(err))
  }

  onRouteChange = (route) =>{
    if(route==='signin'){
      this.setState(initialState)
    }else if(route === 'home'){
      this.setState({isSignedin:true})
    }
    this.setState({route:route})
  }

  loadUser = (data) =>{
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        date: data.date,
        entries: data.entries

      }
    })
  }

render() {
  const {isSignedin,box,imageURL,route} = this.state;
  return (
    <div className="App">
      <Particles className="particles" params={ParticleParams}/>
      <Navigation onRouteChange={this.onRouteChange} isSignedin={isSignedin}/>
      {route === 'signin'
        ?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        :(route === 'register'
          ?<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> 
          :<div>
             <Logo/>
             <div className="center">
              <h1 className="f3">{`${this.state.user.name}, your entry count is: `} </h1>
              <h3>{this.state.user.entries}</h3>
             </div>
             <ImageInputForm OnInputChange = {this.onInputChange} OnClick = {this.onClick}/>
             <FaceDetection imageURL={imageURL} box={box}/>
           </div>
         )
       }
      
    </div>
    )
  }
}

export default App;
