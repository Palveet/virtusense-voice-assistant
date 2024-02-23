# Use an official Python runtime as a parent image, based on Debian similar to Ubuntu 16.04
FROM python:3.8

# Set the working directory in the container
WORKDIR /usr/src/app

# Install system dependencies including pulseaudio-utils and espeak
RUN apt-get update && apt-get install -y \
    espeak \
    alsa-utils 
COPY asound.conf /etc/asound.conf

# Install Python packages specified in requirements.txt
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Set environment variables for Python runtime
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_ENV=development

# Make port 5000 available to the world outside this container
EXPOSE 5000


# Run Flask application
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
