import { Module } from "../module"
import { queueMessage } from "../utils/partyMessage"

const rgstr = register("packetSent", (packet) => {
  if (!Player?.getContainer()?.getName()?.includes("Wardrobe")) return

  const itemName = packet.func_149546_g().func_82833_r().removeFormatting()
  if (!(itemName.includes("Slot ") && itemName.includes(":"))) return
  const wardrobeSlot = itemName[5]
  const slotId = packet.func_149544_d()

  let message = ""

  if (itemName.includes("Equipped")) {
    message += "Unequipped"
  }
  else {
    message += "Equipped"
  }

  message += ` wardrobe slot ${wardrobeSlot} `

  let armor = ""
  let couldntIdentify = false
  for (let i = 0; i < 4; i++) {
    let slot = slotId - (i + 1) * 9
    let armorPiece = Player.getContainer().getItems()[slot]?.getName().removeFormatting()
    if (armorPiece.includes("Slot")) {
      armor += ("Empty Slot" + (i == 3 ? "" : ", "))
    }
    else {
      armor += (armorPiece + (i == 3 ? "" : ", "))
    }
  }

  if (couldntIdentify) {
    queueMessage(message)
    return
  }
  
  message += `(${armor})`
  queueMessage(message)
}).setFilteredClass(net.minecraft.network.play.client.C0EPacketClickWindow)

new Module("Wardrobe Switch", rgstr, "Sends a message when you switch wardrobe amror", true)