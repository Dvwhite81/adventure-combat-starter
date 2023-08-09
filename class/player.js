const { Character } = require('./character');
const { Enemy } = require('./enemy');
const { Food } = require('./food');
const World = require('./world')

class Player extends Character {

    constructor(name, startingRoom) {
        super(name, "main character", startingRoom);
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0; i < this.items.length; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        let roomItems = this.currentRoom.items;
        let item = this.currentRoom.getItemByName(itemName);
        let playerItems = this.items;
        let newItem = roomItems.splice(roomItems[item], 1);

        playerItems.push(newItem[0]);
    }

    dropItem(itemName) {
        let playerItems = this.items;
        let item = this.getItemByName(itemName);
        let roomItems = this.currentRoom.items;
        let newItem = playerItems.splice(playerItems[item], 1);

        roomItems.push(newItem[0]);
    }

    eatItem(itemName) {
        let playerItems = this.items;
        let item = this.getItemByName(itemName);

        if (item.isFood) {
            playerItems.splice(playerItems[item], 1);
        }
    }

    getItemByName(name) {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.name === name) return item;
        }
    }

    hit(name) {
        let enemy = this.currentRoom.getEnemyByName(name);
        enemy.applyDamage(this.strength);
    }

    die() {
        console.log("You are dead!");
        process.exit();
    }

}

module.exports = {
    Player,
};