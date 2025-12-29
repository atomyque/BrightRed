import { Module } from "../module"
import { queueMessage } from "../utils/partyMessage"

const rgstr = register("playerInteract", (action, pos) => {
  if (!(action.toString() == "RIGHT_CLICK_BLOCK")) return
  const x = pos.getX()
  const y = pos.getY()
  const z = pos.getZ()

  const block = World.getBlockAt(x, y, z).type.getName()
  if (block != "Lever") return
  queueMessage(`Clicked lever in x:${x}, y:${y}, z:${z}`)
})

new Module("Lever", rgstr, "Sends in chat when you click a lever", true)