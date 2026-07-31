# 🚗 Booking Process & Lead Qualification

Welcome to the **Booking Process & Lead Qualification** module of the ELY Engine Agentic Assistant. This repository contains the workflows and tools responsible for autonomously managing car rental inquiries, qualifying leads, and closing bookings directly through messaging platforms like WhatsApp.

## 🎯 Overview

This module acts as a highly professional, AI-driven Car Rental Advisor. It interacts with customers in real-time, understands their rental requirements, checks inventory, and seamlessly guides them through the reservation process. It is designed to act completely autonomously without revealing its AI nature to the end user.

## ✨ Key Features

- **Conversational Booking:** Engages with users naturally (in French or Moroccan Darija) to identify their car rental needs (dates, vehicle type, budget).
- **Real-Time Inventory Check:** Integrates directly with Google Sheets (`Get_Car_DataBase`, `Get_Stock_client`) to check live car availability and pricing.
- **Automated Lead Qualification:** Evaluates user intent to determine if they are a high-value lead before proceeding to the booking stage.
- **Client CRM Management:** Automatically saves, retrieves, or updates client records in the CRM database (`AddClientDB`, `UpdateClientDB`, `GetClientDB`).
- **Multi-Channel Communication:** Can push notifications and confirmations via WhatsApp or standard SMS via Twilio (`sendSMSClient`).
- **Contextual Memory:** Uses persistent Redis databases (`Redis Chat Memory`) to remember returning customers and past interactions.

## 🧠 Architecture & Agents

- **AI Agent (Core):** Driven by `OpenAI Chat Model` (GPT-4o), this agent is equipped with strict system prompts to maintain a courteous, professional persona.
- **Tool Calling:** The agent has native access to inventory lookup tools and CRM mutation tools, allowing it to take real-world actions on behalf of the business.

## 🚀 How it Works

1. **Trigger:** A message is received via the main WhatsApp webhook.
2. **Routing:** If the intent is determined to be a new rental inquiry, it is routed to the Booking Agent.
3. **Data Retrieval:** The AI queries the Car Database for specifications and checks current stock.
4. **Negotiation & Qualification:** The AI discusses options with the user.
5. **Closure:** Once confirmed, the AI adds the user's details to the CRM and sends a confirmation message.

## 🛠 Prerequisites & Integration
- OpenAI API Key (GPT-4o for complex reasoning and tool usage).
- Twilio API Credentials (for SMS fallback).
- Google Cloud Service Account (for Google Sheets CRM integration).
- Redis Server (for chat history persistence).
