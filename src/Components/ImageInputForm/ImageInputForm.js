import React from 'react'
import './ImageInputForm.css'

const ImageInputForm = ({OnInputChange, OnClick}) =>{
	return(
		<div className="">
			<div><p className="f2">This magic brain will detect faces in your image</p></div>
			<div className="center" >
				<div className="pa3 br4 shadow-5 inputBox center">
					<input onChange={OnInputChange} type="text" className="f3 w-70 pa2 center" placeholder="Enter Image URL"/>
					<button onClick={OnClick} className=" f3 w-30 pa2 grow bg-light-purple dib link white pv2 ">Detect</button> 
				</div>
			</div>
		</div>
	)
}

export default ImageInputForm;