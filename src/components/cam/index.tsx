//@ts-nocheck
import { forwardRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 400,
  	height: 400,
  	facingMode: "environment",
};

function Cam({loading}, ref) { 
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
		{ loading ? 
			(<button type="submit" className="scan" disabled>Generando Recetas...</button>) :
			(<button type="submit" className="scan">Escanear</button>)
		}
	  </>
	);
}

export default forwardRef(Cam);