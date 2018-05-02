/* eslint indent: [ "error", 4 ], no-undef: 0 */
module.exports = {
    run: function(creep) {
        creep.handleWorkingState()

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
            // we could also use:
            // if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            creep.upgradeController(creep.room.controller) ==
                ERR_NOT_IN_RANGE && creep.moveTo(creep.room.controller)
        } else creep.getEnergy(true, true)
    }
}
