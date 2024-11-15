let container = document.querySelector(".container");
let addNewWindow = document.querySelector(".addNewWindow");
let bool = false;
async function getİtems() {
  let result = await fetch(
    "https://acb-api.algoritmika.org/api/transaction"
  ).then((res) => res.json());
  for (let i = 0; i < result.length; i++) {
    let newProduct = document.createElement("div");
    newProduct.classList.add("item");
    newProduct.innerHTML = `
        <div class="info">
            <span>FROM</span><input class="from" type="text" value="${result[i].from}" readonly> 
            <span>TO</span><input class="to" type="text" value="${result[i].to}" readonly>
            <span>AMOUNT</span><input class="amount" type="text" value="${result[i].amount}" readonly>
            <p class="id">${result[i].id}</p>
            </div>
            <div class="editButton" onclick="edit(this)">EDIT</div>
            <div class="saveButton" onclick="save(this)">SAVE</div>
            <div class="deleteButton" onclick="sil(this)">DELETE</div>
            `;
    container.appendChild(newProduct);
  }
}
getİtems();

async function sil(element) {
    if(confirm("Are you sure to delete this transaction cart?")){
  let idElement = element.parentElement; // item
  let id = idElement.querySelector(".id").innerHTML;

  try {
    await fetch(`https://acb-api.algoritmika.org/api/transaction/${id}`, {
      method: "DELETE",
    });

    container.innerHTML = ``;
    await getİtems();
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}
}

function edit(element) {
  let e = element.parentElement; //item
  let from = e.querySelector(".from");
  let to = e.querySelector(".to");
  let amount = e.querySelector(".amount");
  from.removeAttribute("readonly");
  to.removeAttribute("readonly");
  amount.removeAttribute("readonly");
}

async function save(element) {
  let e = element.parentElement; // item
  let from = e.querySelector(".from");
  let to = e.querySelector(".to");
  let amount = e.querySelector(".amount");

  from.setAttribute("readonly", true);
  to.setAttribute("readonly", true);
  amount.setAttribute("readonly", true);

  let ID = e.querySelector(".id").innerHTML;
  const info = {
    from: from.value,
    to: to.value,
    amount: amount.value,
    id: ID,
  };

  try {
    await fetch(`https://acb-api.algoritmika.org/api/transaction/${ID}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });

    container.innerHTML = ``;
    await getİtems();
  } catch (error) {
    console.error("Error updating item:", error);
  }
}

function AddNew() {
  bool = !bool;
  if (bool == true) {
    addNewWindow.style.display = "flex";
  } else {
    addNewWindow.style.display = "none";
  }
}

async function Add() {
  let from = addNewWindow.querySelector("#from");
  let to = addNewWindow.querySelector("#to");
  let amount = addNewWindow.querySelector("#amount");

  const info = {
    from: from.value,
    to: to.value,
    amount: amount.value,
  };

  try {
    await fetch("https://acb-api.algoritmika.org/api/transaction", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });

    container.innerHTML = ``;
    await getİtems();

    from.value = "";
    to.value = "";
    amount.value = "";
  } catch (error) {
    console.error("Error adding new item:", error);
  }
}
