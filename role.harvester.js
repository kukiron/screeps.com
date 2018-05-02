/* eslint indent: [ "error", 4 ], no-undef: 0 */
const {
    handleWorkingState,
    harvestEnergy,
    transferHarvestedEnergy
} = require("helpers")

module.exports = {
    run: creep => {
        // check if the creep is in working state
        handleWorkingState(creep)
        // assign activity based on that
        creep.memory.working == true
            ? transferHarvestedEnergy(creep)
            : harvestEnergy(creep)
    }
}
