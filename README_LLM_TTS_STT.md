# 🎙️ LLM Audio Processing: TTS & STT

Welcome to the **LLM TTS & STT** module of the ELY Engine. This repository contains the complex audio-processing pipelines that allow the AI agents to communicate with users natively via Voice Notes on WhatsApp, replicating a true human-to-human interaction.

## 🎯 Overview

Text messaging is only half the battle. In markets like Morocco, voice notes are the preferred method of communication. This module intercepts incoming audio, transcribes it to text for the AI to understand (STT), and then synthesizes the AI's text response back into high-quality, natural-sounding audio (TTS).

## ✨ Key Features

- **Intelligent Branching:** A conditional `Switch` node checks incoming webhooks to determine if the payload contains text or audio.
- **Audio Extraction:** Uses HTTP Requests to fetch metadata (`Get Audio Metadata`) and securely download the raw audio file (`Download Audio`) from WhatsApp servers into binary memory.
- **Speech-to-Text (STT):** Utilizes OpenAI's Whisper model (`Transcribe a recording`) to accurately convert spoken Moroccan Darija, French, or English into raw text.
- **Text-to-Speech (TTS):** Uses OpenAI TTS (`Generate audio`) to convert the AI's generated text response into a highly realistic voice note.
- **Cloud Hosting & Delivery:** Automatically uploads generated audio to Google Drive (`Upload file`), generates a public link (`Share file`), and delivers it back to the user via the WhatsApp API (`Send message1`).

## 🚀 The Voice Note Pipeline

1. **Receive:** WhatsApp webhook triggers with an audio payload.
2. **Download:** The engine fetches the `.ogg` or `.mp3` file from Meta's servers.
3. **Transcribe (STT):** Whisper converts the audio to text.
4. **Process:** The text is sent to the Main AI Agent or Support Agent for processing.
5. **Synthesize (TTS):** The agent's text response is converted back to an audio file.
6. **Host & Share:** The audio is uploaded to Google Drive to obtain a public URL.
7. **Send:** The public URL is sent to the WhatsApp API, which plays it as a native voice note on the user's phone.

## 🛠 Prerequisites
- OpenAI API Key (Whisper for STT, TTS-1 for audio generation).
- Meta Developer Account (WhatsApp Business API for downloading and sending media).
- Google Drive API (For temporary audio hosting).
