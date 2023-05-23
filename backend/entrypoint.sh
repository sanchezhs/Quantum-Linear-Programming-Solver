#!/bin/sh


cd ~/Documentos/TFG/backend
pip3 install -r requirements.txt

# May as well do this too, while we're here.
python3 manage.py migrate
python manage.py runserver 0.0.0.0:8000 # en cmd de dockerfile

exec "$@"