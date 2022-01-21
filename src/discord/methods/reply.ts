import { CommandInteraction, MessageEmbedOptions } from "discord.js";

const defaultReplyOptions = {
  thumbnail: {
    url: "https://playermon.com/img/horizontal_logo.0750ec9f.png",
  },
  color: "#2230ab",
  footer: {
    icon_url:
      "https://s2.coinmarketcap.com/static/img/coins/200x200/12278.png",
    text: "_________ ____________ _____________ ____________ _________ ____________ _____ _________",
  },
  timestamp: Date.now(),
} as MessageEmbedOptions

export const reply = (interaction: CommandInteraction, replyOptions: MessageEmbedOptions) => {
  
  const interactionReplyMode = interaction.deferred ? "editReply" : "reply"

  const replyOptionsEmbed = {
    embeds: [
      {
        ...defaultReplyOptions,
        ...replyOptions
      }
    ]
  }

  return Promise.resolve(
    interaction[interactionReplyMode].call(interaction, replyOptionsEmbed )
  )

  
}