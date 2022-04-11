let tableBody = document.getElementById("tableBody");
let add = document.getElementById("add");

let tableBodyDone = document.getElementById("tableBody_Done");
let tableBodyCancelled = document.getElementById("tableBody_Cancelled");

let clearDone = document.getElementById("Done-button");
let clearCancel = document.getElementById("Cancel-button");

let bluePrintCancel = () => {
  itemJsonArrayStrCancel = localStorage.getItem("itemsJsonCancel");
  tasksCancelled = JSON.parse(itemJsonArrayStrCancel);
  localStorage.setItem("itemsJsonCancel", JSON.stringify(tasksCancelled));

  let str = "";
  tasksCancelled.forEach((element, index) => {
    str += `
                    <tr class = "CancelElements">
                    <th class="SNO" scope="row">${index + 1}.</th>
                    <td class = "itt">${element[0]}</td>
                    <td class = "itd">${element[1]}</td>
                    <td><i class = "CancelDelBtn fa-solid fa-trash-can" onclick = "DeleteOfCancel(${index})"></i></td></tr>`;
  });
  tableBodyCancelled.innerHTML = str;
};

let bluePrintDone = () => {
  itemJsonArrayStrDone = localStorage.getItem("itemsJsonDone");
  tasksDone = JSON.parse(itemJsonArrayStrDone);
  localStorage.setItem("itemsJsonDone", JSON.stringify(tasksDone));

  let str = "";
  tasksDone.forEach((element, index) => {
    str += `
                    <tr class = "CompleteElements">
                    <th class="SNO" scope="row">${index + 1}.</th>
                    <td class = "itt">${element[0]}</td>
                    <td class = "itd">${element[1]}</td>
                    <td><i class = "CompleteDelBtn fa-solid fa-trash-can" onclick = "DeleteOfDone(${index})"></i></td></tr>`;
  });
  tableBodyDone.innerHTML = str;
};

clearDone.addEventListener("click", () => {
  if (confirm("Do you really want to clear?")) {
    console.log("Clearing the storage");
    localStorage.removeItem("itemsJsonDone");
    tasksDone = [];
    localStorage.setItem("itemsJsonDone", JSON.stringify(tasksDone));
    bluePrintDone();
    update();
  }
  update();
});

clearCancel.addEventListener("click", () => {
  if (confirm("Do you really want to clear?")) {
    console.log("Clearing the storage");
    localStorage.removeItem("itemsJsonCancel");
    tasksCancelled = [];
    localStorage.setItem("itemsJsonCancel", JSON.stringify(tasksCancelled));
    bluePrintCancel();
    update();
  }
  update();
});

let Settings = () => {
  let Settings_Border = document.querySelectorAll(".Settings_Border");
  let Set_Btns_Border = document.querySelectorAll(".Set_Btns_Border");

  for (let i = 0; i <= Settings_Border.length - 1; i++) {
    Settings_Border[i].addEventListener("click", () => {
      Set_Btns_Border[i].classList.toggle("hidden");
    });
  }
};

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `
                    <tr class = "JSElements">
                    <th class="SNO" scope="row">${index + 1}.</th>
                    <td class = "itt">${element[0]}</td>
                    <td class = "itd">${element[1]}</td> 
                    <td><div class = "Settings"><div class = "Settings_Border"></div>
                    <div class = "Set_Btns_Border hidden">
                    <i class="fa-solid fa-trash-can Set_Btns Del" onclick="Delete(${index})">&nbsp&nbspDelete</i>
                    <i class="Cancel Set_Btns fa-solid fa-rectangle-xmark" onclick = "Cancel(${index})">&nbsp&nbspCancel</i>
                    <i class="Complete fa-solid fa-circle-check Set_Btns" onclick = "Complete(${index})">&nbsp&nbspComplete</i>
                    <div class = "loader">
                    </td></tr>`;
  });
  tableBody.innerHTML = str;

  Settings();
}

function getAndUpdate() {
  console.log("Updating List...");
  title = document.getElementById("title").value;
  desc = document.getElementById("description").value;
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([title, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([title, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  }
  update();
}

function Delete(itemIndex) {
  console.log("Delete", itemIndex);
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);
  // Delete itemIndex element from the array
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}

let DeleteOfCancel = (itemIndex) => {
  console.log("Delete Cancel", itemIndex);
  itemJsonArrayStrCancel = localStorage.getItem("itemsJsonCancel");
  tasksCancelled = JSON.parse(itemJsonArrayStrCancel);
  tasksCancelled.splice(itemIndex, 1);
  localStorage.setItem("itemsJsonCancel", JSON.stringify(tasksCancelled));
  update();
  let str = "";
  tasksCancelled.forEach((element, index) => {
    str += `
                    <tr class = "CancelElements">
                    <th class="SNO" scope="row">${index + 1}.</th>
                    <td class = "itt">${element[0]}</td>
                    <td class = "itd">${element[1]}</td>
                    <td><i class = "CancelDelBtn fa-solid fa-trash-can" onclick = "DeleteOfCancel(${index})"></i></td></tr>`;
  });
  tableBodyCancelled.innerHTML = str;
};

let DeleteOfDone = (itemIndex) => {
  console.log("Delete Done", itemIndex);
  itemJsonArrayStrDone = localStorage.getItem("itemsJsonDone");
  tasksDone = JSON.parse(itemJsonArrayStrDone);
  tasksDone.splice(itemIndex, 1);
  localStorage.setItem("itemsJsonDone", JSON.stringify(tasksDone));
  update();
  let str = "";
  tasksDone.forEach((element, index) => {
    str += `
                    <tr class = "CompleteElements">
                    <th class="SNO" scope="row">${index + 1}.</th>
                    <td class = "itt">${element[0]}</td>
                    <td class = "itd">${element[1]}</td>
                    <td><i class = "CompleteDelBtn fa-solid fa-trash-can" onclick = "DeleteOfDone(${index})"></i></td></tr>`;
  });
  tableBodyDone.innerHTML = str;
};

let Cancel = (itemIndex) => {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);

    let itemElement = itemJsonArray[itemIndex];
    let tasksCancelled = [];

    if (localStorage.getItem("itemsJsonCancel") == null) {
      tasksCancelled.push(itemElement);
      localStorage.setItem("itemsJsonCancel", JSON.stringify(tasksCancelled));
    } else {
      itemJsonArrayStrCancel = localStorage.getItem("itemsJsonCancel");
      tasksCancelled = JSON.parse(itemJsonArrayStrCancel);
      tasksCancelled.push(itemElement);
      localStorage.setItem("itemsJsonCancel", JSON.stringify(tasksCancelled));
    }

    let str = "";
    tasksCancelled.forEach((element, index) => {
      str += `
                    <tr class = "CancelElements">
                    <th class="SNO" scope="row">${index + 1}.</th>
                    <td class = "itt">${element[0]}</td>
                    <td class = "itd">${element[1]}</td>
                    <td><i class = "CancelDelBtn fa-solid fa-trash-can" onclick = "DeleteOfCancel(${index})"></i></td></tr>`;
    });
    tableBodyCancelled.innerHTML = str;

    Delete(itemIndex);
    update();
  },
  Complete = (itemIndex) => {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);

    let itemElement = itemJsonArray[itemIndex];
    let tasksDone = [];

    if (localStorage.getItem("itemsJsonDone") == null) {
      tasksDone.push(itemElement);
      localStorage.setItem("itemsJsonDone", JSON.stringify(tasksDone));
    } else {
      itemJsonArrayStrDone = localStorage.getItem("itemsJsonDone");
      tasksDone = JSON.parse(itemJsonArrayStrDone);
      tasksDone.push(itemElement);
      localStorage.setItem("itemsJsonDone", JSON.stringify(tasksDone));
    }

    let str = "";
    tasksDone.forEach((element, index) => {
      str += `
                    <tr class = "CompleteElements">
                    <th class="SNO" scope="row">${index + 1}.</th>
                    <td class = "itt">${element[0]}</td>
                    <td class = "itd">${element[1]}</td>
                    <td><i class = "CompleteDelBtn fa-solid fa-trash-can" onclick = "DeleteOfDone(${index})"></i></td></tr>`;
    });
    tableBodyDone.innerHTML = str;

    Delete(itemIndex);
    update();
  };

function clearStorage() {
  if (confirm("Do you really want to clear?")) {
    console.log("Clearing the storage");
    localStorage.removeItem("itemsJson");
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
  }
  update();
}

if (localStorage.length >= 1) {
  update();
  bluePrintCancel();
  bluePrintDone();
}

errWarningTitle = document.getElementById("errorWarning1");
errWarningDescription = document.getElementById("errorWarning2");

errWarningTitle.style.display = "none";
errWarningDescription.style.display = "none";

function Validation1() {
  let Title = document.getElementById("title").value;
  let Description = document.getElementById("description").value;

  let warningText;

  let errMessage = document.getElementById("errorMessage");

  if (errMessage.innerHTML !== null) {
    errMessage.classList.remove("hidden");
  } else if (errMessage.innerHTML !== null) {
    errMessage.classList.remove("hidden");
  }

  if (Title.length <= 1) {
    warningText = "Please Enter a valid Title";
    errMessage.innerHTML = warningText;
    errWarningTitle.style.display = "block";
    update();
    return false;
  } else {
    warningText = null;
    errMessage.innerHTML = null;
    errWarningTitle.style.display = "none";
  }
  if (Title.length > 20) {
    warningText = "maximum limit of words in title is 20";
    errMessage.innerHTML = warningText;
    errWarningTitle.style.display = "block";
    update();
    return false;
  } else {
    warningText = null;
    errMessage.innerHTML = null;
    errWarningTitle.style.display = "none";
  }
  if (Title == localStorage.getItem("itemsJson").match(Title)) {
    warningText = "Title is same";
    errMessage.innerHTML = warningText;
    errWarningTitle.style.display = "block";
    update();
    return false;
  } else {
    warningText = null;
    errMessage.innerHTML = null;
    errWarningTitle.style.display = "none";
  }

  if (Description.length <= 15) {
    warningText = "Please Enter a valid Description at least of 15 words";
    errMessage.innerHTML = warningText;
    errWarningDescription.style.display = "block";
    update();
    return false;
  } else {
    warningText = null;
    errWarningDescription.style.display = "none";
    errMessage.innerHTML = null;
  }
  if (Description.length >= 35) {
    warningText = "maximum limit of words in Description is 35";
    errWarningDescription.style.display = "block";
    errMessage.innerHTML = warningText;
    update();
    return false;
  } else {
    warningText = null;
    errWarningDescription.style.display = "none";
    errMessage.innerHTML = null;
  }
  if (
    Title !== localStorage.getItem("itemsJson").match(Title) ||
    (Description !== localStorage.getItem("itemsJson").match(Description) &&
      Title.length > 1 &&
      Description.length > 15 &&
      Title.length >= 10)
  ) {
    warningText = null;
    warningText = null;
    errMessage.innerHTML = null;
    errMessage.innerHTML = null;
    errWarningTitle.style.display = "none";
    errWarningDescription.style.display = "none";
    add.addEventListener("click", getAndUpdate());
    update();
    return false;
  }
  update();
}

let hamburger = document.getElementById("hamBurger");
let navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
});

document.querySelectorAll(".NavBtns").forEach((button) =>
  button.addEventListener("click", () => {
    hamburger.classList.remove("acive");
    navbar.classList.remove("active");
  })
);
