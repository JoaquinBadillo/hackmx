//@ts-nocheck
import { useState } from "react";
import Recipe from "../recipe/index.tsx";

export default function Form({producto, setError, setShowError}) {
	const [loading, setLoading] = useState(false);
    const [preferencias, setPreferencias] = useState("");

    const [receta, setReceta] = useState("");

	async function submit(e: any) {
		e.preventDefault();
		setLoading(true);

        try {
            const response = await fetch("/api/recipe", {
				method: "POST",
				body: JSON.stringify({ 
                    producto,
                    preferencias 
                })
			}).then((res) => {
                return res.json()
            }).then((data) => {
                return data.recipe
            }).catch((err) => {
                console.error(err)
            });

			if (!response) {
				setError("Error al generar la receta.");
				setShowError(true);
				setLoading(false);
				return;
			}

			setReceta(response);
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
	}

    if (receta)
        return <Recipe text={receta} />

	return (
        <div className="background">
            <main className="formulario">
                <h1>Generar una receta</h1>
                <h2>{producto}</h2>
                <form onSubmit={submit}>
                    <div className="input-field">
                        Quiero preparar un platillo que sea...
                        <input
                        type="text"
                        className="recipe-input"
                        name="preferencias"
                        onChange={(e) => setPreferencias(e.target.value)}
                        value={preferencias}
                        placeholder="Bajo en calorías, vegano, ..." />
                        { loading ? 
                            (<button type="submit" className="recipe-gen" disabled>Esperando Chef...</button>):
                            (<button type="submit" className="recipe-gen">Generar Receta</button>)
                        }
                    </div>
                </form>
            </main>
        </div>
	);
}
