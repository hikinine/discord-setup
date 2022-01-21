
import * as config from "../../config/discord.json"
import { Interaction } from "discord.js";
import Client from "../client"
import { DeadlineTimeout } from "../../modules";
import { seconds } from "../../utils";

import {permissionList} from "../../types"

export const onInteractionCreate = async (interaction: Interaction, client: Client) => {

  if (!interaction.isCommand()) return;
  
  try {
      
    const command = client.commands.get(interaction.commandName)
  
    if (!command) throw new Error("Command not registered!") 


    await interaction.deferReply({ 
      ephemeral:  command?.ephemeral ? true : false
    })


    if (command.discordPermission?.length > 0) {

      let hasEnoughPermission = false

      for (const permission of permissionList) {

        if (command.discordPermission?.includes(permission)) {
        
          const { _roles }: any = interaction.member 
    
          if (_roles?.includes(config?.PERMISSIONS_ROLES?.[permission])) {
            hasEnoughPermission = true;
            break;
          }
        }
      }

      if (!hasEnoughPermission)
        throw new Error("You don't have permission for this command!" )
    }
  
    await command.execute.call(null, interaction)

    DeadlineTimeout(interaction, seconds(90));
 
  } 
  catch (error) {

    const interactionReplyMode = 
      interaction.deferred || interaction.replied ? "editReply" : "reply"

    await interaction[interactionReplyMode].call(interaction , {
      content: error.message || "An error ocurred while executing that command.",
    })
  }
}