FROM python:3.8.10-slim-buster

RUN mkdir -p /app
WORKDIR /app

RUN pip install --no-cache-dir -U pip

COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY . /app

CMD ["python", "app.py"]
