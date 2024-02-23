from flask import Flask, jsonify, request
import pyttsx3
import random
import sys
app = Flask(__name__)

attempts = 0
question = None
questions = [
    "Is technology making humans better?",
    "Can machines develop consciousness?",
    "Is artificial intelligence a threat to humanity?",
    "Do you believe in the potential of virtual reality to replace real-life experiences?",
]
class _TTS:

    engine = None
    rate = None
    def __init__(self):
        self.engine = pyttsx3.init()

    def start(self,text_):
        self.engine.say(text_)
        self.engine.runAndWait()

def log_conversation(speaker, response):
    with open("conversation_log.txt", "a") as file:
        file.write(f"{speaker}: {response}\n\n")

def ask_question():
    global question
    question = random.choice(questions)
    tts = _TTS()
    prompt = f"Hi, here is a question for you, please respond in yes or no: {question}"
    tts.start(prompt)
    del(tts)
    log_conversation("Assitant", prompt)
    return question


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/process-message', methods=['POST'])
def process_message():
    
    data = request.json
    user_message = data.get('message')
    if user_message not in ['hi','hello','hey','bye','c ya']:
        log_conversation("User", user_message)
        response = handle_user_answer(user_message)
    else:
        log_conversation("User", user_message)
        response = handle_user_message(user_message)
    return jsonify({'message': response})


def handle_user_message(user_message):
    tts = _TTS()
    if 'hi' in user_message:
        return ask_question()
    elif 'bye' in user_message:
        prompt = "Goodbye! You can activate the conversation again by clicking the button."
        tts.start(prompt)
        log_conversation("Assistant", prompt)
        return prompt
    else:
        prompt = "I'm sorry, I didn't understand that. Please say 'hi' to start the conversation."
        tts.start(prompt)
        log_conversation("Assistant", prompt)
        return prompt
    del(tts)

def handle_user_answer(answer):
    prompt=''
    global attempts
    global question
    tts = _TTS()
    if attempts == 3:
        attempts = 0
        prompt =  "I did not get a clear yes or no after 3 attempts. Conversation Deactivated"
        tts.start(prompt)
        question = None
        log_conversation("Assistant", 'Invalid Response')
        del(tts)
        return prompt
    while attempts < 3:
        if question and answer in ["yes", "no"]:
            prompt = f"You responded with {answer}. Thank you for your response. To reactivate the conversation say 'hi' again or 'bye' to exit"
            tts.start(prompt)
            log_conversation("Assistant", prompt)
            question = None
            attempts = 0
            del(tts)
            return prompt
        elif question is None:
            prompt = "Please say hi,so that I can ask you an interesting question"
            tts.start(prompt)
            log_conversation("Assistant", prompt)
            del(tts)
            return prompt
        elif question:
            prompt =  f"You responded with {answer}. Please answer with either yes or no."
            tts.start(prompt)
            log_conversation("Assistant", prompt)
            attempts +=1
            del(tts)
            return prompt
        elif answer is None:
            prompt =  "Didn't quite catch that."
            tts.start(prompt)
            log_conversation("Assistant", prompt)
            attempts +=1
            del(tts)
            return prompt
    

if __name__ == '__main__':
    app.run(debug=True)
