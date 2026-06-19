# AI-Enhanced Code & Flowchart Learning System

## Project Overview

AI-Enhanced Code & Flowchart Learning System is a full-stack educational platform that helps students understand programming concepts through visualization, Machine Learning, and Generative AI.

The system allows users to:

* Convert source code into flowcharts
* Generate source code from flowcharts
* Classify programming logic patterns using Machine Learning
* Get AI-powered algorithm explanations
* Maintain learning history and saved sessions
* Improve coding and algorithm understanding through visual learning

---

## Technologies Used

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* JWT Authentication

### Database

* SQLite

### Machine Learning

* Python
* Scikit-Learn
* Decision Tree Classifier
* Joblib

### Generative AI

* Google Gemini API

### Deployment

* Vercel (Frontend)
* FastAPI Backend Server

---

## Project Structure

```text
AI-CodeFlow/

├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── Backend/
│   ├── app/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── main.py
│   └── requirements.txt
│
├── ML/
│   ├── dataset/
│   ├── notebook.ipynb
│   ├── train_model.py
│   └── logic_classifier.joblib
│
└── Documentation/
```

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/shaiksaheid/AI-CodeFlow.git

cd AI-CodeFlow
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd Backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend will run on:

```text
http://localhost:8000
```

---

## Database Setup

The project uses SQLite.

Database file:

```text
ai_codeflow.db
```

If the database does not exist, create tables by running:

```bash
python init_db.py
```

or

```bash
python seed.py
```

depending on your backend implementation.

---

## Machine Learning Model Details

### Model

Decision Tree Classifier

### Purpose

Classify programming logic into:

* Sequential Logic
* Conditional Logic
* Looping Logic
* Nested Logic
* Function-Based Logic

### Features Used

* Number of conditions
* Loop count
* Function count
* Operators used
* Code length
* Complexity score

### Files

```text
ML/
├── dataset.csv
├── notebook.ipynb
├── train_model.py
└── logic_classifier.joblib
```

### Train Model

```bash
python train_model.py
```

### Load Model

```python
joblib.load("logic_classifier.joblib")
```

---

## Gemini API Configuration

Create a `.env` file inside Backend folder.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///./ai_codeflow.db
```

### Get Gemini API Key

1. Visit Google AI Studio
2. Create API Key
3. Copy the generated key
4. Add it to `.env`

---

## Main Features

### Authentication

* User Registration
* User Login
* JWT Authentication

### Dashboard

* User Overview
* Quick Access to Modules

### Code to Flowchart

* Convert source code into visual flowcharts

### Flowchart to Code

* Generate code from flowchart structures

### Logic Classification

* Predict logic category using Decision Tree Model

### Algorithm Explanation

* AI-powered explanation of algorithms
* Time Complexity
* Space Complexity
* Step-by-Step Breakdown

### History

* Track previous sessions

### Profile

* Manage user details

### Settings

* Application settings management

---

## API Endpoints

### Authentication

```http
POST /auth/register
POST /auth/login
```

### Logic Classification

```http
POST /logic/classify
```

### Algorithm Explanation

```http
POST /algorithm/explain
```

### Flowchart Services

```http
POST /code-to-flowchart
POST /flowchart-to-code
```

---

## Expected Outcome

The project demonstrates the integration of:

* Full Stack Development
* Machine Learning
* Generative AI
* Educational Technology

to improve programming learning through visualization, intelligent classification, and AI-powered explanations.

---

## Author

**Shaik Shaheid**

B.Tech – Computer Science & Engineering (AI & ML)

CMR Technical Campus

---

## License

This project is developed for educational and academic purposes.
