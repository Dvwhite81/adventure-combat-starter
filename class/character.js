class Character {

    constructor(name, description, currentRoom) {
        this.name = name;
        this.description = description;
        this.currentRoom = currentRoom;

        this.health = 100;
        this.strength = 10;
        this.items = [];
    }

    applyDamage(amount) {
        this.health -= amount;

        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        let roomItems = this.currentRoom.items;
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            roomItems.push(item);
        }

        this.items = [];
        this.currentRoom = null;
    }

}

module.exports = {
    Character,
};