# Motion Detector Web App

A web application for detecting motion (e.g. in video frames / camera input) and providing alerts / notifications. Built using Python + web framework (Flask / Django / etc.), with front-end templates and real-time functionality.

## Table of Contents

1. [Features](#features)  
2. [Architecture / Design](#architecture)   
3. [Setup / Installation](#setup)   

---

## Features

- Capture video / image stream and detect motion differences  
- Trigger alerts or record events when motion is detected  
- Web interface to view camera feed / history  
- Logging of motion events  
- Optionally, user notifications (email / push)  
- Configurable sensitivity, thresholds, areas to monitor  


## Architecture / Design

- `app_init.py`: initializes Flask app, config, extensions  
- `routes.py`: defines endpoints (views)  
- `models.py`: ORM / database models (e.g. motion events)  
- `migrations/`: database migration scripts  
- `static/` & `templates/`: front-end assets / UI  

## Setup / Installation

# Create virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate   # on Unix / Mac
# or `venv\Scripts\activate` on Windows

pip install -r requirements.txt

# Initialize / migrate database
flask db upgrade     

# Run the app
flask run
