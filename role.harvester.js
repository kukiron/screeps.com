/* eslint indent: [ "error", 4 ], no-undef: 0 */
module.exports = {
    run: creep => {
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

        // if creep is supposed to transfer energy to the spawn
        if (creep.memory.working == true) {
            // find closest spawn or extension which is not full
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: s =>
                    (s.structureType == STRUCTURE_SPAWN ||
                        s.structureType == STRUCTURE_EXTENSION) &&
                    s.energy < s.energyCapacity
            })

            // if we found one, try to transfer energy
            if (structure != undefined) {
                creep.transfer(structure, RESOURCE_ENERGY) ==
                    ERR_NOT_IN_RANGE && creep.moveTo(structure)
            }
        } else {
            // if creep is supposed to harvest energy from source find closest energy source
            let source = creep.room.find(FIND_SOURCES)[0]
            // try to harvest energy, if the source is not in range move towards the source
            creep.harvest(source) == ERR_NOT_IN_RANGE && creep.moveTo(source)
        }
    }
}
