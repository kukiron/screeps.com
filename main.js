/* eslint indent: [ "error", 4 ], no-undef: 0 */
const roleHarvester = require("role.harvester")
const roleUpgrader = require("role.upgrader")
const roleBuilder = require("role.builder")

// _.sum will count the number of creeps for each role
const countCreeps = creepRole =>
    _.sum(Game.creeps, c => c.memory.role == creepRole)

module.exports.loop = () => {
    // check for memory entries of died creeps & delete the memory entry if not alive
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name]
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        let creep = Game.creeps[name]
        // get the creep role
        let { role } = creep.memory

        // assign creep tasks based on roles
        role == "harvester" && roleHarvester.run(creep)
        role == "upgrader" && roleUpgrader.run(creep)
        role == "builder" && roleBuilder.run(creep)
    }

    // goal: set the minimum numbers of creeps required for each role
    const minimumNoOfHarvesters = 2
    const minimumNoOfUpgraders = 6
    const minimumNoOfBuilders = 3

    // currently active creeps for each role
    let currentHarvesters = countCreeps("harvester")
    let currentUpgraders = countCreeps("upgrader")
    let currentBuilders = countCreeps("builder")
    // default creep name
    let name = undefined

    // try spawning creeps if enough for each role isn't available
    if (currentHarvesters < minimumNoOfHarvesters) {
        name = Game.spawns.Spawn1.createCreep(
            [WORK, CARRY, MOVE, MOVE],
            undefined,
            { role: "harvester", working: false }
        )
    } else if (currentUpgraders < minimumNoOfUpgraders) {
        name = Game.spawns.Spawn1.createCreep(
            [WORK, CARRY, MOVE, MOVE],
            undefined,
            { role: "upgrader", working: false }
        )
    } else if (currentBuilders < minimumNoOfBuilders) {
        name = Game.spawns.Spawn1.createCreep(
            [WORK, CARRY, CARRY, MOVE, MOVE],
            undefined,
            { role: "builder", working: false }
        )
    } else {
        // default case: try to spawn upgraders
        name = Game.spawns.Spawn1.createCreep(
            [WORK, CARRY, MOVE, MOVE],
            undefined,
            { role: "upgrader", working: false }
        )
    }

    // print name to console if spawning was a success
    isNaN(name) && console.log("Spawned new creep: " + name)
}
