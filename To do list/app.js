let h1 = document.createElement("h1");
h1.innerText="Add Your Tasks";
h1.id="h1";
document.body.appendChild(h1);

let div1 = document.createElement("div");
div1.id="div1";

let input = document.createElement("input");
input.placeholder="Enter Your Task";
div1.appendChild(input);

let btn = document.createElement("button");
btn.innerText="Add";
div1.appendChild(btn)
document.body.appendChild(div1);

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

});






let div2 = document.createElement("div");
div2.id="div2";



let h3 = document.createElement("h3"); 
h3.innerText="Your Today's Tasks";
h3.id="h3";
div2.appendChild(h3);

let ulist = document.createElement("ul"); 
div2.appendChild(ulist);



document.body.appendChild(div2);