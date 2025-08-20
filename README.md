# django-react-starter

## Initialize

Starting in the django-react-starter directory:

``` bash
bash init_venv.sh
source venv/bin/activate

cd backend
python manage.py makemigrations
python manage.py migrate

cd ../frontend
npm install --legacy-peer-deps

cd ../backend
python manage.py runserver
```

This will begin a development server. 

In a new terminal window, run:

``` bash
source venv/bin/activate

cd frontend
npm run dev
```
This will give you a local host link to view the current frontend.

**Quit the server with CONTROL-C***

## Build
``` bash
npm run build

cp /home/huan1531/django-react-starter/frontend/dist /home/huan1531/django-react-starter/backend/frontend/dist

rm -rf /home/huan1531/django-react-starter/backend/frontend/dist

cp -r /home/huan1531/django-react-starter/frontend/dist /home/huan1531/django-react-starter/backend/frontend/dist

start backend with : python manage.py runserver 0.0.0.0:8000

tmux new -d -s django "python manage.py runserver 0.0.0.0:8000"

nohup python -u manage.py runserver 0.0.0.0:8000 > ../output.txt &

pgrep -a python

62932 python manage.py runserver 0.0.0.0:8000

kill 62932
```

## TODO
Deny request with large API calls
