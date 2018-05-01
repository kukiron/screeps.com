/* eslint indent: [ "error", 4 ], no-undef: 0 */
module.exports = function() {
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
        energy,
        numberOfWorkParts,
        home,
        target,
        sourceIndex
    ) {
        // create a body with the specified number of WORK parts and one MOVE part per non-MOVE part
        // let body = [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        let body = []
        for (let i = 0; i < numberOfWorkParts; i++) {
            body.push(WORK)
        }

        // 150 = 100 (cost of WORK) + 50 (cost of MOVE)
        energy -= 150 * numberOfWorkParts

        let numberOfParts = Math.floor(energy / 100)
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY)
        }
        for (let i = 0; i < numberOfParts + numberOfWorkParts; i++) {
            body.push(MOVE)
        }

        // create creep with the created body
        return this.createCreep(body, undefined, {
            role: "longDistanceHarvester",
            working: false,
            home,
            target,
            sourceIndex
        })
    }
}
