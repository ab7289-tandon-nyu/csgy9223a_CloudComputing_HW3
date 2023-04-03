FROM python:3.9-slim

RUN mkdir /app
COPY ./webapp/requirements.txt /app
WORKDIR /app
RUN pip install -r requirements.txt
COPY /webapp .
EXPOSE 5000
CMD [ "python", "app.py" ]