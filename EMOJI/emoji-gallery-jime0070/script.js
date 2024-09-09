

let $emoji = document.getElementById('emojis')



for (const emo of emoji){
  const $container = document.createElement('div');
  $container.classList.add('container');

  const $face = document.createElement('div');
  $face.classList.add('face');
  $face.textContent = `${emo.char}`;
 
  const $name = document.createElement('div');
  $name.classList.add('name')
  $name.textContent = `${emo.name}`;
 
  $container.appendChild($face);
  $container.appendChild($name);

  $emoji.appendChild($container);

}





