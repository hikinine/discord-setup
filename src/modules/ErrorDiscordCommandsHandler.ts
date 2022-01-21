import { CommandInteraction } from "discord.js";
import { reply } from "../discord/methods/reply";

export const ErrorDiscordCommandsHandler = (interaction: CommandInteraction, error: any) => {

  console.log(
    interaction.user.id + "@@@@@" +
    + `${error.message?.trim() || JSON.stringify(error || []).substr(0, 200)}`
  )
  
  return reply(interaction, {
    color: "RED",
    title: "❌",
    description:
    `**Error log:**\n` +
      error.message || JSON.stringify(error || [])
        .substr(0, 200),
    footer: {}
  })
}