import express, { Request, Response } from 'express'
import ollama, { ChatResponse } from 'ollama'
import fs from 'fs'
import path from 'path'

const app = express()
const port = 3000
const logFilePath = path.join(__dirname, '../output.log') // Adjusted path for src/dist structure

// Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public'))) // Serve static files from 'public' directory

// Function to append to log file
function appendToLog(logEntry: string): void {
  fs.appendFile(logFilePath, logEntry + '\n', (err) => {
    if (err) {
      console.error('Failed to write to log file:', err)
    }
  })
}

interface GenerateIntroRequest extends Request {
  body: {
    topic: string
    model_name: string
  }
}

// API endpoint to generate blog intro
app.post(
  '/generate-intro',
  async (req: GenerateIntroRequest, res: Response) => {
    const { topic, model_name } = req.body

    if (!topic || !model_name) {
      return res
        .status(400)
        .json({ error: 'Topic and model_name are required.' })
    }

    const prompt = `Write a compelling and engaging blog post introduction for the topic: "${topic}". Make it about 3-4 sentences long.`
    const logEntry = `[${new Date().toISOString()}] MODEL: ${model_name}, TOPIC: "${topic}"`
    console.log(
      `Generating intro for topic: "${topic}" using model: ${model_name}`
    )

    try {
      const response: ChatResponse = await ollama.chat({
        model: model_name,
        messages: [{ role: 'user', content: prompt }],
        stream: false,
      })

      const intro = response.message.content
      appendToLog(`${logEntry}\nGENERATED INTRO: "${intro}"\n---`)
      res.json({ intro })
    } catch (error: any) {
      console.error('Error interacting with Ollama:', error)
      let errorMessage = `Error interacting with Ollama: ${error.message}.`

      // Check for specific error types related to Ollama connection or model availability
      if (
        error.cause &&
        typeof error.cause === 'object' &&
        'code' in error.cause &&
        error.cause.code === 'ECONNREFUSED'
      ) {
        errorMessage =
          'Error: Connection refused. Please ensure Ollama is running.'
      } else if (
        error.message &&
        error.message.toLowerCase().includes('model not found')
      ) {
        errorMessage = `Error: Model '${model_name}' not found. Please pull the model using 'ollama pull ${model_name}'.`
      } else if (
        error.message &&
        error.message.toLowerCase().includes('connection refused')
      ) {
        errorMessage =
          'Error: Connection refused. Please ensure Ollama is running and accessible.'
      }

      appendToLog(`${logEntry}\nERROR: ${errorMessage}\n---`)
      res.status(500).json({ error: errorMessage })
    }
  }
)

app.listen(port, () => {
  console.log(`AI Writer app listening at http://localhost:${port}`)
  // Create log file if it doesn't exist with a startup message
  if (!fs.existsSync(logFilePath)) {
    appendToLog(`[${new Date().toISOString()}] Log file created.`)
  }
  appendToLog(`[${new Date().toISOString()}] Server started on port ${port}`)
})
