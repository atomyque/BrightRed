import { Module } from "../module"
import { queueMessage } from "../utils/partyMessage"

let lastTick = Date.now()

//Two registers here because the current module class only is made to work with one register
register("packetReceived", () => {
  lastTick = Date.now()
}).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction)

const rgstr = register("packetReceived", () => {
  const timeDelta = Date.now() - lastTick
  if (timeDelta < 500) return
  queueMessage(`The server has lagged for ${timeDelta}ms`)
}).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction)

new Module("Server Lag", rgstr, "Sends for how much time the server has lagged", true)