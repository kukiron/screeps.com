/* eslint indent: [ "error", 4 ], no-undef: 0 */
const roleBuilder = require("role.builder")
const { handleWorkingState, harvestEnergy } = require("helpers")

module.exports = {
    run: creep => {
        handleWorkingState(creep)

        if (creep.memory.working == true) {
            let walls = creep.room.find(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_WALL
            })
            let target = _.sortBy(walls, w => Math.floor(w.hits / 1000))[0]

            target != undefined
                ? creep.repair(target) == ERR_NOT_IN_RANGE &&
                  creep.moveTo(target)
                : roleBuilder.run(creep)
        } else harvestEnergy(creep)
    }
}
