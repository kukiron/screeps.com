/* eslint indent: [ "error", 4 ], no-undef: 0 */
const roleUpgrader = require("role.upgrader")

module.exports = {
    run: creep => {
        // switch state
        // if creep is bringing energy to the spawn but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false
        }
        // if creep is harvesting energy but is full
        if (
            creep.memory.working == false &&
            creep.carry.energy == creep.carryCapacity
        ) {
            creep.memory.working = true
        }

        if (creep.memory.working == true) {
            // find closest constructionSite
            let constructionSite = creep.pos.findClosestByPath(
                FIND_CONSTRUCTION_SITES
            )

            constructionSite != undefined
                ? creep.build(constructionSite) == ERR_NOT_IN_RANGE &&
                  creep.moveTo(constructionSite)
                : roleUpgrader.run(creep)
        } else {
            let source = creep.room.find(FIND_SOURCES)[1]
            creep.harvest(source) == ERR_NOT_IN_RANGE && creep.moveTo(source)
        }
    }
}
