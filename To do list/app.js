// Create header for the task list
let h1 = document.createElement("h1");
h1.innerText = "Add Your Tasks";
h1.id = "h1";
document.body.appendChild(h1);

// Create input area for new tasks
let div1 = document.createElement("div");
div1.id = "div1";

let input = document.createElement("input");
input.placeholder = "Enter Your Task";
div1.appendChild(input);

let btn = document.createElement("button");
btn.innerText = "Add";
div1.appendChild(btn);
document.body.appendChild(div1);

// Task count display
let taskCount = document.createElement("div");
taskCount.id = "taskCount";
taskCount.innerText = "Total Tasks: 0";
document.body.appendChild(taskCount);

btn.addEventListener("click", function () {
    let task = input.value;
    if (task === "") return;

    let li = document.createElement("li");
    li.innerText = task;
    ulist.appendChild(li);

    input.value = "";

    li.addEventListener("click", function () {
        li.classList.toggle("done");
    });

    // Update task count
    let currentCount = parseInt(taskCount.innerText.split(': ')[1]) + 1;
    taskCount.innerText = `Total Tasks: ${currentCount}`;
});

// Create the task list display area
let div2 = document.createElement("div");
div2.id = "div2";

let h3 = document.createElement("h3");
h3.innerText = "Your Today's Tasks";
h3.id = "h3";
div2.appendChild(h3);

let ulist = document.createElement("ul");
div2.appendChild(ulist);

document.body.appendChild(div2);