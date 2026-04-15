FROM python:3.10-slim
WORKDIR /app
RUN pip install --default-timeout=1000 fastapi uvicorn pymongo pydantic email-validator certifi python-dotenv passlib bcrypt==3.2.2 python-jose python-multipart
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]