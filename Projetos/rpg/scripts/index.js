const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

let gold;
let health;

let eventory = {
  weapon: ["stick"],
};

const weapons = ["dagger", "claw hammer", "sword"];

button1.onclick = store;

function town() {
    text.innerText = `You are in the town square. You see a sign that says "Store."`;
    button1.innerText = "Go to store";
    button2.innerText = "Go to cave";
    button3.innerText = "Fight dragon";

    button1.onclick = store;
}

function store() {
  text.innerText = "You enter the store.";
  button1.innerText = "Buy 10 health (10 gold)";
  button2.innerText = "Buy weapon (30 gold)";
  button3.innerText = "Go to town square";

  button1.onclick = () => {
    gold = goldText.innerText;
    if (gold < 10) {
      text.innerText = "You do not have enough gold to buy health.";
    } else {
      goldText.innerText = gold - 10;
      health = Number(healthText.innerText);
      healthText.innerText = health + 10;
      text.innerText = "You buy 10 health.";
    }
  };

  button2.onclick = () => {
    gold = goldText.innerText;
    if (eventory.weapon.length < 4) {
      if (gold < 30) {
        text.innerText = "You do not have enough gold to buy a weapon.";
      } else {
        goldText.innerText = gold - 30;
        eventory.weapon.push(weapons[eventory.weapon.length - 1])
        text.innerText = `You now have a ${
          weapons[eventory.weapon.length - 1]
        }. In your inventory you have:${JSON.stringify(eventory.weapon)}`;
      }
    } else {
    }
  };

  button3.onclick = town
}

town()