const { Character } = require('./character');


class Enemy extends Character {
    constructor(name, description, currentRoom) {
        super(name, description, currentRoom);
        this.health = 50;
        this.strength = 10;
        this.cooldown = 3000;
        this.attackTarget = null;
    }

    setPlayer(player) {
        this.player = player;
    }


    randomMove() {
        this.cooldown = 3000;
        let room = this.currentRoom;
        const moveList = room.getExits();
        let currentMove = Math.floor(Math.random() * moveList.length);
        let newMove = room.getRoomInDirection(moveList[currentMove]);

        this.currentRoom = newMove;
    }

    takeSandwich() {
        let sandwich = this.currentRoom.getItemByName("sandwich");
        if (sandwich) {
            this.items.push(sandwich);
        }
    }

    // Print the alert only if player is standing in the same room
    alert(message) {
        if (this.player && this.player.currentRoom === this.currentRoom) {
            console.log(message);
        }
    }

    rest() {
        // Wait until cooldown expires, then act
        const resetCooldown = function() {
            this.cooldown = 0;
            this.act();
        };
        setTimeout(resetCooldown, this.cooldown);
    }

    attack() {
        this.cooldown = 3000;
        this.attackTarget.applyDamage(this.strength);
    }

    applyDamage(amount) {
        this.health -= amount;
        this.attackTarget = this.player;
    }



    act() {
        if (this.health <= 0) {
            // Dead, do nothing;
        } else if (this.cooldown > 0) {
            this.rest();
        } else {
            if (this.attackTarget === null) {
                this.randomMove();
                this.rest();
            } else if (this.attackTarget.currentRoom === this.currentRoom) {
                this.attack();
                this.rest();
            } else {
                this.scratchNose();
                this.rest();
            }
        }
    }


    scratchNose() {
        this.cooldown += 1000;

        this.alert(`${this.name} scratches its nose`);

    }


}

module.exports = {
    Enemy,
};