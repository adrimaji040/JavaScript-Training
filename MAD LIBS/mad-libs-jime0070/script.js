
const LunchRoomText = "Make sure your lunch [CONTAINER] is filled with [ADJECTIVE 1] food. Do not go to the [ADJECTIVE 2] food stand across the street from the school. The hamburgers they serve are fried in [NOUN] and are made of [ANIMAL] meat. So take a sandwich made of [VEGETABLE 1] or [VEGETABLE 2]. It's much healthier!";
const WeatherText = "Early tomorrow, a [ADJECTIVE 1] front will collide with a mass of hot [PLURAL NOUN 1] moving from the north. This means we can expect [ADJECTIVE 2] winds and occasional [PLURAL NOUN 2] by late afternoon. Wind velocity will be [NUMBER 1] miles an hour, and the high temperature should b e around [NUMBER 2] degrees. So, if you're going out, you had better plan on wearing your [ARTICLE OF CLOTHING].";

document.getElementById('selectedStory').addEventListener("change", function (event) {
 
 let $story = event.target.value;


 if ($story == "Lunch Room") { 
    document.getElementById('weatherReport').classList.add("d-none");
    document.getElementById('lunchRoom').classList.remove("d-none");
    document.getElementById('lunchRoom').classList.add("d-block");
    document.getElementById('lunchRoom').reset();
 
 } else if ($story == "Weather Report") {
    document.getElementById('lunchRoom').classList.add("d-none");
    document.getElementById('weatherReport').classList.remove("d-none");
    document.getElementById('weatherReport').classList.add("d-block");
    document.getElementById('weatherReport').reset();

 } else {
    document.getElementById('lunchRoom').classList.add("d-none");
    document.getElementById('weatherReport').classList.add("d-none");
    document.getElementById('finalText').classList.add("d-none");
    document.getElementById('finalText').classList.remove("d-block");
    document.getElementById('weatherReport').reset();
    document.getElementById('lunchRoom').reset();
  
 }
});




// LuchRoom
document.getElementById('redStoryL').addEventListener("click", function(e){
  
   
    let ObjLunch = {};
    let CopyStory = LunchRoomText;

    let flagEmpy = 0;
    
    let elementValue = document.getElementById('lrContainer').value;
    if (elementValue == null || elementValue.trim() === "" ){
        flagEmpy++;
    }
    ObjLunch.CONTAINER =  elementValue;
   

    elementValue = document.getElementById('lrNoun').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.NOUN =  elementValue;
  

    elementValue = document.getElementById('lrAdjective1').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.ADJECTIVE_1 = elementValue;

    elementValue = document.getElementById('lrAdjective2').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.ADJECTIVE_2 = elementValue;

    elementValue = document.getElementById('lrVegetable1').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.VEGETABLE_1 = elementValue;

    elementValue = document.getElementById('lrVegetable2').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.VEGETABLE_2 = elementValue;

    elementValue = document.getElementById('lrAnimal').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.ANIMAL = elementValue;

  if (flagEmpy == 0){
    for(let key in ObjLunch){
        let keyName = key.replace("_"," ");
        let value = ObjLunch[key];
        value = '<span style="color:red"> ' + value + ' </span>'
    
        CopyStory = CopyStory.replaceAll("["+ keyName + "]", value);
      }
       
       document.getElementById('ptextFinal').innerHTML = CopyStory;
       document.getElementById('finalText').classList.remove("d-none");
       document.getElementById('finalText').classList.add("d-block");  
  }
  
    
})

//Wheather report
document.getElementById('redStoryW').addEventListener("click", function(e){
  

    let ObjLunch = {};
    let CopyStory = WeatherText;
    let flagEmpy = 0;

   
    let elementValue = document.getElementById('wrPluralNoun1').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.PLURAL_NOUN_1 =  elementValue;
   

    elementValue = document.getElementById('wrPluralNoun2').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.PLURAL_NOUN_2 =  elementValue;
  

    elementValue = document.getElementById('wrAdjective1').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.ADJECTIVE_1 = elementValue;

    elementValue = document.getElementById('wrAdjective2').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.ADJECTIVE_2 = elementValue;

    elementValue = document.getElementById('wrNumber1').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.NUMBER_1 = elementValue;

    elementValue = document.getElementById('wrNumber2').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.NUMBER_2 = elementValue;

    elementValue = document.getElementById('wrArticleOfClothing').value;
    if (elementValue == null  || elementValue.trim() === ""){
        flagEmpy++;
    }
    ObjLunch.ARTICLE_OF_CLOTHING = elementValue;

    
    if (flagEmpy == 0){
        for(let key in ObjLunch){
            let keyName = key.replaceAll("_"," ");
            let value = ObjLunch[key];
            value = '<span style="color:red"> ' + value + ' </span>'

            CopyStory = CopyStory.replaceAll("["+ keyName + "]", value);
        }
        
        document.getElementById('ptextFinal').innerHTML = CopyStory;
        document.getElementById('finalText').classList.remove("d-none");
        document.getElementById('finalText').classList.add("d-block");
    }    

    
});


document.getElementById('redStoryW').addEventListener("click", function(e){
    e.preventDefault();    
})


document.getElementById('PlayAgain').addEventListener("click", function(e){
    
    document.getElementById('lunchRoom').reset();
    document.getElementById('weatherReport').reset();  
    document.getElementById('finalText').classList.add("d-none");
    document.getElementById('finalText').classList.remove("d-block");      
});
    
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
  
          form.classList.add('was-validated')
          event.preventDefault();
        }, false)
      })
  })();
    

