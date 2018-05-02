/* eslint indent: [ "error", 4 ], no-undef: 0 */
require("prototype.spawn")()
const roleHarvester = require("role.harvester")
const roleUpgrader = require("role.upgrader")
const roleBuilder = require("role.builder")
const roleRepairer = require("role.repairer")
const roleWallRepairer = require("role.wallRepairer")
const roleLongDistanceHarvester = require("role.longDistanceHarvester")

// Rooms for harvesting
const HOME = "E13N45"
const TARGET = "E13N44"

// count total number of creeps active for each role
const countCreeps = creepRole =>
    _.sum(Game.creeps, c => c.memory.role == creepRole)

module.exports.loop = function() {
    const { Spawn1 } = Game.spawns

    // check for died creeps & delete the memory entry if not alive
    for (let name in Memory.creeps) {
        Game.creeps[name] == undefined && delete Memory.creeps[name]
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
        role == "repairer" && roleRepairer.run(creep)
        role == "longDistanceHarvester" && roleLongDistanceHarvester.run(creep)
        role == "wallRepairer" && roleWallRepairer.run(creep)
    }

    let towers = Game.rooms[HOME].find(FIND_STRUCTURES, {
        filter: s => s.structureType == STRUCTURE_TOWER
    })

    for (let tower of towers) {
        let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        target != undefined && tower.attack(target)
    }

    // goal: set the minimum numbers of creeps required for each role
    const minimumNoOfHarvesters = 2
    const minimumNoOfUpgraders = 1
    const minimumNoOfBuilders = 2
    const minimumNoOfRepairers = 1
    const minimumNoOfLongDistanceHarvesters = 1
    const minimumNoOfWallRepairers = 1

    // currently active creeps for each role
    let currentHarvesters = countCreeps("harvester")
    let currentUpgraders = countCreeps("upgrader")
    let currentBuilders = countCreeps("builder")
    let currentRepairers = countCreeps("repairer")
    let currentLongDistanceHarvesters = countCreeps("longDistanceHarvester")
    let currentWallRepairers = countCreeps("wallRepairer")

    let energyCapacity = Spawn1.room.energyCapacityAvailable
    let energyAvailable = Spawn1.room.energyAvailable
    // default creep name
    let name = undefined

    // spawn creeps -
    if (currentHarvesters < minimumNoOfHarvesters) {
        name = Spawn1.createCustomCreep(energyCapacity, "harvester")
        if (name == ERR_NOT_ENOUGH_ENERGY && currentHarvesters == 0) {
            name = Spawn1.createCustomCreep(energyAvailable, "harvester")
        }
    } else if (currentUpgraders < minimumNoOfUpgraders) {
        name = Spawn1.createCustomCreep(energyCapacity, "upgrader")
    } else if (currentBuilders < minimumNoOfBuilders) {
        name = Spawn1.createCustomCreep(energyCapacity, "builder")
    } else if (currentRepairers < minimumNoOfRepairers) {
        name = Spawn1.createCustomCreep(energyCapacity, "repairer")
    } else if (currentWallRepairers < minimumNoOfWallRepairers) {
        name = Spawn1.createCustomCreep(energyCapacity, "wallRepairer")
    } else if (
        currentLongDistanceHarvesters < minimumNoOfLongDistanceHarvesters
    ) {
        name = Spawn1.createLongDistanceHarvester(HOME, TARGET, 0)
    } else {
        name = Spawn1.createLongDistanceHarvester(HOME, TARGET, 0)
    }

    // print name to console if spawning was a success
    isNaN(name) && console.log("Spawned new creep: " + name)
}
