FROM python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

COPY . .

RUN pip install --no-cache-dir -r requirements.txt && \
    python manage.py makemigrations && \
    python manage.py migrate 


EXPOSE 8000

CMD ["python", "manage.py", "runserver"]
