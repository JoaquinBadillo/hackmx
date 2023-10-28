//@ts-nocheck
import { useState, useRef } from "react";
import { Error } from "../Notification.tsx";
import Cam from "../cam/index.tsx";

import RecipeForm from "../recipe-form/index.tsx";
import Form from "../scan/index.tsx";

export default function Main() {
    const [error, setError] = useState("");
	const [showError, setShowError] = useState(false);
	const [product, setProduct] = useState("");

	return (
		<>
		<Error message={error} show={showError} setShow={setShowError}/>
            {
                product ? (
                    <RecipeForm 
                      producto={product}
                      setError={setError}
                      setShowError={setShowError}
                    />
                ) : (
                    <Form 
                      setProduct={setProduct}
                      setError={setError}
                      setShowError={setShowError}
                    />
                )
            }
		</>
	);
}
