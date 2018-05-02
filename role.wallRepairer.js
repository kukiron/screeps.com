/* eslint indent: [ "error", 4 ], no-undef: 0 */
var roleBuilder = require("role.builder")

module.exports = {
    run: creep => {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false
        } else if (
            creep.memory.working == false &&
            creep.carry.energy == creep.carryCapacity
        ) {
            creep.memory.working = true
        }

        if (creep.memory.working == true) {
            let walls = creep.room.find(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_WALL
            })
            let target = _.sortBy(walls, w => Math.floor(w.hits / 1000))[0]

            target != undefined
                ? creep.repair(target) == ERR_NOT_IN_RANGE &&
                  creep.moveTo(target)
                : roleBuilder.run(creep)
        } else {
            let source = creep.room.find(FIND_SOURCES)[0]
            creep.harvest(source) == ERR_NOT_IN_RANGE && creep.moveTo(source)
        }
    }
}
