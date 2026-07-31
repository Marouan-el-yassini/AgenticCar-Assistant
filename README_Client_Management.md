# 📅 Client Management & Expiry Notifications

Welcome to the **Client Management & Expiry Notifications** module of the ELY Engine. This repository contains the automated cron-based workflow that proactively manages your active client bookings, sends automated reminders, and cleans up expired data from your CRM without any human intervention.

## 🎯 Overview

Maintaining an up-to-date CRM is crucial for a car rental business. Instead of manually checking which rentals are ending soon, this autonomous workflow runs on a schedule to scan your active bookings. It automatically sends a polite SMS to clients whose rentals expire tomorrow, offering them the chance to extend, and automatically deletes records that have fully expired.

## ✨ Key Features

- **Automated Scheduling:** Runs fully autonomously at predefined intervals via a Schedule Trigger.
- **Timezone-Aware Logic:** Uses robust JavaScript to calculate the exact number of days remaining on a rental based on the local time in Morocco (`Africa/Casablanca`).
- **Proactive SMS Reminders:** Integrates with Twilio to send automated text messages to clients exactly one day before their rental expires, acting as a powerful upselling/extension tool.
- **Database Housekeeping:** Automatically removes clients whose rental periods have completely expired, keeping your active Google Sheets CRM clean and lightweight.
- **Conditional Routing:** Uses a Switch node to intelligently route records based on whether they are "active", "expiringSoon", or "expired".

## 🚀 How the Workflow Operates

1. **Trigger:** The workflow wakes up automatically based on the Schedule Trigger.
2. **Fetch Data:** It connects to the Google Sheets CRM and pulls all active rows from the "Bookings" sheet.
3. **Analyze Dates:** A custom JavaScript Code block iterates over the data:
   - Calculates the difference between today's date and the rental's `End Date`.
   - Tags the row as `expired` if the end date has passed.
   - Tags the row as `expiringSoon` if exactly 1 day remains.
4. **Action - Expiring Soon:** The workflow routes the client's number to Twilio, sending: *"Hello, Your rental vehicle [Vehicle Name] is scheduled to end tomorrow. If you would like to extend your rental, simply reply to this message. Thank you."*
5. **Action - Expired:** The workflow looks up the exact row using the `Booking ID` and securely deletes it from the Google Sheet.

## 🛠 Prerequisites

- n8n instance (Self-hosted or Cloud).
- Google Cloud Service Account (For read/write/delete access to Google Sheets).
- Twilio Account (For SMS/WhatsApp outbound messaging).
- A Google Sheet formatted with headers including: `Booking ID`, `Start Date`, `End Date`, `WhatsApp Number`, and `Vehicle`.

## 🔒 Security Note
When importing this workflow JSON into your n8n instance, remember to re-authenticate your Google Sheets and Twilio nodes using your own secure credentials. The provided template has all sensitive IDs stripped for your protection.
