/* eslint indent: [ "error", 4 ], no-undef: 0 */
const roleBuilder = require("role.builder")

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false
        } else if (
            creep.memory.working == false &&
            creep.carry.energy == creep.carryCapacity
        ) {
            creep.memory.working = true
        }

        if (creep.memory.working == true) {
            let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s =>
                    s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            })

            if (structure != undefined) {
                creep.repair(structure) == ERR_NOT_IN_RANGE &&
                    creep.moveTo(structure)
            } else {
                roleBuilder.run(creep)
            }
        } else {
            let source = creep.room.find(FIND_SOURCES)[0]
            creep.harvest(source) == ERR_NOT_IN_RANGE && creep.moveTo(source)
        }
    }
}
