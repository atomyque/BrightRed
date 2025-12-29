import { Module } from "../module"
import { queueMessage } from "../utils/partyMessage"

let ticks = 0
let timerStart = Date.now()
let found = false


register("packetReceived", () => {
  if (found) return
  TabList.getNames().forEach(line => {
    if (!line.includes("§b§lPuzzles: §r§f(")) return
    ticks = 0
    found = true
    timerStart = Date.now()
    svRegister.register()
  })
}).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction)

register("worldLoad", () => {
  found = false
})

const svRegister = register("packetReceived", () => {
  ticks++
}).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction)

const rgstr = register("chat", () => {
  svRegister.unregister()
  const secondDelta = (Date.now() - timerStart) / 1000
  const tps = Math.min((ticks / secondDelta), 20).toFixed(2)
  queueMessage(`The server has been running at ${tps} tps since the instance has started`)
}).setCriteria("&e[NPC] &bMort&f: &rHere, I found this map when I first entered the dungeon.&r")

new Module("Instance Start Tps", rgstr, "Sends the dps of the serve from the start of the instance to the start of the dungeon", true)