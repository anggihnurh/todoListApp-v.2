let todos = [];

const inputTodoDOM = document.getElementById("inputTodo");
const addTodoDOM = document.getElementById("addTodo");
const listTodoDOM = document.getElementById("listTodo");

const setLocalStorage = () =>
  localStorage.setItem("todos", JSON.stringify(todos));

const showTodo = () => {
  const getTodos = JSON.parse(localStorage.getItem("todos"));
  const classed = document.getElementById("titleTodo");
  if (getTodos !== null && getTodos.length !== 0) {
    todos = getTodos;
    classed.className = "todo-title-show";
  } else {
    classed.className = "todo-title-hidden";
  }

  listTodoDOM.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    let { todo, isComplete } = todos[i];
    listTodoDOM.innerHTML += `
    <li class="todo" >
      <div class="checklist">
        <table>
          <tr>
            <td><input ${isComplete &&
              "checked"} id="${i}" onclick=completeTodo(${i}) type="checkbox" class="checkbox" /></td>
            <td><p id=todo${i} style="text-decoration:${
      isComplete ? "line-through" : "none"
    }" >${todo}</p></td>
          </tr>
        </table>
      </div>

      <div>
        <strong id="menu${i}" class="menu" onclick="showMenu(${i})" >⋯</strong>
        <ul id="dropdownMenu${i}" class="hide">
          <li onclick="editTodo(${i})"><strong>✎</strong> Edit</li>
          <li onclick="deleteTodo(${i})"><strong>×</strong> Delete</li>
        </ul>
      </div>
    </li>`;
  }
};

const addTodo = () => {
  let data = inputTodoDOM.value;
  if (!data) {
    alert("Please insert your Todo first!");
  } else {
    todos.push({ todo: data, isComplete: false });
    inputTodoDOM.value = "";
    setLocalStorage();
    showTodo();
  }
};

const completeTodo = i => {
  todos[i].isComplete = !todos[i].isComplete;
  setLocalStorage();
  showTodo();
};

const showMenu = i => {
  let menus = document.getElementById("dropdownMenu" + i);
  let menu = document.getElementById("menu" + i);

  if (menus.className === "hide") {
    menus.className = "show";
    menu.style.right = "-4px";
  } else {
    menus.className = "hide";
    menu.style.right = "45px";
  }
};

const editTodo = i => {
  let { todo } = todos[i];
  inputTodoDOM.value = todo;
  addTodoDOM.innerHTML = "Save";
  addTodoDOM.onclick = () => {
    saveTodo(i);
  };
  setLocalStorage();
  showTodo();
};

const saveTodo = i => {
  let data = inputTodoDOM.value;
  todos.splice(i, 1, { todo: data, isComplete: todos[i].isComplete });
  inputTodoDOM.value = "";
  addTodoDOM.innerHTML = "Add";
  addTodoDOM.onclick = () => {
    addTodo();
  };
  setLocalStorage();
  showTodo();
};

const deleteTodo = i => {
  todos.splice(i, 1);
  setLocalStorage();
  showTodo();
};

showTodo();
