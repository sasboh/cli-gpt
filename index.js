import OpenAI from 'openai'
import prompts from 'prompts'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const messages = [
  { role: 'system', content: 'You are CliGPT, a helpful assistant.' }
]

const model = 'gpt-4'

const request = async messages => {
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: model
  })
  return completion.choices[0].message
}

const ask = async question => {
  messages.push({ role: 'user', content: question })
  const response = await request(messages)
  console.log(response.content)
  messages.push(response)
}

;(async () => {
  console.log('Hi, I am CliGPT, how can I help you?')
  while (true) {
    const input = await prompts({
      type: 'text',
      name: 'question',
      message: ''
    })
    if (input.question) {
      await ask(input.question)
    } else {
      process.exit(0)
    }
  }
})()
