# Motion Detector Web App

A web application for detecting motion (e.g. in video frames / camera input) and providing alerts / notifications. Built using Python + web framework (Flask / Django / etc.), with front-end templates and real-time functionality.

## Table of Contents

1. [Features](#features)  
2. [Architecture / Design](#architecture)   
3. [Setup / Installation](#setup)
4. [Usage](#Usage)
5. [Limitations & Future Work](#Limitations & Future Work)

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

## Usage

Once the app is running:

Access through http://localhost:5000 (or whichever port)

Navigate to the motion detector view

Start / stop camera or upload video

See live feed + detection overlays

View history of motion events

Configure thresholds or sensitivity 


## Limitations & Future Work

Only works with a single camera input currently

Performance may degrade on high-resolution video

No user authentication or access control

Alerts are basic (no SMS / push)

Needs more calibration for lighting / environmental noise

# Planned improvements:

Add user login / roles / settings

Support multiple cameras / streaming sources

Integrate real-time notifications (email, SMS, push)

Optimize detection algorithm (reduce false positives)

Add tests, CI, containerization (Docker)

Deploy a live instance or mobile app client
