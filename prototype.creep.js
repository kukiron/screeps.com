/* eslint indent: [ "error", 4 ], no-undef: 0 */
const roles = {
    harvester: require("role.harvester"),
    upgrader: require("role.upgrader"),
    builder: require("role.builder"),
    repairer: require("role.repairer"),
    wallRepairer: require("role.wallRepairer"),
    longDistanceHarvester: require("role.longDistanceHarvester"),
    miner: require("role.miner"),
    lorry: require("role.lorry")
}

Creep.prototype.runRole = function() {
    roles[this.memory.role].run(this)
}

Creep.prototype.handleWorkingState = function() {
    // switch state
    // if creep is bringing energy to the spawn but has no energy left
    if (this.memory.working == true && this.carry.energy == 0) {
        this.memory.working = false
    }
    // or if creep is harvesting energy but is full
    if (
        this.memory.working == false &&
        this.carry.energy == this.carryCapacity
    ) {
        this.memory.working = true
    }
}

Creep.prototype.findStructure = function() {
    // find the closest structure that can store enery
    const energyStructures = [
        STRUCTURE_SPAWN,
        STRUCTURE_EXTENSION,
        STRUCTURE_TOWER
    ]

    return this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: s =>
            energyStructures.includes(s.structureType) &&
            s.energy < s.energyCapacity
    })
}

Creep.prototype.findEnergyContainer = function() {
    const energyContainers = [STRUCTURE_CONTAINER, STRUCTURE_STORAGE]

    return this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s =>
            energyContainers.includes(s.structureType) &&
            s.store[RESOURCE_ENERGY] > 0
    })
}

Creep.prototype.transferHarvestedEnergy = function() {
    let structure = this.findStructure()
    if (structure != undefined) {
        this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE &&
            this.moveTo(structure)
    }
}

/** @param {bool} useContainer
 @param {bool} useSource */
Creep.prototype.getEnergy = function(useContainer, useSource) {
    let container
    // if the Creep should look for containers
    if (useContainer) {
        container = this.findEnergyContainer()
        if (container != undefined) {
            this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE &&
                this.moveTo(container)
        }
    }
    // if no container was found and the Creep should look for Sources
    if (container == undefined && useSource) {
        let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
        this.harvest(source) == ERR_NOT_IN_RANGE && this.moveTo(source)
    }
}
