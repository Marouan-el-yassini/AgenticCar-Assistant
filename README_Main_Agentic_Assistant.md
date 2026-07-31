# 🤖 ELY Engine: The Ultimate Autonomous Agentic Assistant

Welcome to the **ELY Engine**, a comprehensive, multi-agent AI architecture designed to completely automate lead qualification, customer support, and direct bookings via WhatsApp. 

This repository serves as the central hub and orchestrator for the entire agentic ecosystem.

## 🌟 The Vision

The ELY Engine is not just a chatbot. It is a system of autonomous AI agents capable of reasoning, utilizing external tools, reading real-time databases, and communicating via both Text and Voice Notes. It acts as a full-time, flawless employee that scales infinitely.

## 🧩 Core Repositories & Modules

The engine is broken down into specialized micro-repositories to separate concerns:

1. **[Booking Process & Lead Qualification](./Booking_Lead_Qualification)**
   - The primary sales engine. Handles inquiries, checks vehicle stock, negotiates, and closes bookings. Integrates heavily with CRM (Google Sheets) and SMS (Twilio).
2. **[Service Client (Customer Support) Agent](./Service_Client_Agent)**
   - The empathetic post-sales agent. Handles complaints, modifications, and general support. Operates on an isolated memory stream to prevent context mixing.
3. **[LLM Audio Processing: TTS & STT](./LLM_TTS_STT)**
   - The voice architecture. Intercepts WhatsApp voice notes, transcribes them using OpenAI Whisper, processes the intent, and replies with ultra-realistic synthesized voice notes using OpenAI TTS.
4. **[Client Management & Expiry Notifications](./Client_Management)**
   - The background chron-job module. Automatically manages the CRM, sends Twilio SMS reminders to clients whose rentals expire soon, and cleans up expired database rows.

## 🖼️ Visualizing the Workflows

Below are the architectural views of the n8n workflows powering the ELY Engine:

### Core Agentic Architecture
![Main Workflow Screen](C:/Users/hp/.gemini/antigravity/brain/a38ec5e5-3552-42c9-b3ce-3875d1ac56ff/CaptureEcran.jpg)

### Client Management & Expiry Scheduler
![Client Management Screen](C:/Users/hp/.gemini/antigravity/brain/a38ec5e5-3552-42c9-b3ce-3875d1ac56ff/ClientMangement.jpg)

## ⚙️ Global Architecture & Workflow

The main workflow acts as the central nervous system:
- **WhatsApp Trigger:** The entry point for all user interactions.
- **Format Routing:** A master Switch node determines if the input is Audio or Text, branching into the STT pipeline if necessary.
- **Intent Recognition:** A `Basic LLM Chain` acts as a triage nurse, reading the transcribed text and deciding whether to route the user to the **Booking Agent** or the **Customer Support Agent**.
- **Memory Persistence:** Global Redis databases (`Redis Chat Memory`) constantly track the state of the conversation.
- **Output Delivery:** Based on the user's original input format (Text vs Audio), a conditional `If` node ensures the AI responds in the exact same format, delivering the final payload via the WhatsApp API.

## 🚀 Getting Started

To deploy the full ELY Engine, you will need to configure environment variables across all modules:
- `OPENAI_API_KEY` (For GPT-4o, Whisper, and TTS)
- `WHATSAPP_ACCESS_TOKEN` & `WHATSAPP_PHONE_ID`
- `REDIS_URL`
- `GOOGLE_SERVICE_ACCOUNT_JSON` (For Drive and Sheets integration)
- `TWILIO_ACCOUNT_SID` & `TWILIO_AUTH_TOKEN`

Explore the individual module READMEs linked above for specific deployment instructions and node configurations!
