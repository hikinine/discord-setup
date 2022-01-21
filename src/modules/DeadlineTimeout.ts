import { CommandInteraction } from "discord.js"

export const DeadlineTimeout = (interaction: CommandInteraction, ms: number) => {

  if (! interaction.replied) {
    
    setTimeout(() => {
      try {
        interaction.reply({
          content: "Deadline exceeded (60 seconds)",
          ephemeral: true
        })
      } catch (error) { }
      
    }, ms);
  
  }
}