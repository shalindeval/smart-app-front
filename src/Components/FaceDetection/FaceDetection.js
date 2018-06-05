import React from 'react'
import './FaceDetection.css'

const FaceDetection = ({imageURL, box}) => {
	return(

		<div className="center">
			<div className="absolute">
			<img id="inputImage" src={imageURL} alt="" style={{width:'500px', height:'auto'}} />
			<div className="boundingBox" style={{top:box.top_row, bottom: box.bottom_row, left: box.left_col, right: box.right_col}}></div>
			</div>
		</div>
	
	)
}

export default FaceDetection