# 🎧 Service Client (Customer Support) Agent

Welcome to the **Service Client Agent** module of the ELY Engine. This repository contains the workflows for the autonomous Customer Support AI, designed to handle post-booking queries, complaints, and general assistance with high empathy and efficiency.

## 🎯 Overview

While the main AI focuses on sales and bookings, the Customer Support Agent is a specialized sub-agent trained specifically for de-escalation, troubleshooting, and providing accurate support information. It ensures that existing customers receive instant, reliable help 24/7.

## ✨ Key Features

- **Empathetic AI:** Driven by a specialized `OpenAI Chat Model`, prompted to act as a highly empathetic, patient, and solution-oriented support representative.
- **Complaint Logging:** Listens to user issues and securely logs complaints into the database for human review if necessary.
- **Fleet Access:** Has read-only access to the current fleet inventory (`CarsStock`, `CarAvailability`) to assist users with modifications or vehicle-specific queries.
- **Seamless Handoff:** Can take over conversations seamlessly if the main routing system detects a support intent rather than a sales intent.
- **Isolated Memory:** Uses its own dedicated memory stream (`Redis Chat Memory1`) to maintain context specifically related to support tickets, preventing confusion with previous sales negotiations.

## 🚀 Workflow Execution

1. **Intent Recognition:** The main webhook flow detects that an incoming message is a support request or complaint.
2. **Routing:** The conversation is routed away from the Sales Agent and handed over to the `CustomerSupportAgent`.
3. **Context Loading:** The agent retrieves the user's booking history from the CRM to understand the context of the issue.
4. **Resolution:** The AI interacts with the user to resolve the problem, check vehicle availability for replacements, or log a formal ticket.

## 🛠 Prerequisites
- OpenAI API Key (GPT-4o tailored for empathy and support).
- Google Sheets API (for reading fleet status and logging tickets).
- Redis Server (for maintaining long-term support context).
