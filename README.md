# AI Writer - Blog Post Intro Generator (TypeScript & Local LLM)

This application is a simple AI-powered blog post introduction generator. Users can input a topic, select a local LLM (or specify a custom one), and the application will generate a compelling introduction for a blog post on that topic.

**App Type Selected:** ✍️ AI Writer (Blog Intro Generator)

## Features

- Input field for blog post topic.
- Dropdown to select pre-configured local LLMs (e.g., llama3, mistral, phi3).
- Option to specify a custom local LLM name (including tags, e.g., `my-model:latest`).
- Displays generated blog intro.
- Loading indicator during generation.
- Error message display for issues (e.g., Ollama not running, model not found).
- Logs all prompts, generated outputs, and errors to `output.log` in the project root.

## Constraints Adhered To

- **No OpenAI or Anthropic APIs:** The application exclusively uses a local LLM via Ollama.
- **Local Inference:** All LLM logic runs on the user's machine.

## Requirements Met

- **Prompt input box:** Yes (for the blog post topic).
- **Model output display:** Yes (shows the generated introduction).
- **Temperature setting:** Not explicitly implemented in this version to keep it simple, but Ollama models can have temperature set if pulled/configured that way. The app itself doesn't provide a UI for this.
- **Loading UI:** Yes (a simple text and spinner).
- **Output logging:** Yes (all interactions are logged to `ai-writer-ts/output.log`).

## Prerequisites

1.  **Install Ollama:**
    - Follow the instructions on the [Ollama website](https://ollama.ai/) to download and install Ollama for your operating system.
2.  **Download LLM Models:**
    - Pull the models you intend to use. The app defaults to `llama3` but offers others like `mistral`, `phi3`, `gemma`, `codellama`, and `tinyllama`. You can also specify custom models.
    - Example: `ollama pull llama3`
    - Example: `ollama pull mistral`
3.  **Install Node.js and npm:**
    - If you don't have them, download and install them from the [Node.js website](https://nodejs.org/). (Node.js version 14.x or newer recommended).

## Setup and Running the App Locally

1.  **Clone the repository (or download the files into a folder named `ai-writer-ts`):**

    ```bash
    # Example if you have git installed
    # git clone <repository_url> ai-writer-ts
    # cd ai-writer-ts
    ```

    If you downloaded the files, ensure they are inside a folder named `ai-writer-ts`.

2.  **Navigate to the project directory:**

    ```bash
    cd ai-writer-ts
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Build the TypeScript code:**

    ```bash
    npm run build
    ```

5.  **Run the application:**

    - **Production mode (after build):**
      ```bash
      npm start
      ```
    - \*\*Development mode (uses `nodemon` for auto-restarts on code changes in `src/`):
      ```bash
      npm run dev
      ```
      (This will also compile TypeScript on the fly)

6.  **Ensure Ollama is running:** The Ollama application/service must be active on your machine for the app to connect to it.

7.  **Open the app in your browser:**
    Navigate to `http://localhost:3000`

## Model Used

The application is configured to allow selection from several models, with `llama3` as the default recommended model. Users can also specify any other model they have pulled into their local Ollama instance (e.g., `mistral`, `phi3`, `gemma`, `codellama`, `tinyllama`, or a custom model like `my-model:latest`).

## Project Structure

```
ai-writer-ts/
├── public/                   # Static frontend assets
│   ├── index.html            # Main HTML page
│   ├── style.css             # CSS styles
│   └── script.js             # Client-side JavaScript
├── src/                      # Backend TypeScript source
│   └── app.ts                # Express server and Ollama interaction logic
├── dist/                     # Compiled JavaScript (output of tsc)
├── package.json              # Project metadata and dependencies
├── tsconfig.json             # TypeScript compiler options
├── output.log                # Log file for prompts and responses (created on first run)
└── README.md                 # This file
```
