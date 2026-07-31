export const nodeDefinitions: Record<string, { definition: string; goal: string; promptSummary?: string }> = {
  "WhatsApp Trigger": {
    definition: "Webhook listener connected to the WhatsApp Business API.",
    goal: "Instantly captures incoming messages from users and triggers the entire automation workflow."
  },
  "Switch": {
    definition: "Conditional routing node.",
    goal: "Checks if the incoming message is a voice note (audio) or standard text, routing it to the appropriate processing branch."
  },
  "Get Audio Metadata": {
    definition: "HTTP Request node to WhatsApp API.",
    goal: "Retrieves the download URL and metadata for the received voice note."
  },
  "Download Audio": {
    definition: "HTTP Request node.",
    goal: "Downloads the actual audio file from WhatsApp servers into the workflow's binary memory."
  },
  "Transcribe a recording": {
    definition: "OpenAI Whisper Audio transcription node.",
    goal: "Converts the user's spoken voice note into raw text so the AI Agent can read and understand it."
  },
  "Basic LLM Chain": {
    definition: "Standard Language Model execution chain.",
    goal: "Processes the transcribed text to clean it up or perform initial intent recognition before passing to the main agent."
  },
  "AI Agent": {
    definition: "The core autonomous intelligence of the ELY Engine.",
    goal: "Acts as a professional car rental advisor. It understands user requests, searches the car database, checks stock, and formulates persuasive responses in French or Arabic.",
    promptSummary: "The agent is instructed to act as a courteous and professional Car Rental Advisor in Morocco. It must never reveal it is an AI, must keep answers concise, and must use tools to check real-time stock and prices before giving information. It speaks Darija or French depending on the user's language."
  },
  "CustomerSupportAgent": {
    definition: "Secondary autonomous support agent.",
    goal: "Handles complaints, complex support queries, or escalations from the main agent.",
    promptSummary: "Acts as a highly empathetic customer support representative. Its goal is to de-escalate issues, provide accurate support information, and log user complaints to the database securely."
  },
  "OpenAI Chat Model": {
    definition: "GPT-4o Language Model for Intent Recognition.",
    goal: "Provides the underlying intelligence for the Basic LLM Chain to classify and process the transcribed audio before it hits the main agent."
  },
  "OpenAI Chat Model1": {
    definition: "GPT-4o Language Model.",
    goal: "Provides the underlying intelligence and advanced reasoning capabilities for the main AI Agent."
  },
  "OpenAI Chat Model2": {
    definition: "GPT-4o Language Model.",
    goal: "Provides the underlying intelligence and empathetic reasoning for the Customer Support Agent."
  },
  "Redis Chat Memory": {
    definition: "Persistent Redis Database connection.",
    goal: "Stores the conversation history so the AI remembers past messages from the same user across multiple sessions."
  },
  "Redis Chat Memory1": {
    definition: "Persistent Redis Database connection.",
    goal: "Stores the conversation history for the Customer Support agent."
  },
  "sendSMSClient": {
    definition: "Twilio SMS Tool.",
    goal: "Allows the AI Agent to send automated text messages directly to the client's phone."
  },
  "Get_Stock_client": {
    definition: "Google Sheets integration tool.",
    goal: "Allows the AI to securely query the inventory database to see exactly which cars are currently available."
  },
  "Get_Car_DataBase": {
    definition: "Google Sheets integration tool.",
    goal: "Allows the AI to lookup technical specifications, pricing, and details of specific vehicles."
  },
  "AddClientDB": {
    definition: "Google Sheets integration tool.",
    goal: "Saves a new user's contact information and rental preferences into the CRM for future reference."
  },
  "GetClientDB": {
    definition: "Google Sheets integration tool.",
    goal: "Retrieves existing client records from the CRM."
  },
  "UpdateClientDB": {
    definition: "Google Sheets integration tool.",
    goal: "Updates an existing client's information in the CRM."
  },
  "DeleteClientInfo": {
    definition: "Google Sheets integration tool.",
    goal: "Removes client data from the CRM."
  },
  "CarsStock": {
    definition: "Google Sheets integration tool.",
    goal: "Provides the Customer Support agent with access to current fleet inventory."
  },
  "CarAvailability": {
    definition: "Google Sheets integration tool.",
    goal: "Checks availability dates for specific vehicles."
  },
  "Generate audio": {
    definition: "OpenAI Text-to-Speech (TTS) node.",
    goal: "Converts the AI Agent's written text response back into a natural-sounding voice note."
  },
  "Upload file": {
    definition: "Google Drive integration node.",
    goal: "Temporarily hosts the generated audio file in the cloud so it can be sent via WhatsApp."
  },
  "Share file": {
    definition: "Google Drive integration node.",
    goal: "Generates a public, shareable link for the audio file."
  },
  "Send message": {
    definition: "WhatsApp API node.",
    goal: "Delivers the final text response back to the user's phone."
  },
  "Send message1": {
    definition: "WhatsApp API node.",
    goal: "Delivers the final voice note audio response back to the user's phone."
  },
  "If": {
    definition: "Conditional branching node.",
    goal: "Checks if the user originally sent a text or a voice note, ensuring the AI replies in the exact same format."
  }
};
