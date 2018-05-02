/* eslint indent: [ "error", 4 ], no-undef: 0 */
const roleUpgrader = require("role.upgrader")

module.exports = {
    run: function(creep) {
        creep.handleWorkingState()

        if (creep.memory.working == true) {
            // find closest constructionSite
            let constructionSite = creep.pos.findClosestByPath(
                FIND_CONSTRUCTION_SITES
            )

            constructionSite != undefined
                ? creep.build(constructionSite) == ERR_NOT_IN_RANGE &&
                  creep.moveTo(constructionSite)
                : roleUpgrader.run(creep)
        } else creep.getEnergy(true, true)
    }
}
