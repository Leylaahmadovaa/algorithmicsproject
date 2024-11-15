let container=document.querySelector(".container")
async function getİtems(){
    let result=await fetch('https://acb-api.algoritmika.org/api/transaction').then((res)=>res.json())
    console.log(result);
    for (let i = 0; i < result.length; i++) {
        let newProduct=document.createElement("div")
        newProduct.classList.add("item")
        newProduct.innerHTML=`
        <div class="info">
            <p>from: ${result[i].from}}</p>
            <p>to: ${result[i].to}}</p>
            <p>amount: ${result[i].amount}}</p>
            <p>id: ${result[i].id}</p>
            
        </div>
        <div class="editButton">edit</div>
        <div class="deleteButton">delete</div>
        `
        container.appendChild(newProduct)
        
    }
}
getİtems()
