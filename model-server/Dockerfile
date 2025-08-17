
FROM python:3.9-slim

WORKDIR /code

# Copies the requirements file first to leverage Docker's layer caching
COPY ./requirements.txt /code/requirements.txt

# Install the Python dependencies from requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code/

# Expose the port the app runs on
EXPOSE 6102

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "6102"]