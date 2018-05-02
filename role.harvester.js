/* eslint indent: [ "error", 4 ], no-undef: 0 */
module.exports = {
    run: function(creep) {
        // check if the creep is in working state
        creep.handleWorkingState()
        // assign activity based on that
        creep.memory.working == true
            ? creep.transferHarvestedEnergy()
            : creep.getEnergy(false, true)
    }
}
