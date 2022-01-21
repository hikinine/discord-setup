import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

import { Commands } from "../../../types";
import { reply } from "../../methods/reply";
import { ErrorDiscordCommandsHandler } from "../../../modules";

export const command: Commands = {
  
  discordPermission: [],

  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("test command"),

  async execute(interaction: CommandInteraction) {
    try {

      reply(interaction, { description: "pong"})
    } 
    catch (error) {
      await ErrorDiscordCommandsHandler(interaction, error);
    }
  },
};
