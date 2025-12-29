import { Module } from "../module"
import { queueMessage } from "../utils/partyMessage"

// Thanks to @Noamm9 for helping me with the regex
const regex = new RegExp("Autopet equipped your \\[Lvl .*] (.*)! VIEW RULE|You summoned your (.*)!|You despawned your (.*)!")

const rgstr = register("chat", (petrule, spawned, despawned, event) => {
  const message = ChatLib.getChatMessage(event)
  if (message.includes("despawned")) {
    queueMessage(`Despawned ${despawned} pet`)
  }
  if (message.includes("Autopet")) {
    queueMessage(`Summoned ${petrule} pet`)
  }
  else {
    queueMessage(`Summoned ${spawned} pet`)
  }
}).setCriteria(regex)

new Module("Pet Change", rgstr, "Sends in chat when you change/despawn your pet", true)
