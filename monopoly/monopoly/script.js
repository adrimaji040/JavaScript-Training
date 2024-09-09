// Elements
const $properties = document.getElementById('properties')
const $more = document.getElementById('more')
const $dialog = document.getElementById('dialog')

// Data, store before monopoly cards
const deck = []



// Functions display property function
function displayProperties(properties){
  deck.push(...properties)
  console.log(deck)
  $properties.innerHTML = deck.reduce((html,prop) =>
html + `
   <div class="property">
   <div class="property-group" style="background-color: ${prop.group}"></div>
   <h2 class="property-title">${prop.name}</h2>
   <p class="property-price">$${prop.price}</p>
   </div>`, '')
}


// Listeners
$more.addEventListener('click', async function(){
  const response = await fetch('https://monopoly.zoodinkers.com/api/properties?offset= ' + deck.length)
  const json = await response.json()
  displayProperties(json)
  
})

$properties.addEventListener('click', async function (e) {
  const $property = e.target.closest('.property') //element or null

  if ($property){
    const response = await fetch('https://monopoly.zoodinkers.com/api/properties/boardwalk')
    const json = await response.json()
    console.log(json)
  }
  $dialog.showModal()
})

$dialog.addEventListener('click', function () {
  $dialog.close();
})



//API request 
fetch('https://monopoly.zoodinkers.com/api/properties')
  .then(response => response.json())
  .then(json => {
    console.log(json)
    displayProperties(json)
  })