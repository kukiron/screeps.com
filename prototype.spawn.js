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
        home,
        target,
        sourceIndex
    ) {
        const body = [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]

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
