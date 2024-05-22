# Dockerfile metadata
FROM python:3.10
LABEL Author="Victor Fernandez III, @cyberphor"

# set the working directory
WORKDIR /demo

# install dependencies
COPY src/requirements.txt requirements.txt
RUN python -m pip install -r requirements.txt

# copy the ui code
COPY ui/index.html index.html
COPY ui/style.css style.css
COPY ui/script.js script.js

# copy the backend code
COPY src/api.py api.py

# run the application's API
CMD ["python", "-m", "uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]