/* eslint indent: [ "error", 4 ], no-undef: 0 */
module.exports = {
    run: function(creep) {
        // check if the creep is in working state
        creep.handleWorkingState()

        if (creep.memory.working == true) {
            let structure = creep.findStructure()

            structure != undefined
                ? creep.transfer(structure, RESOURCE_ENERGY) ==
                      ERR_NOT_IN_RANGE && creep.moveTo(structure)
                : (structure = creep.room.storage)
        } else {
            let container = creep.findEnergyContainer()

            structure != undefined
                ? creep.withdraw(container, RESOURCE_ENERGY) ==
                      ERR_NOT_IN_RANGE && creep.moveTo(container)
                : (container = creep.room.storage)
        }
    }
}
