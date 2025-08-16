# Use an official lightweight Python image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /code

# Copy the requirements file first to leverage Docker's layer caching
COPY ./requirements.txt /code/requirements.txt

# Install the Python dependencies from requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy all your application code into the container
COPY . /code/

# Expose the port your app runs on
EXPOSE 6102

# CORRECT: The command to run your app in production using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "6102"]