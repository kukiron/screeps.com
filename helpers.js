/* eslint indent: [ "error", 4 ], no-undef: 0 */
function creepWorking(creep) {
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

module.exports = { creepWorking, harvestEnergy }
