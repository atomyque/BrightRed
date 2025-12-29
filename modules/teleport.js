import { Module } from "../module"
import { queueMessage } from "../utils/partyMessage"

const rgstr = register("packetReceived", (packet) => {
  const x = packet.func_148932_c()
  const y = packet.func_148928_d()
  queueMessage(`Teleported to x : ${x}, y : ${y}`)
}).setFilteredClass(net.minecraft.network.play.server.S08PacketPlayerPosLook)

new Module("Teleport", rgstr, "Sends A message every time you teleport", false)