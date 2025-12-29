import "./module"
import { modules } from "./module"
import { hovering } from "./utils/hovering"

const gui = new Gui()
const guiKeybind = new KeyBind("Open Gui", Keyboard.KEY_P, "Bright Red")

guiKeybind.registerKeyPress(() => {gui.open()})

gui.registerDraw((mouseX, mouseY, ticks) => {
  const screenWidth = Renderer.screen.getWidth()
  const screenHeight = Renderer.screen.getHeight()

  const modulePerColumn = 8
  const moduleWidth = screenWidth / modulePerColumn
  const modulePerRow = 30
  const moduleHeight = screenHeight / modulePerRow

  const toggledColor = Renderer.color(254, 63, 63, 255)
  const defaultColor = Renderer.color(70, 70, 70, 255)

  // Background
  Renderer.drawRect(Renderer.color(0, 0, 0, 75), 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight())
  
  // Title
  const guiTitle = "&f&lThe Wall"
  Renderer.drawString(guiTitle, screenWidth / 2 - Renderer.getStringWidth(guiTitle) / 2, 10, true)

  // Modules Rendering
  let posX = 0
  let posY = 0
  modules.forEach((module) => {
    const color = module.toggled ? toggledColor : defaultColor
    const rect = {x: posX, y: posY, width: moduleWidth, height: moduleHeight}
    const name = module.name

    Renderer.drawRect(color, rect.x, rect.y, rect.width, rect.height)
    Renderer.drawString(name, rect.x + rect.width / 2 - Renderer.getStringWidth(name) / 2, rect.y + rect.height / 2 - 5, true)

    posY += moduleHeight
    if (posY > moduleHeight * modulePerRow) {
      posX += moduleWidth
      posY = 0
    }
  })
})

gui.registerClicked((mouseX, mouseY, button) => {
  const screenWidth = Renderer.screen.getWidth()
  const screenHeight = Renderer.screen.getHeight()

  const modulePerColumn = 8
  const moduleWidth = screenWidth / modulePerColumn
  const modulePerRow = 30
  const moduleHeight = screenHeight / modulePerRow

  let posX = 0
  let posY = 0

  modules.forEach((module) => {
    const rect = {x: posX, y: posY, width: moduleWidth, height: moduleHeight}
    
    if (button == 0 && hovering(mouseX, mouseY, rect)) module.toggle() 

    posY += moduleHeight
    if (posY > moduleHeight * modulePerRow) {
      posX += moduleWidth
      posY = 0
    }
  })
})