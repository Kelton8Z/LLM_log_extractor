This application answers questions about call logs.

The frontend has two main screes:

1. **Question and Answer Screen**
    - This screen displays a question and its corresponding answers, extracted from the documents.
    - Answers should be presented as bulleted lists of facts, using simple and clear language.
    - The screen also include a time navigation feature, allowing users to move back and forth in time in daily increments.
    - The time slider is initially set to the date of the first document uploaded.
    - Facts added or removed in the last 24 hours are highlighted (green for added, red for removed).
2. **Document Addition Screen**
    - This screen allows users to add new call transcripts by providing one or more URL.
    - This screen should also allow a question to be provided that will be used to extract information from the documents
    - The URLs will point to text files with a timestamp in the filename (e.g., `https://example.com/call_log_20240316_104111.txt`).
    - Upon adding a document (or multiple), the application should process it and suggest facts to be added, removed, or changed
    - Users should be able to approve or reject these suggestions using the UI.
    - An option to auto-approve all suggestions is available. If this is enabled, then all suggestions you make will be auto approved.
    - Remember, facts need to be added/removed/changed for the correct date

The backend correspondingly exposes two APIs
1. a POST endpoint /submit_question_and_documents that takes a question and a list of documents in a JSON payload such as:
{
  "question": "What are our product design decisions?",
  "documents": [
    "https://example.com/call_log_20240314_104111.txt",
    "https://example.com/call_log_20240315_104111.txt",
    "https://example.com/call_log_20240316_104111.txt"
  ],
  "autoApprove": true
}

Submitting a question and documents are idempotent operations. 
If the user makes a new request, all previously indexed documents and information are removed.

2. a GET endpoint /get_question_and_facts that allows polling for answers, which if ready, gives status `done`, e.g.
{
  "question": "What are our product design decisions?",
  "factsByDay": {
    "2024-03-14": [
      "The team has decided to go with a modular design for the product.",
      "The team has decided to use a responsive design to ensure the product works well on all devices.",
      "The team has decided to use a dark theme for the user interface."
    ],
    "2024-03-15": [
      "The team has decided to provide both dark and light theme options for the user interface."
    ],
    "2024-03-16": [
      "The team has decided to focus on a desktop-first design, considering responsiveness as the product evolves."
    ]
  },
  "status": "done"
}

otherwise `processing` e.g.
{
  "question": "What are our product design decisions?",
  "status": "processing"
}
