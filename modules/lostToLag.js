import { Module } from "../module"
import { queueMessage } from "../utils/partyMessage"

let ticks = 0
let startTime = Date.now()

const rgstr = register("chat", (event) => {
  const message = ChatLib.getChatMessage(event).removeFormatting().trim()
  if (!(message.startsWith("☠ Defeated"))) return

  svRegister.unregister()
  const secondDelta = (Date.now() - startTime) / 1000
  const lostToLag = (secondDelta - (ticks / 20)).toFixed(2)
  queueMessage(`Lost ${lostToLag} seconds to lag`)
})

register("chat",() => {
  ticks = 0
  svRegister.register()
  startTime = Date.now()
}).setCriteria("&e[NPC] &bMort&f: &rHere, I found this map when I first entered the dungeon.&r")

const svRegister = register("packetReceived", () => {
  ticks++
}).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction).unregister()

new Module("Lost To Lag", rgstr, "Sends how much time you lost to lag", true)