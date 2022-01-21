//import "./discord/register"
import DiscordBot from "./discord/"

DiscordBot()

process.on("uncaughtException", (err, origin) => {
  console.log("ULTIMA CAMADA DE ERRO")
  console.log(err)
})