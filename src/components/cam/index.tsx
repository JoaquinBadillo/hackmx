//@ts-nocheck
import { forwardRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 400,
  	height: 400,
  	facingMode: "user",
};


function Cam(props:any, ref) { 
	return (
	  <>
		<Webcam
		  audio={false}
		  height={400}
		  ref={ref}
		  screenshotFormat="image/jpeg"
		  width={400}
		  videoConstraints={videoConstraints}
		/>
		{ props.loading ? 
			(<button type="submit" disabled>Generando Recetas...</button>) :
			(<button type="submit">Escanear</button>)
		}
	  </>
	);
}

export default forwardRef(Cam);