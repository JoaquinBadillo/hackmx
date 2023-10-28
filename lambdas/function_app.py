import logging, json, os, openai, base64
import azure.functions as func
from datetime import datetime

months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
]

api_key = os.environ.get("API_KEY", "")
app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="gpt")
def gpt(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    if not api_key:
        return func.HttpResponse(
            json.dumps({
                "message": 
                    "El servidor no pudo establecer una conexión con terceros."
            }),
            mimetype="application/json",
            status_code=500
        )

    openai.api_key = api_key
    req_body = req.get_json()
    
    date = datetime.now()
    month = months[date.month - 1]
    
    
    producto = req_body.get('producto', '')

    if not producto:
        return func.HttpResponse(
            json.dumps( {"message": "No se encontró el parámetro 'producto'"}),
            mimetype="application/json",
            status_code=400
        )
    
    preferencias = req_body.get('preferencias', '')
    prompt = f"Crea una receta para un platillo {'que sea ' + preferencias if preferencias else ''}utilizando {producto}, para el mes de {month}"

    try:  
        output = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo-0613",
            messages = [{"role": "user", "content": prompt}]
            max_tokens = 20,
        )

        output_text = output.choices[0].message.content

        return func.HttpResponse(
            json.dumps({"output": output_text}), 
            mimetype="application/json",
            status_code=200
        )

    except:
        return func.HttpResponse(
            json.dumps({
                "message": 
                    "El servidor no pudo establecer una conexión con terceros."
            }),
            mimetype="application/json",
            status_code=500
        )

@app.route(route="scan")
def scan(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    if not api_key:
        return func.HttpResponse(
            json.dumps({
                "message": 
                    "El servidor no pudo establecer una conexión con terceros."
            }),
            mimetype="application/json",
            status_code=500
        )

    openai.api_key = api_key
    req_body = req.get_json() 
    imagen = req_body.get('imagen', '')

    if not imagen:
        return func.HttpResponse(
            json.dumps( {"message": "Se necesita una imagen"}),
            mimetype="application/json",
            status_code=400
        )
    
    try:
        with open("image.jpg", "wb") as fh:
            fh.write(base64.urlsafe_b64decode(imagen))
        
        return func.HttpResponse(
            json.dumps({"output": "Imagen guardada"}), 
            mimetype="application/json",
            status_code=200
        )
    
    except:
        return func.HttpResponse(
            json.dumps({
                "message": 
                    "Error al procesar imagen"
            }),
            mimetype="application/json",
            status_code=500
        )
