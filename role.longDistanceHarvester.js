/* eslint indent: [ "error", 4 ], no-undef: 0 */
const { creepWorking } = require("helpers")

module.exports = {
    run: creep => {
        creepWorking(creep)

        if (creep.memory.working == true) {
            // if in home room
            if (creep.room.name == creep.memory.home) {
                let structure = creep.pos.findClosestByPath(
                    FIND_MY_STRUCTURES,
                    {
                        filter: s =>
                            (s.structureType == STRUCTURE_SPAWN ||
                                s.structureType == STRUCTURE_EXTENSION) &&
                            s.energy < s.energyCapacity
                    }
                )

                if (structure != undefined) {
                    creep.transfer(structure, RESOURCE_ENERGY) ==
                        ERR_NOT_IN_RANGE && creep.moveTo(structure)
                }
            }
            // if not in home room...
            else {
                // find exit to home room
                let exit = creep.room.findExitTo(creep.memory.home)
                creep.moveTo(creep.pos.findClosestByRange(exit))
            }
        } else {
            // if in target room
            if (creep.room.name == creep.memory.target) {
                let source = creep.room.find(FIND_SOURCES)[
                    creep.memory.sourceIndex
                ]
                creep.harvest(source) == ERR_NOT_IN_RANGE &&
                    creep.moveTo(source)
            }
            // if not in target room
            else {
                // find exit to target room
                let exit = creep.room.findExitTo(creep.memory.target)
                creep.moveTo(creep.pos.findClosestByRange(exit))
            }
        }
    }
}
