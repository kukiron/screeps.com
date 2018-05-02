/* eslint indent: [ "error", 4 ], no-undef: 0 */
const { creepWorking, harvestEnergy } = require("helpers")

module.exports = {
    run: creep => {
        creepWorking(creep)

        // if creep is supposed to transfer energy to the spawn
        if (creep.memory.working == true) {
            // find closest spawn or extension which is not full
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: s =>
                    (s.structureType == STRUCTURE_SPAWN ||
                        s.structureType == STRUCTURE_EXTENSION ||
                        s.structureType == STRUCTURE_TOWER) &&
                    s.energy < s.energyCapacity
            })

            // if we found one, try to transfer energy
            if (structure != undefined) {
                creep.transfer(structure, RESOURCE_ENERGY) ==
                    ERR_NOT_IN_RANGE && creep.moveTo(structure)
            }
        } else harvestEnergy(creep)
    }
}
