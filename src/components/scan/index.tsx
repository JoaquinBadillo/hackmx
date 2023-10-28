//@ts-nocheck
import { useState, useRef } from "react";
import { Error } from "../Notification.js";
import Cam from "../cam/index.js";

export default function Form({setProduct, setError, setShowError}) {
	const webcamRef = useRef(null);
	const [imgSrc, setImgSrc] = useState(null);

	const [loading, setLoading] = useState(false);

	const submit = async (e: any) => {
		e.preventDefault();
		setLoading(true);

		let img;


		try {
			if (!webcamRef || !webcamRef.current || !webcamRef.current.getScreenshot)
				throw new Error("Cámara no encontrada.");

			const imageSrc = webcamRef.current.getScreenshot();
			img = imageSrc.replace(/^data:image\/[a-z]+;base64,/, "");
			setImgSrc(imageSrc);

			const response = await fetch("/api/scan", {
				method: "POST",
				body: JSON.stringify({ img }),
			});

			if (!response?.ok) {
				setError("Error al generar la receta.");
				setShowError(true);
				setLoading(false);
				return;
			  }
	  
			const data = await response.json();
	
			if (data?.producto)
				setProduct(data.producto);
	  
			  setLoading(false);

		} catch (error) {
			setError(error.message);
			setLoading(false);
			return;
		}
	}

	return (
		<div className="background">
		<main className="formulario">
			<h1>Generar una receta</h1>
			<form onSubmit={submit}>
				<div className="input-field">
					Escanea un producto de La Moderna:
					<Cam loading={loading} ref={webcamRef}/>
				</div>
			</form>
		</main>
			</div>
	);
}
