/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

// When it's load.
const EMOJIS_LVL_1 = [
  {
    'name': 'hand',
    'emoji': '✋',
    'path': '/img/emojis/game/hand.svg'
  },
  {
    'name': 'mouse',
    'emoji': '🖱',
    'path': '/img/emojis/game/mouse.svg'
  },
  {
    'name': 'plug',
    'emoji': '🔌',
    'path': '/img/emojis/game/plug.svg'
  },
  {
    'name': 'light bulb',
    'emoji': '💡',
    'path': '/img/emojis/game/light bulb.svg'
  },
  {
    'name': 'book',
    'emoji': '📚',
    'path': '/img/emojis/game/book.svg'
  },
  {
    'name': 'cellphone',
    'emoji': '📱',
    'path': '/img/emojis/game/cellphone.svg'
  },
  {
    'name': 'keyboard',
    'emoji': '⌨️',
    'path': '/img/emojis/game/keyboard.svg'
  },
  {
    'name': 'tv',
    'emoji': '📺',
    'path': '/img/emojis/game/tv.svg'
  },
  {
    'name': 'laptop',
    'emoji': '💻',
    'path': '/img/emojis/game/laptop.svg'
  },
  {
    'name': 'shirt',
    'emoji': '👕',
    'path': '/img/emojis/game/shirt.svg'
  },
  {
    'name': 'pants',
    'emoji': '👖',
    'path': '/img/emojis/game/pants.svg'
  },
  {
    'name': 'shoe',
    'emoji': '👞',
    'path': '/img/emojis/game/shoe.svg'
  }
];

const EMOJIS_LVL_2 = [
  {
    'name': 'key',
    'emoji': '🔑',
    'path': '/img/emojis/game/key.svg'
  },
  {
    'name': 'newspaper',
    'emoji': '📰',
    'path': '/img/emojis/game/newspaper.svg'
  },
  {
    'name': 'plate',
    'emoji': '🍽',
    'path': '/img/emojis/game/plate.svg'
  },
  {
    'name': 'sock',
    'emoji': '🧦',
    'path': '/img/emojis/game/sock.svg'
  },
  {
    'name': 'coat',
    'emoji': '🧥',
    'path': '/img/emojis/game/coat.svg'
  },
  {
    'name': 'wallet',
    'emoji': '👛',
    'path': '/img/emojis/game/wallet.svg'
  },
  {
    'name': 'bed',
    'emoji': '🛏',
    'path': '/img/emojis/game/bed.svg'
  },
  {
    'name': 'cup',
    'emoji': '☕',
    'path': '/img/emojis/game/cup.svg'
  },
  {
    'name': 'watch',
    'emoji': '⌚',
    'path': '/img/emojis/game/watch.svg'
  },
  {
    'name': 'trash can',
    'emoji': '🗑',
    'path': '/img/emojis/game/trash can.svg'
  },
  {
    'name': 'envelope',
    'emoji': '✉️',
    'path': '/img/emojis/game/envelope.svg'
  },
  {
    'name': 'sunglasses',
    'emoji': '🕶',
    'path': '/img/emojis/game/sunglasses.svg'
  },
  {
    'name': 'toilet',
    'emoji': '🚽',
    'path': '/img/emojis/game/toilet.svg'
  },
  {
    'name': 'clock',
    'emoji': '🕑',
    'path': '/img/emojis/game/clock.svg'
  },
  {
    'name': 'hat',
    'emoji': '🧢',
    'path': '/img/emojis/game/hat.svg'
  },
  {
    'name': 'backpack',
    'emoji': '🎒',
    'path': '/img/emojis/game/backpack.svg'
  },
  {
    'name': 'headphones',
    'emoji': '🎧',
    'path': '/img/emojis/game/headphones.svg'
  },
  {
    'name': 'display',
    'emoji': '🖥',
    'path': '/img/emojis/game/display.svg'
  },
  {
    'name': 'spoon',
    'emoji': '🥄',
    'path': '/img/emojis/game/spoon.svg'
  },
  {
    'name': 'bowl',
    'emoji': '🥣',
    'path': '/img/emojis/game/bowl.svg'
  }
];

const EMOJIS_LVL_3 = [
  {
    'name': 'scarf',
    'emoji': '🧣',
    'path': '/img/emojis/game/scarf.svg'
  },
  {
    'name': 'scissors',
    'emoji': '✂️',
    'path': '/img/emojis/game/scissors.svg'
  },
  {
    'name': 'cabinet',
    'emoji': '🗄',
    'path': '/img/emojis/game/cabinet.svg'
  },
  {
    'name': 'tree',
    'emoji': '🌲',
    'path': '/img/emojis/game/tree.svg'
  },
  {
    'name': 'beer',
    'emoji': '🍺',
    'path': '/img/emojis/game/beer.svg'
  },
  {
    'name': 'sofa',
    'emoji': '🛋',
    'path': '/img/emojis/game/sofa.svg'
  },
  {
    'name': 'house',
    'emoji': '🏠',
    'path': '/img/emojis/game/house.svg'
  },
  {
    'name': 'building',
    'emoji': '🏢',
    'path': '/img/emojis/game/building.svg'
  },
  {
    'name': 'bicycle',
    'emoji': '🚲',
    'path': '/img/emojis/game/bicycle.svg'
  },
  {
    'name': 'frying pan',
    'emoji': '🍳',
    'path': '/img/emojis/game/frying pan.svg'
  },
  {
    'name': 'wine',
    'emoji': '🍷',
    'path': '/img/emojis/game/wine.svg'
  },
  {
    'name': 'bread',
    'emoji': '🍞',
    'path': '/img/emojis/game/bread.svg'
  },
  {
    'name': 'printer',
    'emoji': '🖨',
    'path': '/img/emojis/game/printer.svg'
  },
  {
    'name': 'banana',
    'emoji': '🍌',
    'path': '/img/emojis/game/banana.svg'
  },
  {
    'name': 'car',
    'emoji': '🚗',
    'path': '/img/emojis/game/car.svg'
  },
  {
    'name': 'flower',
    'emoji': '🌼',
    'path': '/img/emojis/game/flower.svg'
  },
  {
    'name': 'glove',
    'emoji': '🧤',
    'path': '/img/emojis/game/glove.svg'
  },
  {
    'name': 'umbrella',
    'emoji': '☂️',
    'path': '/img/emojis/game/umbrella.svg'
  },
  {
    'name': 'bathtub',
    'emoji': '🛁',
    'path': '/img/emojis/game/bathtub.svg'
  },
  {
    'name': 'camera',
    'emoji': '📷',
    'path': '/img/emojis/game/camera.svg'
  }
];

const EMOJIS_LVL_4 = [
  {
    'name': 'cat',
    'emoji': '🐱',
    'path': '/img/emojis/game/cat.svg'
  },
  {
    'name': 'guitar',
    'emoji': '🎸',
    'path': '/img/emojis/game/guitar.svg'
  },
  {
    'name': 'dog',
    'emoji': '🐶',
    'path': '/img/emojis/game/dog.svg'
  },
  {
    'name': 'orange',
    'emoji': '🍊',
    'path': '/img/emojis/game/orange.svg'
  },
  {
    'name': 'strawberry',
    'emoji': '🍓',
    'path': '/img/emojis/game/strawberry.svg'
  },
  {
    'name': 'piano',
    'emoji': '🎹',
    'path': '/img/emojis/game/piano.svg'
  },
  {
    'name': 'hammer',
    'emoji': '🔨',
    'path': '/img/emojis/game/hammer.svg'
  },
  {
    'name': 'microphone',
    'emoji': '🎤',
    'path': '/img/emojis/game/microphone.svg'
  },
  {
    'name': 'broccoli',
    'emoji': '🥦',
    'path': '/img/emojis/game/broccoli.svg'
  },
  {
    'name': 'lipstick',
    'emoji': '💄',
    'path': '/img/emojis/game/lipstick.svg'
  },
  {
    'name': 'lock',
    'emoji': '🔒',
    'path': '/img/emojis/game/lock.svg'
  },
  {
    'name': 'mailbox',
    'emoji': '📪',
    'path': '/img/emojis/game/mailbox.svg'
  },
  {
    'name': 'soccer ball',
    'emoji': '⚽',
    'path': '/img/emojis/game/soccer ball.svg'
  },
  {
    'name': 'mushroom',
    'emoji': '🍄',
    'path': '/img/emojis/game/mushroom.svg'
  },
  {
    'name': 'lemon',
    'emoji': '🍋',
    'path': '/img/emojis/game/lemon.svg'
  },
  {
    'name': 'baseball',
    'emoji': '⚾',
    'path': '/img/emojis/game/baseball.svg'
  },
  {
    'name': 'basketball',
    'emoji': '🏀',
    'path': '/img/emojis/game/basketball.svg'
  },
  {
    'name': 'flashlight',
    'emoji': '🔦',
    'path': '/img/emojis/game/flashlight.svg'
  },
  {
    'name': 'candle',
    'emoji': '🕯',
    'path': '/img/emojis/game/candle.svg'
  },
  {
    'name': 'radio',
    'emoji': '📻',
    'path': '/img/emojis/game/radio.svg'
  }
];

const EMOJIS_LVL_5 = [
  {
    'name': 'fish',
    'emoji': '🐟',
    'path': '/img/emojis/game/fish.svg'
  },
  {
    'name': 'icecream',
    'emoji': '🍨',
    'path': '/img/emojis/game/icecream.svg'
  },
  {
    'name': 'pizza',
    'emoji': '🍕',
    'path': '/img/emojis/game/pizza.svg'
  },
  {
    'name': 'bird',
    'emoji': '🐦',
    'path': '/img/emojis/game/bird.svg'
  },
  {
    'name': 'cassette',
    'emoji': '📼',
    'path': '/img/emojis/game/cassette.svg'
  },
  {
    'name': 'hamburger',
    'emoji': '🍔',
    'path': '/img/emojis/game/hamburger.svg'
  },
  {
    'name': 'hotdog',
    'emoji': '🌭',
    'path': '/img/emojis/game/hotdog.svg'
  },
  {
    'name': 'fries',
    'emoji': '🍟',
    'path': '/img/emojis/game/fries.svg'
  },
  {
    'name': 'ramen',
    'emoji': '🍜',
    'path': '/img/emojis/game/ramen.svg'
  },
  {
    'name': 'donut',
    'emoji': '🍩',
    'path': '/img/emojis/game/donut.svg'
  },
  {
    'name': 'sushi',
    'emoji': '🍣',
    'path': '/img/emojis/game/sushi.svg'
  },
  {
    'name': 'taco',
    'emoji': '🌮',
    'path': '/img/emojis/game/taco.svg'
  },
  {
    'name': 'burrito',
    'emoji': '🌯',
    'path': '/img/emojis/game/burrito.svg'
  },
  {
    'name': 'traffic light',
    'emoji': '🚦',
    'path': '/img/emojis/game/traffic light.svg'
  },
  {
    'name': 'bus',
    'emoji': '🚎',
    'path': '/img/emojis/game/bus.svg'
  },
  {
    'name': 'truck',
    'emoji': '🚚',
    'path': '/img/emojis/game/truck.svg'
  },
  {
    'name': 'screw',
    'emoji': '🔩',
    'path': '/img/emojis/game/screw.svg'
  },
  {
    'name': 'sax',
    'emoji': '🎷',
    'path': '/img/emojis/game/sax.svg'
  },
  {
    'name': 'baby bottle',
    'emoji': '🍼',
    'path': '/img/emojis/game/baby bottle.svg'
  },
  {
    'name': 'motor scooter',
    'emoji': '🛵',
    'path': '/img/emojis/game/motor scooter.svg'
  },
  {
    'name': 'magnifying glass',
    'emoji': '🔎',
    'path': '/img/emojis/game/magnifying glass.svg'
  },
  {
    'name': 'jack o lantern',
    'emoji': '🎃',
    'path': '/img/emojis/game/jack o lantern.svg'
  }
];

// Items for the demo are always selected in the same order as they are defined
// here.
const EMOJIS_LVL_DEMO = [
  {
    'name': 'watch',
    'emoji': '⌚',
    'path': '/img/emojis/game/watch.svg'
  },
  {
    'name': 'shoe',
    'emoji': '👞',
    'path': '/img/emojis/game/shoe.svg'
  },
  {
    'name': 'banana',
    'emoji': '🍌',
    'path': '/img/emojis/game/banana.svg'
  },
  {
    'name': 'beer',
    'emoji': '🍺',
    'path': '/img/emojis/game/beer.svg'
  },
  {
    'name': 'jack o lantern',
    'emoji': '🎃',
    'path': '/img/emojis/game/jack o lantern.svg'
  }
];
$(() => {
  $.each(EMOJIS_LVL_DEMO, function(index, val) {
    var path = val.path.substring(1, val.path.length);
    $('.pokedex .level_0').append('<div class="col-4 item"><img src="'+path+'"><br><span>'+val.name+'</span></div>');
  });
  $.each(EMOJIS_LVL_1, function(index, val) {
    var path = val.path.substring(1, val.path.length);
    $('.pokedex .level_1').append('<div class="col-4 item"><img src="'+path+'"><br><span>'+val.name+'</span></div>');
  });
  $.each(EMOJIS_LVL_2, function(index, val) {
    var path = val.path.substring(1, val.path.length);
    $('.pokedex .level_2').append('<div class="col-4 item"><img src="'+path+'"><br><span>'+val.name+'</span></div>');
  });
  $.each(EMOJIS_LVL_3, function(index, val) {
    var path = val.path.substring(1, val.path.length);
    $('.pokedex .level_3').append('<div class="col-4 item"><img src="'+path+'"><br><span>'+val.name+'</span></div>');
  });
  $.each(EMOJIS_LVL_4, function(index, val) {
    var path = val.path.substring(1, val.path.length);
    $('.pokedex .level_4').append('<div class="col-4 item"><img src="'+path+'"><br><span>'+val.name+'</span></div>');
  });
  $.each(EMOJIS_LVL_5, function(index, val) {
    var path = val.path.substring(1, val.path.length);
    $('.pokedex .level_5').append('<div class="col-4 item"><img src="'+path+'"><br><span>'+val.name+'</span></div>');
  });
});
