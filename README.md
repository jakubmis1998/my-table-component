# my-table-component
API - DRF + Angular

# BACKEND
Local development

Clone git repository :
```
git clone https://gitlab.mga.com.pl/ceuo/ceuo.git
```

Create virtual environment:
```
cd backend
python3 -m venv venv
```

Active env.
```
source venv/bin/activate
```

Upgrade pip
```
pip install --upgrade pip
```

Install all requirements
```
pip3 install -r requirements.txt
```

Create and migrate database
```
cd project
python manage.py migrate
```

Run developer server
```
python manage.py runserver
```

To stop developer server
```
CTRL + C
```


# FRONTEND
Run developer app
```
cd frontend/person
ng serve -o
```
