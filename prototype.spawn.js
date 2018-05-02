/* eslint indent: [ "error", 4 ], no-undef: 0 */
const memorySetup = require("memorySetup")

let listOfRoles = [
    "harvester",
    "builder",
    "lorry",
    "miner",
    "upgrader",
    "repairer",
    "wallRepairer"
]

StructureSpawn.prototype.spawnCreeps = function() {
    let room = this.room,
        creepsInRoom = room.find(FIND_MY_CREEPS),
        numberOfCreeps = {},
        maxEnergy = room.energyCapacityAvailable,
        name = undefined

    memorySetup()

    for (let role of listOfRoles) {
        numberOfCreeps[role] = _.sum(creepsInRoom, c => c.memory.role == role)
    }

    if (numberOfCreeps["harvester"] == 0 && numberOfCreeps["lorry"] == 0) {
        numberOfCreeps["miner"] > 0 ||
        (room.storage != undefined &&
            room.storage.store[RESOURCE_ENERGY] >= 150 + 550)
            ? (name = this.createLorry(150))
            : (name = this.createCustomCreep(room.energyAvailable, "harvester"))
    } else {
        let sources = room.find(FIND_SOURCES)
        for (let source of sources) {
            if (
                !_.some(
                    creepsInRoom,
                    c =>
                        c.memory.role == "miner" &&
                        c.memory.sourceId == source.id
                )
            ) {
                let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                })
                if (containers.length > 0) {
                    name = this.createMiner(source.id)
                    break
                }
            }
        }
    }

    if (name == undefined) {
        for (let role of listOfRoles) {
            if (numberOfCreeps[role] < this.memory.minCreeps[role]) {
                if (role == "lorry") {
                    name = this.createLorry(150)
                } else {
                    name = this.createCustomCreep(maxEnergy, role)
                }
                break
            }
        }
    }

    let numberOfLongDistanceHarvesters = {}
    if (name == undefined) {
        for (let roomName in this.memory.minLongDistanceHarvesters) {
            numberOfLongDistanceHarvesters[roomName] = _.sum(
                Game.creeps,
                c =>
                    c.memory.role == "longDistanceHarvester" &&
                    c.memory.target == roomName
            )

            if (
                numberOfLongDistanceHarvesters[roomName] <
                this.memory.minLongDistanceHarvesters[roomName]
            ) {
                name = this.createLongDistanceHarvester(room.name, roomName, 0)
            }
        }
    }

    if (name != undefined && _.isString(name)) {
        console.log(
            `${this.name} spawned new creep: ${name} (${
                Game.creeps[name].memory.role
            })`
        )
        for (let role of listOfRoles) {
            console.log(role + ": " + numberOfCreeps[role])
        }
        for (let roomName in numberOfLongDistanceHarvesters) {
            console.log(
                `LongDistanceHarvester ${roomName}: ${
                    numberOfLongDistanceHarvesters[roomName]
                }`
            )
        }
    }
}

StructureSpawn.prototype.createCustomCreep = function(energy, role) {
    // create a balanced body as big as possible with the given energy
    const workingParts = [WORK, CARRY, MOVE]
    let numberOfParts = Math.floor(energy / 200)
    let body = []
    for (let i = 0; i < numberOfParts; i++) {
        body.push(...workingParts)
    }
    // create creep with the created body and the given role
    return this.createCreep(body, undefined, { working: false, role })
}

StructureSpawn.prototype.createLongDistanceHarvester = function(
    home,
    target,
    sourceIndex
) {
    const body = [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]

    return this.createCreep(body, undefined, {
        role: "longDistanceHarvester",
        working: false,
        home,
        target,
        sourceIndex
    })
}

StructureSpawn.prototype.createMiner = function(sourceId) {
    return this.createCreep([WORK, WORK, WORK, WORK, WORK, MOVE], undefined, {
        role: "miner",
        sourceId: sourceId
    })
}

StructureSpawn.prototype.createLorry = function(energy) {
    let numberOfParts = Math.floor(energy / 150)
    numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3))
    let body = []
    for (let i = 0; i < numberOfParts * 2; i++) {
        body.push(CARRY)
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE)
    }

    return this.createCreep(body, undefined, { role: "lorry", working: false })
}
