import React from 'react'

const Navigation = ({onRouteChange,isSignedin}) =>{
	if(isSignedin===true){
		return(
		<nav style={{display: 'flex', justifyContent: 'flex-end'}} >
			<p onClick={()=>onRouteChange('signin')}className="f3 link dim pointer pa3 underline"> Sign Out </p>
		</nav>	
		)
	}else{
		return(
		<nav className="center" >
			<div className="f1 pa3 mt5 white">Hello there!</div>
		</nav>

		)
	 }
}

export default Navigation;