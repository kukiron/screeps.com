/* eslint indent: [ "error", 4 ], no-undef: 0 */
StructureTower.prototype.defend = function() {
    // find closes hostile creep
    let target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    // if one is found...
    target != undefined && this.attack(target)
}
