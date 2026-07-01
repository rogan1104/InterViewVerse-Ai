# 👁️ InterviewVerse AI – Eye Analytics Module

## Overview

The Eye Analytics module is an AI-powered computer vision system developed for InterviewVerse AI.

It analyzes a candidate's visual attention during an interview using real-time webcam input.

Rather than relying on subjective human observations, the module generates objective attention metrics using MediaPipe Face Mesh.

---

## Features

- Face Detection
- Face Mesh Tracking
- Iris Tracking
- Eye Gaze Estimation
- Blink Detection
- Blink Rate (per minute)
- Eye Contact Percentage
- Looking Away Percentage
- Engagement Score
- Longest Distraction Detection
- Timeline Event Logging
- Scorecard Generation
- Human-readable Summary
- JSON Report Export

---

## Tech Stack

- Python
- OpenCV
- MediaPipe
- NumPy

---

## AI Technologies Used

- MediaPipe Face Mesh
- Iris Landmark Detection
- Geometric Gaze Estimation

No custom machine learning model was trained.

---

## Output Metrics

- Eye Contact %
- Looking Away %
- Blink Count
- Blink Rate
- Engagement Score
- Longest Distraction
- Timeline Events

---

## Output Files

The module generates:

output/

    interview_report.json

which contains

- Metrics
- Timeline
- Summary
- Scorecard

---

## Project Structure

eye_ai/

├── app.py

├── tracker.py

├── gaze.py

├── blink.py

├── metrics.py

├── headpose.py

├── timeline.py

├── scorecard.py

├── summary.py

├── report.py

└── output/

---

## Future Improvements

- Head Pose Compensation
- Multi-person Support
- Improved Eye Calibration
- InterviewVerse Integration


---------------------------------------------------------------------

# Eye Contact AI – Setup Guide

## Python Version

This project was developed and tested with:

-> Python 3.11.x (Recommended)

Python 3.10+ should also work unless specific dependencies require a particular version.

---

# Create a Virtual Environment

### Windows

```bash
cd eye-contact-ai

python -m venv venv

venv\Scripts\activate
```

### macOS / Linux

```bash
cd eye-contact-ai

python3 -m venv venv

source venv/bin/activate
```

---

# Install Required Packages

Install all dependencies using:

```bash
pip install -r requirements.txt
```

If `pip` is unavailable:

```bash
python -m pip install -r requirements.txt
```

or

```bash
python3 -m pip install -r requirements.txt
```

---

# Run the Application

```bash
python app.py
```

or

```bash
python3 app.py
```

---

# Why the `venv` Folder Is Not Included

The `venv` directory has intentionally been excluded from this repository.

It contains locally installed Python packages and platform-specific binaries (such as PyTorch, JAX, and other dependencies), which can exceed GitHub's file size limits and are automatically recreated on any machine using:

```bash
pip install -r requirements.txt
```

Including `venv` in a Git repository is not recommended and is considered standard practice in Python development.

---

# Project Requirements

Before running the application, ensure the following are installed:

* Python 3.11 (recommended)
* pip
* Git

---

# Installation Summary

```bash
git clone <repository-url>

cd InterviewVerse-AI/eye-contact-ai

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

python app.py
```

---

# Notes

* All required Python libraries are listed in `requirements.txt`.
* The virtual environment (`venv`) is intentionally excluded from version control.
* The environment can be recreated in a few minutes using the installation steps above.
* The project source code remains complete; only machine-specific installed packages are omitted.

---

### One more recommendation

Since this is a hackathon submission, add a **"Prerequisites"** section near the top:

```markdown
## Prerequisites

- Python 3.11+
- pip
- Webcam (required for Eye Contact AI)
- Microphone (required for Voice AI)
- Internet connection (if any cloud APIs are used)
```

This makes it much easier for judges to run your project and gives a professional impression.
