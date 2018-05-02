/* eslint indent: [ "error", 4 ], no-undef: 0 */
module.exports = {
    run: function(creep) {
        creep.handleWorkingState()

        if (creep.memory.working == true) {
            // if in home room
            if (creep.room.name == creep.memory.home) {
                creep.transferHarvestedEnergy()
            } else {
                // if not, find exit to home room
                let exit = creep.room.findExitTo(creep.memory.home)
                creep.moveTo(creep.pos.findClosestByRange(exit))
            }
        } else {
            if (creep.room.name == creep.memory.target) {
                let source = creep.room.find(FIND_SOURCES)[
                    creep.memory.sourceIndex
                ]
                creep.harvest(source) == ERR_NOT_IN_RANGE &&
                    creep.moveTo(source)
            } else {
                // find exit to target room
                let exit = creep.room.findExitTo(creep.memory.target)
                creep.moveTo(creep.pos.findClosestByRange(exit))
            }
        }
    }
}
