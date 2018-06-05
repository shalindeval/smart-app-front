import React from 'react'
import Tilt from 'react-tilt'
import brain from './brain.png'
import './Logo.css'

const Logo = () =>{
	return(
		<div>
			<Tilt className="Tilt dib" options={{ max : 50 }} >
 				<div className="Tilt-inner">  
 					<img className="logoBox br4" src={brain} alt="brain"/>
 				</div>
			</Tilt>
		</div>
	)
}

export default Logo;
