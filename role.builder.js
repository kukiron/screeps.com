/* eslint indent: [ "error", 4 ], no-undef: 0 */
const roleUpgrader = require("role.upgrader")
const { handleWorkingState, harvestEnergy } = require("helpers")

module.exports = {
    run: creep => {
        handleWorkingState(creep)

        if (creep.memory.working == true) {
            // find closest constructionSite
            let constructionSite = creep.pos.findClosestByPath(
                FIND_CONSTRUCTION_SITES
            )

            constructionSite != undefined
                ? creep.build(constructionSite) == ERR_NOT_IN_RANGE &&
                  creep.moveTo(constructionSite)
                : roleUpgrader.run(creep)
        } else harvestEnergy(creep)
    }
}
