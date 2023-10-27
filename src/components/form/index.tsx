import { useState } from "react";
import Slide from "../Slide.tsx";
import { Error } from "../Notification.tsx";

import "./style.css"

export default function Form() {
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [img, setImg] = useState<any>(null);
	const [error, setError] = useState("");
	const [showError, setShowError] = useState(false);

	async function submit(e: any) {
		e.preventDefault();

		setLoading(true);

		const formData = new FormData(e.target as HTMLFormElement);
		
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

		setLoading(false);
	}

	return (
		<>
		<Error message={error} show={showError} setShow={setShowError}/>
		<main className="formulario">
			<h1>Generar una receta</h1>
			<form onSubmit={submit}>
				<div>
					<label>
						Escanea un producto de La Moderna:
					</label>
				</div>
				{loading ? 
					<button type="submit" disabled>Generando receta...</button> :	
					<button type="submit">Subir</button>
				}
			</form>
		</main>
		<Slide title={title} summary={summary} img={img} />
		</>
	);
}
