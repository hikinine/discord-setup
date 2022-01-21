import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export type IDiscordPermission =
  | "owner"
  | "admin"
  | "mod"
  | "helper"
  | "user"

export const permissionList: IDiscordPermission[] = [
  "owner",
  "admin",
  "mod",
  "helper",
  "user",
];


export interface Commands {
  discordPermission?: IDiscordPermission[];
  ephemeral?: boolean;
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
