let h1 = document.createElement("h1");
h1.innerText="Add Your Tasks";
h1.id="h1";
document.body.appendChild(h1);

let div = document.createElement("div");

let input = document.createElement("input");
input.placeholder="Enter Your Task";
div.appendChild(input);

let btn = document.createElement("button");
btn.innerText="Add";
div.appendChild(btn);


document.body.appendChild(div);
