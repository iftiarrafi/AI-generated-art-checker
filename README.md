# TrueArt AI Checker

> Detect whether an uploaded image is likely AI-generated or real through a clean web UI backed by a Vision Transformer inference service.

![Build](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-0.1.0-black?style=for-the-badge)

<!-- Visuals -->
<div align="center">
  <img src="./assests/intro.gif" alt="intro" width="600"/>
</div>



## Overview

TrueArt AI Checker is a full-stack image classification app that helps users quickly check whether an image appears to be AI-generated. The project pairs a minimal Next.js frontend with a Flask inference API that loads a fine-tuned Vision Transformer model and returns a simple prediction result.

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Axios, Lucide React |
| Backend | Python, Flask, Flask-CORS, PyTorch, Torchvision, Pillow |
| Model | Fine-tuned `vit_b_16` Vision Transformer checkpoint |

## Key Features

- Minimal, modern white UI focused on the primary image-check workflow
- Drag-and-drop image upload with instant local preview
- Real-time inference request flow between Next.js and Flask
- Vision Transformer-based backend for binary image classification
- Clean result states for success, error, loading, and reset flows
- Simple environment-based configuration for frontend API routing and backend model loading
- SEO-ready landing page structure with metadata and JSON-LD

## Project Structure

```text
.
├── backend/
│   ├── app.py
│   ├── fine_tuned_vit_20k.pth
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── package.json
│   └── next.config.ts
└── README.md
```

## Quick Start

### 1. Clone and install dependencies

```bash
git clone https://github.com/iftiarrafi/AI-generated-art-checker.git
cd "AI checker"

cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

cd ..\frontend
npm install
```

### 2. Configure environment variables

Set these values in your shell before starting the app, or wire them into your local env setup:

```bash
# frontend/.env.local
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:5000
```

```bash
# backend shell environment
MODEL_PATH=./fine_tuned_vit_20k.pth
PORT=5000
```

### 3. Run backend and frontend

```bash
# Terminal 1
cd backend
.venv\Scripts\activate
python app.py
```

```bash
# Terminal 2
cd frontend
npm run dev
```

Open `http://localhost:3000` in your browser.

## Configuration

| Variable | Scope | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Frontend | No | `http://127.0.0.1:5000` | Base URL used by the Next.js app to reach the Flask inference API. |
| `MODEL_PATH` | Backend | No | `./fine_tuned_vit_20k.pth` | Filesystem path to the trained PyTorch model checkpoint. |
| `PORT` | Backend | No | `5000` | Port used by the Flask server. |

## API

### `POST /check_image`

Uploads an image and returns a binary prediction.

**Request**

```http
POST /check_image
Content-Type: multipart/form-data
```

| Field | Type | Description |
| --- | --- | --- |
| `file` | File | Image file to classify |

**Response**

```json
{
  "is_real": true,
  "is_ai_generated": false,
  "message": "Image appears to be real"
}
```

## Development Notes

> Tip  
> The frontend and backend run as separate services in local development. Make sure the Flask API is running before testing uploads from the Next.js app.

### Frontend commands

```bash
cd frontend
npm run dev
npm run lint
npm run build
```

### Backend command

```bash
cd backend
python app.py
```

## Roadmap Ideas

- Add confidence scores to predictions
- Support batch uploads
- Add Docker-based local development
- Introduce model/version metadata in API responses
- Save recent analyses for comparison workflows

## License

This project is licensed under the MIT License.

```text
MIT License

Copyright (c) [YEAR] [OWNER]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
```
