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

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
