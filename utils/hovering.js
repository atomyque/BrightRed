export function hovering(mouseX, mouseY, rect) {
  return (
    mouseX > rect.x && mouseX < rect.x + rect.width &&
    mouseY > rect.y && mouseY < rect.y + rect.height
  )
}