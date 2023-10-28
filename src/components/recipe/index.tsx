//@ts-nocheck
import { useState } from "react";

export default function Recipe({product, setError, setShowError}) {
	const [loading, setLoading] = useState(false);

	async function submit(e: any) {
		e.preventDefault();
		setLoading(true);

        setLoading(false);
	}

	return (
		<>
			<h2>{product}</h2>
			<form onSubmit={submit}>
                <div className="input-field">
                    Quiero preparar un platillo que sea...
                    <input
                      type="text"
                      className="recipe-input"
                      name="preferencias"
                      placeholder="Bajo en calorías, vegano, ..." />
                    { loading ? 
                        (<button type="submit" className="recipe-gen" disabled>Esperando Chef...</button>):
                        (<button type="submit" className="recipe-gen">Generar Receta</button>)
                    }
                </div>
			</form>
		</>
	);
}
