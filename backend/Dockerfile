FROM python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

COPY entrypoint.sh /entrypoint.sh 
RUN chmod o+x /entrypoint.sh

COPY . .

EXPOSE 8000

CMD ["./entrypoint.sh"]
