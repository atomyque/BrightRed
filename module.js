let modules = []

class Module {
  constructor(name, register, description = "No Desciption Set", toggled = false) {
    this.name = name
    this.register = register
    this.description = description
    this.toggled = toggled

    modules.push(this)

    if (!inDungeons) return
    
    if (toggled) register.register()
    else register.unregister()
  }

  toggle() {
    this.toggled = !this.toggled

    if (!inDungeons) return

    if (this.toggled) this.register.register()
    else this.register.unregister()
  }

  static disableAll() {
    modules.forEach((module) => {
      module.register.unregister()
    })
  }

  static enableAll() {
    modules.forEach((module) => {
      if (!module.toggled) return
      module.register.register()
    })
  }
}

let found = false
let inDungeons = false

register("worldLoad", () => {
  inDungeons = false
  found = false
  Module.disableAll()
})

register("tick", () => {
  if (found) return

  const lines = TabList.getNames()

  lines.forEach((l) => {
    if (l.includes("Area")) {
      found = true
    }
    if (l.includes("Catacombs")) {
      inDungeons = true
      Module.enableAll()
    }
  })
})

export {modules, Module}