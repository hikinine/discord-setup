import { Message, MessageActionRow } from "discord.js";
import * as config from "../../config/discord.json"

export const onMessage = async (message: Message) => {

  if (message.author.bot) {
    return;
  }

}