var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submitButton = document.getElementById("submitButton");
var showValdiation = document.getElementById("showValdiation");
var siteContainer = [];

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  showData();
});
//
function addLink() {
  if (submitButton.innerHTML == "update"){
    submitButton.innerHTML = "submit";
    var url = {
      name: siteName.value,
      destination: siteURL.value,
    };
    siteContainer.splice(i,1,url);
  }
  else{
    var url = {
      name: siteName.value,
      destination: siteURL.value,
    };
    siteContainer.push(url);

  }
  localStorage.setItem("website Box", JSON.stringify(siteContainer));
  showData();
  clearData();
  // noColorValidationAfterSubmit();
}
function showData() {
  if (localStorage.getItem("website Box") != null) {
    siteContainer = JSON.parse(localStorage.getItem("website Box"));

    let table = "";
    let siteNumber = 0;
    for (i = 0; i < siteContainer.length; i++) {
      siteNumber = i + 1;
      table += `
        <tr>
            <td>${siteNumber}</td>
            <td>${siteContainer[i].name}</td>
            <td><a href="${siteContainer[i].destination}" id="visitLink" target="_blank" class="btn-visit">visit</a></td>
            <td><button class="btn-delete" onclick="deleteProduct(${i})" id="deleteBtn">delete</button></td>
            <td><button class="btn-update" onclick="updateSiteName(${i})" id="updateBtn">update</button></td>
        </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;
  }
}
function clearData() {
  siteName.value = "";
  siteURL.value = "";
}
function deleteProduct(i) {
  siteContainer.splice(i, 1);
  localStorage.setItem("website Box", JSON.stringify(siteContainer));
  showData();
}
function isSiteNameInputValid() {
  return siteName.value.length < 3 ? false : true;
}
function isSiteURLInputValid() {
  var isValid = false;
  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z-9()@:%_\+.~#?&\\=]*)?/gi;
  var siteURLValue = siteURL.value;
  var regex = new RegExp(expression);
  if (siteURLValue.match(regex)) isValid = true;
  return isValid;
}
function changeSiteNameValidationColor() {
  if (isSiteNameInputValid()) {
    siteName.style.boxShadow = " 0 0 10px 5px green";
  } else {
    siteName.style.boxShadow = " 0 0 10px 5px red";
  }
}
function changeSiteURLValidationColor() {
  if (isSiteURLInputValid()) {
    siteURL.style.boxShadow = " 0 0 10px 5px green";
  } else {
    siteURL.style.boxShadow = " 0 0 10px 5px red";
  }
}
function showPopUpValidationBox() {
  if (isSiteNameInputValid() && isSiteURLInputValid()) {
    showValdiation.className = showValdiation.className.replace(
      "d-visible",
      "d-none"
    );
    addLink();
  } else {
    showValdiation.className = showValdiation.className.replace(
      "d-none",
      "d-visible"
    );
  }
}
function noColorValidationAfterSubmit() {
  if (siteName.value === "" || siteURL.value === "") {
    siteName.style.boxShadow = "none";
    siteURL.style.boxShadow = "none";
  }
}
function updateSiteName(i) {
  siteName.value = siteContainer[i].name;
  siteURL.value = siteContainer[i].destination;
  submitButton.innerHTML = "update";

}
// function updateSiteName() {
//   var oldName = document.getElementById("oldName").value; // "facebook"
//   var newName = document.getElementById("newName").value; // "twitter"
//   var websiteObjects = JSON.parse(localStorage.getItem("website Box")); // Current Array of objects

//   // search for oldName in current array
//   for (i = 0; i < websiteObjects.length; i++) {
//     // if found override it with newName
//     if (websiteObjects[i].name == oldName) websiteObjects[i].name = newName;
//   }

//   // override current array with new array
//   localStorage.setItem("website Box", JSON.stringify(websiteObjects));

//   // show array in local storage
//   showData();
// }
