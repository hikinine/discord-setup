import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { Commands } from "../../../types";
import { ErrorDiscordCommandsHandler } from "../../../modules";
import { reply } from "../../methods/reply";

export const command: Commands = {
  
  discordPermission: ["helper"],
  
  data: new SlashCommandBuilder()
    .setName("teste")
    .setDescription("teste"),

  async execute(interaction: CommandInteraction) {
    try {


    } 
    catch (error) {
      await ErrorDiscordCommandsHandler(interaction, error);
    }
  },
};
