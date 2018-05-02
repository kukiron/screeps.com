/* eslint indent: [ "error", 4 ], no-undef: 0 */
const roleBuilder = require("role.builder")

module.exports = {
    run: function(creep) {
        creep.handleWorkingState()

        if (creep.memory.working == true) {
            let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s =>
                    s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            })

            structure != undefined
                ? creep.repair(structure) == ERR_NOT_IN_RANGE &&
                  creep.moveTo(structure)
                : roleBuilder.run(creep)
        } else creep.getEnergy(true, true)
    }
}
