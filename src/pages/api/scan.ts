import type { APIRoute } from "astro";
import { API_URL } from '../../consts';

export const POST: APIRoute = async ({request}) => {
    const data = await request.json();
    const image = data.img;

    if (!image || typeof image !== "string" || image.length < 1) {
      return new Response(
        JSON.stringify({
          message: "Error en la imagen",
        }),
        { status: 400 }
      );
    }

    try {
        const producto = await fetch(`http://localhost:5000/classify`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ img: image }),
        }).then((res) => {
            if(!res.ok) throw new Error("Error al procesar imagen");
            return res.json();
        }).then((json) => {
            return json.product;
        }).catch((err) => {
            console.error(err.message);
        });

        return new Response(
            JSON.stringify({
                producto
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