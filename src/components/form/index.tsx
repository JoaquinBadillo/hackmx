//@ts-nocheck

import { useState, useCallback, useRef } from "react";
import { Error } from "../Notification.tsx";
import Cam from "../cam/index.tsx";

import "./style.css"

export default function Form() {
	const webcamRef = useRef(null);
	const [imgSrc, setImgSrc] = useState(null);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showError, setShowError] = useState(false);

	async function submit(e: any) {
		e.preventDefault();
		setLoading(true);

		try {
			if (!webcamRef || !webcamRef.current || !webcamRef.current.getScreenshot)
				throw new Error("Cámara no encontrada.");

			const imageSrc = webcamRef.current.getScreenshot();
			setImgSrc(imageSrc);
		} catch (error) {
			setError(error.message);
		}

		const formData = new FormData(e.target as HTMLFormElement);
		
		/*
		const response = await fetch("/api/ai", {
		  method: "POST",
		  body: formData,
		});

		if (!response.ok) {
		  setError("Failed to generate slide.");
		  setShowError(true);
		  setLoading(false);
		  return;
		}

		const data = await response.json();

		if (data.headline)
		  setTitle(data.headline);

		if (data.summary)
		  setSummary(data.summary);

		if (data.img)
		  setImg(data.img);
		*/

		setLoading(false);
	}

	return (
		<>
		<Error message={error} show={showError} setShow={setShowError}/>
		<main className="formulario">
			<h1>Generar una receta</h1>
			<form onSubmit={submit}>
				<div className="input-field">
					Escanea un producto de La Moderna:
					<Cam loading={loading} ref={webcamRef}/>
				</div>
			</form>

			{imgSrc && (<img src={imgSrc} />)}
		</main>
		</>
	);
}
