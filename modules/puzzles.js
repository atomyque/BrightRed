import { Module } from "../module"
import { queueMessage } from "../utils/partyMessage"

let found = false

const rgstr = register("packetReceived", () => {
  if (found) return
  TabList.getNames().forEach(line => {
    if (!line.includes("§b§lPuzzles: §r§f(")) return
    const puzzlecount = line.match(/\((\d+)\)/)
    if (!puzzlecount) return
    found = true
    queueMessage(`The map has ${puzzlecount[1]} puzzles`)
  })
}).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction)

register("worldLoad", () => {
  found = false
})

new Module("Puzzle Count", rgstr, "Sends the number of puzzles on dungeon start", true)