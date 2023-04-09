# GPT-3 Telegram Bot

This project is a Telegram bot that interacts with GPT-3.5 (what runs ChatGPT) using the OpenAI API. Users can have a conversation with the GPT-3.5 model in a Telegram chat.

## Features

- Authorized users can use the `/gpt` command to converse with the GPT-3 model.
- Users can reset their chat history with the `/reset` command.
- The bot sends Processing... while waiting for chatgpt's response.

## Prerequisites

- Node.js (v16 or later)
- npm or yarn (package manager)
- An OpenAI API key
- A Telegram bot token

## Setup

1. Clone the repository:

```

git clone https://github.com/dredshep/chatgpt-telegram-bot.git
cd chatgpt-telegram-bot

```

2. Install dependencies:

```

npm install

```

or

```

yarn install

```

3. Create a `secrets.ts` file in the project root directory and add your OpenAI API key and Telegram bot token:

```

const API_TOKEN = "123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Replace with your Telegram bot token.
const OPENAI_API_KEY = "sk-ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Replace with your OpenAI API key.
const authorizedUsers = new Set([123456789, 987654321]); // Replace with your Telegram user IDs.

export { API_TOKEN, OPENAI_API_KEY, authorizedUsers };

```

4. Run the bot:

```

ts-node index.tsx

```

You can also set it up to run on pm2 in daemonized version that will live after you close your terminal

```
pm2 start ts-node --name chatgpt-telegram-bot -- index.ts

The bot should now be running and ready to receive commands.

## Usage

### Available commands

- `/ping`: Check if the bot is alive.
- `/myid`: Get your Telegram user ID.
- `/gpt`: Start a conversation with GPT-3.
- `/reset`: Reset your chat history.

### Starting a conversation

1. Start a chat with your bot on Telegram.
2. Type `/gpt` followed by your message.
3. The bot will respond with GPT-3's reply.

### Resetting chat history

If you want to start a new conversation, use the `/reset` command to clear your chat history with the bot.

## License

This project is licensed under the [MIT License](LICENSE).
