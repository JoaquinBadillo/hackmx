from flask import Flask, request, json
import tensorflow as tf
import os
import cv2
import numpy as np
import base64

app = Flask(__name__)

model_dir = "./models/BinaryModerna.h5"
model = tf.keras.models.load_model(model_dir)
batch = [
	"Coditos",
	"Harina",
	"Macarrones",
	"Sopa de Munición"
	"Spaghetti"
]


@app.post("/classify")
def classify():
	content = request.json

	img = content.get("img", "")
	
	if not img:
		return {"error": "No image provided"}

	nparr = np.frombuffer(base64.b64decode(img), np.uint8)
	image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
	cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

	resize = tf.image.resize(image, (256, 256))
	prediction = model.predict(np.expand_dims(resize/255, 0))
	result = "Spaghetti" if prediction > 0.5 else "Harina"

	return json.dumps({"product": result})

if __name__ == "__main__":
	app.run()