/* eslint indent: [ "error", 4 ], no-undef: 0 */
require("prototype.creep")
require("prototype.tower")
require("prototype.spawn")

module.exports.loop = function() {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // check if the creep is still alive; if not, delete the memory entry
        Game.creeps[name] == undefined && delete Memory.creeps[name]
    }

    // for each creeps,run creep logic
    for (let name in Game.creeps) {
        Game.creeps[name].runRole()
    }

    // find all towers
    let towers = _.filter(
        Game.structures,
        s => s.structureType == STRUCTURE_TOWER
    )
    // for each tower,run tower logic
    for (let tower of towers) {
        tower.defend()
    }

    // spawn creeps as necessary
    Game.spawns["Spawn1"].spawnCreeps()
}
