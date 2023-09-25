// AJAX to replace them with dynamic data from GET https://json-server-ft3qa5--3000.local.webcontainer.io/api/v1/courses
// https://jsonserverbezxrx-sfe1--3000--33975f1d.local-credentialless.webcontainer.io/api/v1/logs

fetch('http://localhost:3000/courses')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    for (const options in data){
      var selection = document.getElementById("course");
      
      let option = document.createElement("option");
      
      option.setAttribute('value', data[options].id);

      let optionText = document.createTextNode(data[options].display);
      
      option.appendChild(optionText);
      selection.appendChild(option);
    }
  })

//If course ever becomes unselected, don't show the uvu id text input box
const selectElement = document.querySelector("#course");
selectElement.addEventListener("change", (event) => {
  uvu = document.getElementById("studentID");
  uvu.style.display = event.target.value === ""? "none" : "block";
})


// function to calculate the current theme setting.
// * Look for a local storage value.
// * Fall back to system setting.
// * Fall back to light mode.
function calculateThemeSetting({localStorageTheme, systemSettingDark}){
  if (localStorageTheme !== null){
    return localStorageTheme;
  }
  if(systemSettingDark.matches){
    return "dark";
  }
  return "light";
}

// Utility function to update the button text and aria-label
function updateButton({buttonE1, isDark}){
  const newCta = isDark ? "Off" : "On";


  //buttonE1.setAttribute("aria-label", newCta);
  buttonE1.innerText = newCta;
}
// Utility function to update the theme setting on the html tag
function updateTheme({theme}){
  document.querySelector("html").setAttribute("data-theme")
}

//Grab what we need from the DOM and system settings on page load
const button = document.querySelector("[data-theme-toggle]");
// get theme on page load
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(pre-color-scheme: dark)");

// Work out the current site settings
let currentThemeSetting = calculateThemeSetting({localStorageTheme, systemSettingDark});
// Update the theme setting and button text accoridng to current settings
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateTheme({ theme: currentThemeSetting});

// Add an event listener to toggle the theme
button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme",newTheme);
  updateButton({buttonE1: button, isDark: newTheme === "dark"});
  updateTheme({theme:newTheme});
  currentThemeSetting = newTheme;
})

















//replace them with dynamic data by ajaxing GET https://json-server-ft3qa5--3000.local.webcontainer.io/logs?courseId=<courseID>&uvuId=<uvuID>
document.getElementById('uvuId').addEventListener('input', handleOnChange);

//let isPopulated = false;
function handleOnChange() {
  let str = document.getElementById('uvuId').value;
  //the str must be length 8 put up the log from server
  if (str.length === 8) {
    let listContainer = document.getElementById('unOrdered');
     
    let child = listContainer.lastElementChild;
    while (child){
      listContainer.removeChild(child);
      child = listContainer.lastElementChild;
    }
    fetch(
      'http://localhost:3000/logs'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const student in data) {
          if (str === data[student].uvuId) {
           
            var mainContainer = document.getElementById('uvuIdDisplay');
            mainContainer.innerHTML = 'Student Logs for ' + data[student].uvuId;
            // creating html tags
            var listContainer = document.getElementById('unOrdered');

            //new tags 
            var childContainer = document.createElement('li');
            var divContainer = document.createElement('div');
            var smallTag = document.createElement('small');
            var preTag = document.createElement('pre');
            var pTag = document.createElement('p');

            // //date info
            var studentInfo = listContainer
              .appendChild(childContainer)
              .appendChild(divContainer)
              .appendChild(smallTag);
            //text info
            var studentText = childContainer
              .appendChild(preTag)
              .appendChild(pTag);
            //date info displayed 
            //text info displayed
            studentInfo.innerHTML = data[student].date;
            studentText.innerHTML = data[student].text;
            console.log('reached then()', data[student].date);
            console.log('dates reached ', data[student].text);
          }        
        }
      })
      .catch((err) => {
        console.log('error1 ', err);
      });
  }
}
//Button should be disabled until the logs, if any, are displayed and there's text in the textarea

document.querySelector('#button').disabled = true;
document.querySelector('textarea').addEventListener("input", disableButton);

function disableButton() {
  const txtArea = document.getElementById('text');
  const button = document.getElementById('button');
  const unOrder = document.getElementById('unOrdered');
  console.log("txtfunc");
  if (txtArea.value === ""  && !unOrder.hasChildNodes()){
    console.log('textArea');
    button.disabled = true;
    //button.reset();
    console.log("disable");
    //document.getElementById("form1").reset();
  } else { // display is not empty button is active and 
    console.log('false');
    button.disabled = false;
    //Button should AJAX PUT the textarea value to json-server which will store it
    let txt = document.querySelector('textarea').value;
    if(txt.endsWith('.')){
      const date = new Date();
      let currentDate = date.toISOString().substring(0,10);

      const dbJson = {
        courseId: document.querySelector("option").value,
        uvuId: document.querySelector("input").value,
        date: currentDate,
        text: document.querySelector("textarea").value
      }
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(dbJson)
      }
      
      fetch('http://localhost:3000/logs', requestOptions)
      .then(response => response.json())
      .then(data => console.log("testing", data))
      .catch(err => console.log("log error", err))
    }
  } 
}








