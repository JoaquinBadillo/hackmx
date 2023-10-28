import type { APIRoute } from "astro";
import { API_URL } from '../../consts';

export const POST: APIRoute = async ({request}) => {
    const data = await request.json();

    if (!data?.producto) {
        return new Response(
            JSON.stringify({
                message: "Error en los datos",
            }),
            { status: 400 }
        );
    }
    
    const preferencias = data?.preferencias;
    const producto = data.producto;

    try {
        const body = preferencias ? { preferencias, producto } : { producto };

        const recipe = await fetch(`${API_URL}/gpt`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((res) => {
            if(!res.ok) throw new Error("Error al procesar imagen");
            return res.json()
        }).then((res) => {
            return res.output as string;
        }).catch((err) => {
            console.error(err.message);
        });

        if (!recipe)
            throw new Error("No se pudo obener la receta");

        return new Response(
            JSON.stringify({
                recipe
            }),
            { status: 200 }
        );
    } catch (error: Error | any) {
        return new Response(
            JSON.stringify({
                message: error?.message ?? "Error de Servidor",
            }),
            { status: 500 }
        );
    }
};