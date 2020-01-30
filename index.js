var addButton = document.getElementById("add");
var showButton = document.getElementById("show");
var searchButton = document.getElementById("search");
var resetButton = document.getElementById("reset");
var inputTask = document.getElementById("new-task");
var dlButton = document.getElementById("dline");
var deadline = document.querySelector(".deadline");
var unfinishedTasks = document.getElementById("unfinished-tasks");
var completedTasks = document.getElementById("completed-tasks");
var tasksContainer = document.getElementById("tasksContainer");

function createNewElement(task, taskCtgr, finished, taskDeadline) {
  var listItem = document.createElement("li");
  var checkbox = document.createElement("button");

  if (finished) {
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
  } else {
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML =
      "<i class='material-icons'>check_box_outline_blank</i>";
  }

  var label = document.createElement("label");
  label.innerText = task;

  var input = document.createElement("input");
  input.type = "text";
  input.style.visibility = "hidden";

  var ctgr = document.createElement("label");
  ctgr.innerText = taskCtgr;

  var dl = document.createElement("label");
  dl.innerText = taskDeadline;

  var editButton = document.createElement("button");
  editButton.className = "material-icons edit";
  editButton.innerHTML = "<i class='material-icons'>edit</i>";

  var deleteButton = document.createElement("button");
  deleteButton.className = "material-icons delete";
  deleteButton.innerHTML = "<i class='material-icons'>delete</i>";

  listItem.appendChild(checkbox);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  listItem.appendChild(label);
  listItem.appendChild(ctgr);
  listItem.appendChild(dl);
  listItem.appendChild(input);

  return listItem;
}

function showByCtgr() {
  var selectCtgr = document.getElementById("selectCtgr2");
  var ctgr = selectCtgr.options[selectCtgr.selectedIndex].text;

  //если хотим посмотреть по категории
  if (ctgr != "all tasks") {
    for (var i = 0; i < data.unfinishedTasks.length; i++) {
      var ul = document.getElementById("unfinished-tasks");
      var items = ul.getElementsByTagName("li");
      if (data.unfinishedTasks[i].ctgr != ctgr) {
        items[i].style.visibility = "hidden";
      } else {
        items[i].style.visibility = "visible";
      }
    }
    for (var i = 0; i < data.completedTasks.length; i++) {
      var ul = document.getElementById("completed-tasks");
      var items = ul.getElementsByTagName("li");
      if (data.completedTasks[i].ctgr != ctgr) {
        items[i].style.visibility = "hidden";
      } else {
        items[i].style.visibility = "visible";
      }
    }
  } else {
    //хотим посмотреть все дела
    for (var i = 0; i < data.unfinishedTasks.length; i++) {
      var ul = document.getElementById("unfinished-tasks");
      var items = ul.getElementsByTagName("li");
      items[i].style.visibility = "visible";
    }

    for (var i = 0; i < data.completedTasks.length; i++) {
      var ul = document.getElementById("completed-tasks");
      var items = ul.getElementsByTagName("li");
      items[i].style.visibility = "visible";
    }
  }
}
showButton.onclick = showByCtgr;

//дописать
function showByDeadline() {
  var now = new Date();

  var day = document.getElementById("selectdl").value;
  var dayLeft;
  if (day == "tomorrow") dayLeft = 1;
  if (day == "week") dayLeft = 7;

  if (day != "all tasks") {
    for (var i = 0; i < data.unfinishedTasks.length; i++) {
      var ul = document.getElementById("unfinished-tasks");
      var items = ul.getElementsByTagName("li");

      if (data.unfinishedTasks[i].taskDeadline - now == 1) {
        items[i].style.visibility = "hidden";
      } else {
        items[i].style.visibility = "visible";
      }
    }
    for (var i = 0; i < data.completedTasks.length; i++) {
      var ul = document.getElementById("completed-tasks");
      var items = ul.getElementsByTagName("li");
      if (data.completedTasks[i].taskDeadline != day) {
        items[i].style.visibility = "hidden";
      } else {
        items[i].style.visibility = "visible";
      }
    }
  } else {
    //хотим посмотреть все дела
    for (var i = 0; i < data.unfinishedTasks.length; i++) {
      var ul = document.getElementById("unfinished-tasks");
      var items = ul.getElementsByTagName("li");
      items[i].style.visibility = "visible";
    }

    for (var i = 0; i < data.completedTasks.length; i++) {
      var ul = document.getElementById("completed-tasks");
      var items = ul.getElementsByTagName("li");
      items[i].style.visibility = "visible";
    }
  }
}
dlButton.onclick = showByDeadline;

function searchByName() {
  var searchTask = document.getElementById("search-task").value;

  if (searchTask != "") {
    for (var i = 0; i < data.unfinishedTasks.length; i++) {
      var ul = document.getElementById("unfinished-tasks");
      var items = ul.getElementsByTagName("li");
      if (data.unfinishedTasks[i].name.includes(searchTask)) {
        items[i].style.visibility = "visible";
      } else {
        items[i].style.visibility = "hidden";
      }
    }

    for (var i = 0; i < data.completedTasks.length; i++) {
      var ul = document.getElementById("completed-tasks");
      var items = ul.getElementsByTagName("li");
      if (data.completedTasks[i].name.includes(searchTask)) {
        items[i].style.visibility = "visible";
      } else {
        items[i].style.visibility = "hidden";
      }
    }
  }
}
searchButton.onclick = searchByName;

function resetSearch() {
  for (var i = 0; i < data.unfinishedTasks.length; i++) {
    var ul = document.getElementById("unfinished-tasks");
    var items = ul.getElementsByTagName("li");
    items[i].style.visibility = "visible";
  }

  for (var i = 0; i < data.completedTasks.length; i++) {
    var ul = document.getElementById("completed-tasks");
    var items = ul.getElementsByTagName("li");
    items[i].style.visibility = "visible";
  }

  var searchTaskInput = document.getElementById("search-task");
  searchTaskInput.value = "";
}
resetButton.onclick = resetSearch;

function addTask() {
  var selectCtgr = document.getElementById("selectCtgr");
  var taskCtgr = selectCtgr.options[selectCtgr.selectedIndex].text;

  if (inputTask.value) {
    var listItem = createNewElement(
      inputTask.value,
      taskCtgr,
      false,
      deadline.value
    );
    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
    inputTask.value = "";
  }
  save();
}
addButton.onclick = addTask;

function deleteTask() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
  save();
}

function editTask() {
  var editButton = this;
  var listItem = this.parentNode;
  var label = listItem.querySelector("label");
  var input = listItem.querySelector("input[type=text]");
  input.style.visibility = "visible";

  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = input.value;
    editButton.className = "material-icons edit";
    editButton.innerHTML = "<i class='material-icons'>edit</i>";
    save();
    input.style.visibility = "hidden";
  } else {
    input.value = label.innerText;
    input.style.visibility = "visible";
    editButton.className = "material-icons edit";
    editButton.innerHTML = "<i class='material-icons'>save</i>";
  }
  listItem.classList.toggle("editMode");
}

function finishTask() {
  var listItem = this.parentNode;
  var checkbox = listItem.querySelector("button.checkbox");
  checkbox.className = "material-icons checkbox";
  checkbox.innerHTML = "<i class='material-icons'>check_box</i>";

  completedTasks.appendChild(listItem);
  bindTaskEvents(listItem, unfinishTask);
  save();
}

function unfinishTask() {
  var listItem = this.parentNode;
  var checkbox = listItem.querySelector("button.checkbox");
  checkbox.className = "material-icons checkbox";
  checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";

  unfinishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, finishTask);
  save();
}

function bindTaskEvents(listItem, checkboxEvent) {
  var checkbox = listItem.querySelector("button.checkbox");
  var editButton = listItem.querySelector("button.edit");
  var deleteButton = listItem.querySelector("button.delete");

  checkbox.onclick = checkboxEvent;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
}

function save() {
  var unfinishedTasksArr = [];
  var elem = {};

  for (var i = 0; i < unfinishedTasks.children.length; i++) {
    elem = {};
    elem.name = unfinishedTasks.children[i].getElementsByTagName(
      "label"
    )[0].innerText;
    elem.ctgr = unfinishedTasks.children[i].getElementsByTagName(
      "label"
    )[1].innerText;
    elem.taskDeadline = unfinishedTasks.children[i].getElementsByTagName(
      "label"
    )[2].innerText;
    unfinishedTasksArr.push(elem);
  }

  var completedTasksArr = [];
  for (var i = 0; i < completedTasks.children.length; i++) {
    elem = {};
    elem.name = completedTasks.children[i].getElementsByTagName(
      "label"
    )[0].innerText;
    elem.ctgr = completedTasks.children[i].getElementsByTagName(
      "label"
    )[1].innerText;
    elem.taskDeadline = completedTasks.children[i].getElementsByTagName(
      "label"
    )[2].innerText;
    completedTasksArr.push(elem);
  }

  localStorage.removeItem("todo");
  localStorage.setItem(
    "todo",
    JSON.stringify({
      unfinishedTasks: unfinishedTasksArr,
      completedTasks: completedTasksArr
    })
  );
}

function load() {
  return JSON.parse(localStorage.getItem("todo"));
}

var data = load();

for (var i = 0; i < data.unfinishedTasks.length; i++) {
  var listItem = createNewElement(
    data.unfinishedTasks[i].name,
    data.unfinishedTasks[i].ctgr,
    false,
    data.unfinishedTasks[i].taskDeadline
  );
  unfinishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, finishTask);
}

for (var i = 0; i < data.completedTasks.length; i++) {
  var listItem = createNewElement(
    data.completedTasks[i].name,
    data.completedTasks[i].ctgr,
    true,
    data.completedTasks[i].taskDeadline
  );
  completedTasks.appendChild(listItem);
  bindTaskEvents(listItem, unfinishTask);
}
