import Client from "./client"

import {
  onInteractionCreate,
  onReady,
} from "./events"

export default () => {
  const client = new Client({ path: "./src/discord/commands" });

  client.once('ready', () => onReady(client));
  
  client.on('interactionCreate', 
     interaction => onInteractionCreate(interaction, client))

  

}

