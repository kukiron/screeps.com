/* eslint indent: [ "error", 4 ], no-undef: 0 */
module.exports = {
    run: creep => {
        // switch state
        // if creep is bringing energy to the controller but has no energy left
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

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
            // we could also use:
            // if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            creep.upgradeController(creep.room.controller) ==
                ERR_NOT_IN_RANGE && creep.moveTo(creep.room.controller)
        } else {
            // if creep is supposed to harvest energy from source find closest source
            let source = creep.room.find(FIND_SOURCES)[0]
            creep.harvest(source) == ERR_NOT_IN_RANGE && creep.moveTo(source)
        }
    }
}

