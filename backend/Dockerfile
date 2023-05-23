FROM python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

COPY . .

RUN pip3 install -r requirements.txt && python3 manage.py migrate

#COPY entrypoint.sh /entrypoint.sh 
#RUN chmod o+x /entrypoint.sh

EXPOSE 8000

#CMD ["./entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

