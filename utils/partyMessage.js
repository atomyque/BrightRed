let messageQueue = []
let lastCall = Date.now()

export function queueMessage(message) {
  const now = Date.now()
  if (now - lastCall > 500) {
    partyMessage(message)
    lastCall = now
    return
  }
  messageQueue.push(message)
  lastCall = now
}

function partyMessage(message) {
  const prefix = "[bright red]"
  const command = `pc ${prefix} ${message}`

  ChatLib.command(command, false)
}



register("step", () => {
  if (messageQueue.length == 0) return

  partyMessage(messageQueue[0])
  messageQueue.shift()
}).setFps(4)