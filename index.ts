import { Bot } from "grammy";
import { Configuration, OpenAIApi } from "openai";
import { API_TOKEN, OPENAI_API_KEY, authorizedUsers } from "./secrets";

const bot = new Bot(API_TOKEN);
const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }));

const allowedUserIds = authorizedUsers;
const chatHistories = new Map<number, any[]>();

function getChatHistory(chatId: number) {
  if (!chatHistories.has(chatId)) {
    chatHistories.set(chatId, []);
  }
  return chatHistories.get(chatId) as any[];
}

function resetChatHistory(chatId: number) {
  chatHistories.delete(chatId);
}

bot.command("reset", async (ctx) => {
  const chatId = ctx.chat.id;
  resetChatHistory(chatId);
  await ctx.reply("Chat history has been reset.");
});

bot.command("gpt", async (ctx) => {
  const chatType = ctx.chat.type;
  const userId = ctx.from!.id;

  if (
    (chatType === "supergroup" || chatType === "private") &&
    allowedUserIds.has(userId)
  ) {
    const userInput = ctx.message!.text!.split("gpt")[1]?.trim();
    const chatId = ctx.chat.id;
    const chatHistory = getChatHistory(chatId);

    chatHistory.push({ role: "user", content: userInput });

    // Send the initial message with temporary text
    const temporaryMessage = await ctx.reply("Processing...");

    try {
      const response = await openai.createChatCompletion({
        messages: [
          {
            role: "system",
            content: "general",
          },
          ...chatHistory,
        ],
        model: "gpt-3.5-turbo",
      });

      const botMessage = response.data.choices[0].message;
      if (botMessage) {
        chatHistory.push({ role: "assistant", content: botMessage.content });
        // Update the message with the final text
        await ctx.api.editMessageText(
          chatId,
          temporaryMessage.message_id,
          botMessage.content
        );
      } else {
        await ctx.reply("No response, try asking again");
      }
    } catch (error) {
      console.error("Error handling user message:", error);
      await ctx.reply("Something went wrong, try asking again");
    }
  }
});

bot.command("ping", async (ctx) => {
  await ctx.reply("pong");
});

async function main() {
  bot.start();
  console.log(
    "Bot started, link:",
    await bot.api.getMe().then((res) => "https://t.me/" + res.username)
  );
}

bot.command("myid", async (ctx) => {
  await ctx.reply(ctx.from!.id.toString());
});

// Set my commands
bot.api.setMyCommands([
  { command: "gpt", description: "Talk to ChatGPT (v3.5)" },
  { command: "reset", description: "Reset chat history" },
  { command: "ping", description: "Check if bot is alive" },
  { command: "myid", description: "Get my user id" },
]);

main();
