
// App.js

// // app.js - logic for tasks.html
// // Topics used: variables, functions, arrays/objects, JSON, DOM, events,
// // forms (preventDefault + validation) and localStorage.

// // ---------- 1. Select the elements we need ----------
// const form = document.querySelector("#task-form");
// const taskInput = document.querySelector("#task-input");
// const prioritySelect = document.querySelector("#priority-select");
// const errorMessage = document.querySelector("#error");
// const list = document.querySelector("#task-list");
// const summary = document.querySelector("#summary");

// // ---------- 2. Load saved tasks (array of objects) ----------
// // Each task looks like: { id: 1699999999999, text: "Study JS", priority: "high", done: false }
// function loadTasks() {
//   try {
//     const saved = JSON.parse(localStorage.getItem("tasks"));
//     return Array.isArray(saved) ? saved : [];   // nothing saved yet -> empty list
//   } catch (err) {
//     return [];                                  // saved data is corrupted -> start fresh
//   }
// }

// let tasks = loadTasks();

// // ---------- 3. Save helper ----------
// function saveTasks() {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// // ---------- 4. Build one <li> for a task ----------
// function createTaskItem(task) {
//   const li = document.createElement("li");
//   li.className = "task" + (task.done ? " done" : "");
//   li.dataset.id = task.id;                // stored as data-id="..." in the HTML
//   li.dataset.priority = task.priority;

//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.id = "task-" + task.id;
//   checkbox.checked = task.done;

//   const label = document.createElement("label");
//   label.htmlFor = checkbox.id;
//   label.textContent = task.text;          // textContent keeps user text safe (no XSS)

//   const badge = document.createElement("span");
//   badge.className = "badge " + task.priority;
//   badge.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

//   const deleteBtn = document.createElement("button");
//   deleteBtn.type = "button";
//   deleteBtn.className = "delete";
//   deleteBtn.textContent = "Delete";
//   deleteBtn.setAttribute("aria-label", "Delete task: " + task.text);

//   li.append(checkbox, label, badge, deleteBtn);
//   return li;
// }

// // ---------- 5. Draw everything on the page ----------
// function render() {
//   list.innerHTML = "";                    // clear the old list

//   if (tasks.length === 0) {
//     const empty = document.createElement("li");
//     empty.className = "empty";
//     empty.textContent = "No tasks yet. Add your first task above.";
//     list.appendChild(empty);
//   } else {
//     tasks.forEach(task => list.appendChild(createTaskItem(task)));
//   }

//   const remaining = tasks.filter(task => !task.done).length;
//   summary.textContent = tasks.length === 0
//     ? "Nothing to do yet."
//     : remaining + " of " + tasks.length + " tasks left";
// }

// // ---------- 6. Add a task (form submit) ----------
// form.addEventListener("submit", (event) => {
//   event.preventDefault();                 // stop the page from reloading

//   const text = taskInput.value.trim();    // read + clean the value

//   if (text === "") {                      // validation
//     errorMessage.textContent = "Enter a task name before adding it.";
//     taskInput.focus();
//     return;
//   }

//   errorMessage.textContent = "";
//   tasks.push({
//     id: Date.now(),
//     text: text,
//     priority: prioritySelect.value,
//     done: false
//   });

//   saveTasks();
//   render();
//   form.reset();                           // clear the input, priority goes back to Medium
//   taskInput.focus();
// });

// // ---------- 7. Complete a task (event delegation: one listener on the list) ----------
// list.addEventListener("change", (event) => {
//   if (!event.target.matches("input[type='checkbox']")) return;

//   const id = Number(event.target.closest("li").dataset.id);
//   const task = tasks.find(t => t.id === id);
//   task.done = event.target.checked;

//   saveTasks();
//   render();
// });

// // ---------- 8. Delete a task (same delegation idea) ----------
// list.addEventListener("click", (event) => {
//   if (!event.target.matches("button.delete")) return;

//   const id = Number(event.target.closest("li").dataset.id);
//   tasks = tasks.filter(t => t.id !== id);   // keep every task except this one

//   saveTasks();
//   render();
// });

// // ---------- 9. Show saved tasks when the page loads ----------
