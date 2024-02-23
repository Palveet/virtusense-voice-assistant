# VirtuSense Voice Assistant - README

## Project Overview
The VirtuSense Voice Assistant is a minimalistic voice-controlled web application designed to interact with users through a single thought-provoking question that expects a "Yes" or "No" response. This project demonstrates proficiency in Python programming, voice recognition integration, Docker containerization, and basic logging mechanisms.

## Folder Structure
- `app.py`: The main Python Flask application.
- `requirements.txt`: Lists the Python dependencies for the application.
- `Dockerfile`: Instructions for Docker to build the application image.
- `asound.conf`: Configuration for sound input and output.
- `conversation_log.txt`: File where conversation logs are stored.
- `static/`: Folder containing web interface files.
  - `index.html`: The main HTML file for the web interface.
  - `styles.css`: The CSS file for styling the web interface.
  - `main.js`: JavaScript file containing the logic for the voice recognition.
  - `microphone.webp`: Image displayed on the web interface.

## Prerequisites
To run this project, you will need:
- Docker installed on your machine.
- A web browser to interact with the web interface.

## Docker Deployment
1. **Build the Docker Image**
   Navigate to the directory containing the Dockerfile and execute:
   ```bash
   docker build -t virtusense-voice-assistant .
   ```

2. **Run the Container**
   To start an instance of the voice assistant application, run:
   ```bash
   docker run -p 5000:5000 virtusense-voice-assistant
   ```
   This command will map port 5000 of the container to port 5000 on your host machine.

## Interacting with the Voice Assistant
1. Open your web browser and navigate to `http://localhost:5000`.
2. You will be presented with a simple web interface with a microphone icon.
3. Click on the microphone icon and answer the prompted question with "Yes" or "No".
4. Your response will be processed, and the interaction will be logged.
5. Start by saying 'hi' it will ask you a question. 
6. It expects you to either say 'yes' or 'no' in 3 attempts. 
7. After 3 attempts it logs it as invalid response

## Logs
The conversation logs are saved in `conversation_log.txt` and will contain the question asked and the user's response, or "Invalid response" if the case arises.

## Notes
- The application is set to run in `development` mode as per the Dockerfile environment variables for ease of debugging and development. For production deployment, the `FLASK_ENV` should be set to `production`.
- The `asound.conf` file is pre-configured for the Docker environment; adjust it if necessary to suit your machine's audio hardware.

## Troubleshooting
- If you encounter any issues with the audio input/output, ensure your Docker daemon is configured correctly to access your machine's audio hardware. Preferably used a linux device.
- For issues with dependency versions, refer to `requirements.txt` and adjust the package versions if necessary.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

---

We hope you find this README helpful in setting up and interacting with the VirtuSense Voice Assistant. If you have any further questions or feedback, please feel free to open an issue in the project repository.
