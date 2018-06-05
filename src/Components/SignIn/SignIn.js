import React, {Component} from 'react'

class SignIn extends Component {

	constructor(props){
		super(props)
		this.state={
			inputPass: '',
			inputEmail: ''
		}
	}

	onPassChange = (event) =>{
		this.setState({inputPass: event.target.value})
	}

	onEmailChange = (event) =>{
		this.setState({inputEmail: event.target.value})
	}

	onSignIn = (event) => {
		fetch('https://pacific-mountain-54268.herokuapp.com/signin',{
			method: 'post',
			headers: {'content-type':'application/json'},
			body: JSON.stringify({
				email: this.state.inputEmail,
				password: this.state.inputPass
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data.id){
					this.props.loadUser(data)
					this.props.onRouteChange('home')
				}
			})

		
	}

	render(){
		return(

			<main className="pa4 black-80">
			  <div className="measure center br3 shadow-5 pa3 dib">
			    <div id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
			        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" for="password">Password</label>
			        <input onChange={this.onPassChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
			      </div>
			    
			    <div className="">
			      <input onClick={this.onSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={() => this.props.onRouteChange('register')} className="pointer">Register</p>
			    </div>
			    </div>
			  </div>
			</main>
		)
	}
	
}

export default SignIn;