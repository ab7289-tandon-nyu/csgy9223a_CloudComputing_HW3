FROM python:3.9-slim

RUN mkdir /app
COPY ./requirements.txt /app
WORKDIR /app
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD [ "python", "app.py" ]