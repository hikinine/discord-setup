import Client from "../client"
import * as config from "../../config/discord.json"

export const onReady = async (client: Client) => {

  console.log(`Logged in as ${client.user.tag}!`);

  try {
    client.user.setActivity({ 
      type: "WATCHING",
      name: config.setActivity.name,
    })
  } catch (error) {}  
}