/* eslint indent: [ "error", 4 ], no-undef: 0 */
function handleWorkingState(creep) {
    // switch state
    // if creep is bringing energy to the spawn but has no energy left
    if (creep.memory.working == true && creep.carry.energy == 0) {
        creep.memory.working = false
    }
    // or if creep is harvesting energy but is full
    if (
        creep.memory.working == false &&
        creep.carry.energy == creep.carryCapacity
    ) {
        creep.memory.working = true
    }
}

function harvestEnergy(creep) {
    // if creep is supposed to harvest energy from source find closest energy source
    let source = creep.pos.findClosestByPath(FIND_SOURCES)
    // try to harvest energy, if the source is not in range move towards the source
    creep.harvest(source) == ERR_NOT_IN_RANGE && creep.moveTo(source)
}

function transferHarvestedEnergy(creep) {
    // find the closest structure that can store enery
    const ENERGY_STRUCTURES = [
        STRUCTURE_SPAWN,
        STRUCTURE_EXTENSION,
        STRUCTURE_TOWER,
        STRUCTURE_CONTAINER,
        STRUCTURE_STORAGE
    ]
    let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: s =>
            ENERGY_STRUCTURES.includes(s.structureType) &&
            s.energy < s.energyCapacity
    })

    if (structure != undefined) {
        creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE &&
            creep.moveTo(structure)
    }
}

module.exports = { handleWorkingState, harvestEnergy, transferHarvestedEnergy }
