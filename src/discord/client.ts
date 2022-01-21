import { BitFieldResolvable, Client, Intents, IntentsString } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import config from "../config/discord.json";
import { Commands } from "../types";
import fs from "fs";

import "dotenv/config"

interface CommandsOptions {
  path: string;
}
export default class extends Client {
  private restCommands: string[] = [];

  public commands: Map<string, Commands>;

  constructor(private commandsOptions: CommandsOptions) {
    super({ 
      intents: config.CLIENT_INTENTS as BitFieldResolvable<IntentsString, number>
    });

    this.commands = new Map<string, Commands>();

    this.start()
  }

  private start = () => {

    console.log("Reading command files!")
    this.fileReadCommandsAndBuild();

    console.log("Setup Rest Commands Client!")
    this.SetupRestCommandsClient();
    
    this.LoginApplication()


  }

  private fileReadCommandsAndBuild = () => {
    try {
      const commandFiles = fs
        .readdirSync(this.commandsOptions.path)
        .filter((file) => !file.endsWith(".ts"));

      for (const file of commandFiles) {
        const {command} = require(`./commands/${file}/`);
        
        if (command?.data) {
          this.restCommands.push(command.data.toJSON());
          this.commands.set(command.data.name, command);
        }
       
      }
    } catch (error) {
      console.log(error);
    }
  };

  private SetupRestCommandsClient = async () => {
    try {
      const rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN);

      const $ = process.env.ENV === "production"
        ? {
          method: "applicationCommands", 
          params: [process.env.CLIENT_ID],
        }
        : {
          method: "applicationGuildCommands", 
          params: [process.env.CLIENT_ID, config.GUILD_ID],
        }

      await rest.put(
        Routes[$.method].call(null, ...$.params), 
        { body: this.restCommands}
      );
    } catch (error) {
      console.log(error);
    }
  };


  private LoginApplication = () => {
    this.login(process.env.CLIENT_TOKEN)
  }
}
