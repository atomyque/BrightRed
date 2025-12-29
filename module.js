import PogObject from "../PogData"

let modules = []
let data = new PogObject("BrightRed", {modules: []}, "modulesData.json")

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

  static save() {
    const json = {}
    modules.forEach(m => {
      json[m.name] = { toggled: m.toggled }
    })

    data.modules = json
    data.save()
  }

  static load() {
    Object.keys(data.modules).forEach((m) => {
      const name = m
      const toggled = data.modules[m].toggled

      modules.find(mdl => mdl.name ==name)?.toggled = toggled
    })
  }
}

let found = false
let inDungeons = false


register("worldUnload", () => {
  Module.save()
})

register("worldLoad", () => {
  Module.load()
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
      if (!l.includes("§r§b§lDungeon: §r§7Catacombs§r")) return
      inDungeons = true
      Module.enableAll()
      found = true
    }
  })
})

export {modules, Module}