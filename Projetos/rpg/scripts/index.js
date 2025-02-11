const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const healthText = document.querySelector("#healthText");
const xpText = document.querySelector("#xpText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterHealth = document.querySelector("#monsterHealth");
const monsterName = document.querySelector("#monsterName");

let xp = 0;
let gold = 50;
let health = 100;
let monsterHealthBar;
let inventory = ["stick"];

const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];

button1.onclick = store;

function town() {
  text.innerText = `You are in the town square. You see a sign that says "Store."`;
  button1.innerText = "Go to store";
  button2.innerText = "Go to cave";
  button3.innerText = "Fight dragon";

  button1.onclick = store;
  button2.onclick = cave;
  button3.onclick = () => {
    fight("dragon");
  };
}

function store() {
  text.innerText = "You enter the store.";
  button1.innerText = "Buy 10 health (10 gold)";
  button2.innerText = "Buy weapon (30 gold)";
  button3.innerText = "Go to town square";

  button1.onclick = () => {
    if (gold < 10) {
      text.innerText = "You do not have enough gold to buy health.";
    } else {
      gold -= 10;
      health += 10;
      goldText.innerText = gold;
      healthText.innerText = health;
      text.innerText = "You buy 10 health.";
    }
  };

  button2.onclick = () => {
    if (inventory.length < 4) {
      if (gold < 30) {
        text.innerText = "You do not have enough gold to buy a weapon.";
      } else {
        gold -= 30;
        goldText.innerText = gold;
        inventory.push(weapons[inventory.length].name);
        text.innerText = `You now have a ${
          weapons[inventory.length - 1].name
        }. In your inventory you have:${JSON.stringify(inventory)}`;
      }
    } else {
      text.innerText = "You already have the most powerful weapon!";
    }
  };

  button3.onclick = town;
}

function cave() {
  text.innerText = "You enter the cave. You see some monsters.";
  button1.innerText = "Fight slime";
  button2.innerText = "Fight fanged beast";
  button3.innerText = "Go to town square";

  button1.onclick = () => {
    fight("slime");
  };
  button2.onclick = () => {
    fight("fanged beast");
  };
  button3.onclick = town;
}

function fight(monster) {
  text.innerText = "You are fighting a monster.";
  button1.innerText = "Attack";
  button2.innerText = "Dodge";
  button3.innerText = "Run";
  let matchMonster;
  monsters.forEach((monsterItem) => {
    if (monsterItem.name === monster) {
      monsterStats.style.display = "block";
      monsterHealth.innerText = monsterItem.health;
      monsterName.innerText = monsterItem.name;
      
      matchMonster = monsterItem;
      console.log(matchMonster);
    }
  });
  monsterHealthBar = matchMonster.health;
  button1.onclick = () => {
    attack(matchMonster);
  };
  button2.onclick = () => {
    dodge(matchMonster);
  };
  button3.onclick = () => {
    monsterStats.style.display = "none";
    town();
  };
}

function attack(monster) {
  text.innerText = "The " + monster.name + " attacks.";
  text.innerText += " You attack it with your " + inventory.at(-1) + ".";

  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monster.level);
  } else {
    text.innerText += " You miss.";
  }

  if (health <= 0) {
    text.innerText = "You die. ☠️";
    button1.innerText = "Restart?";
    button2.style.display = "none";
    button3.style.display = "none";
    healthText.innerText = "0";
    monsterStats.style.display = "none";
    button1.onclick = () => {
      button2.style.display = "inline-block";
      button3.style.display = "inline-block";
      restart();
    };
  } else {
    monsterHealthBar -=
      weapons[inventory.length - 1].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;

    if (monster.name === "dragon") {
      
      if (monsterHealthBar <= 0) {
        text.innerText =
          'You defeat the dragon! YOU WIN THE GAME! 🎉';
        button1.innerText = "Restart?";
        button2.style.display = "none";
        button3.style.display = "none";
        monsterStats.style.display = "none";
        button1.onclick = () => {
          button2.style.display = "inline-block";
          button3.style.display = "inline-block";
          restart();
        };
      } else {
        monsterHealth.innerText = monsterHealthBar;
      }
    } else {
      if (monsterHealthBar <= 0) {
        text.innerText =
          'The monster screams "Arg!" as it dies. You gain experience points and find gold.';
        button1.innerText = "Go to town square";
        button2.style.display = "none";
        button3.style.display = "none";
        monsterStats.style.display = "none";

        gold += Math.floor(monster.level * 6.7);
        xp += monster.level;
        goldText.innerText = gold;
        xpText.innerText = xp;

        button1.onclick = () => {
          button2.style.display = "inline-block";
          button3.style.display = "inline-block";
          town();
        };
      } else {
        monsterHealth.innerText = monsterHealthBar;
      }
    }
  }
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function getMonsterAttackValue(level) {
  let hit = level * 5 - Math.floor(Math.random() * xp);
  return hit;
}

function dodge(monster) {
  text.innerText = "You dodge the attack from the " + monster.name + ".";
}

function restart() {
  xp = 0;
  gold = 50;
  health = 100;
  inventory = ["stick"];
  xpText.innerText = xp;
  goldText.innerText = gold;
  healthText.innerText = health;

  town();
}

town();
