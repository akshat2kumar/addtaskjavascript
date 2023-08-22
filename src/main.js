//array=[]

let array=JSON.parse(localStorage.getItem("data")) || [];
const Name = document.getElementById("name1");
const Email = document.getElementById("email1");
const Age = document.getElementById("age1");
const Text = document.getElementById("text1");
let listData =document.getElementById("list");
function addToArray() {
  if(Name.value===''|| Email.value===''|| Age.value==='' ||Text.value===''){
    alert("Complete the details");
  }
  else{
    array.push({
      Name:Name.value,
      Email:Email.value,
      Age:Age.value,
      Text:Text.value
    })
    console.log(array);
    Name.value=""
    Email.value=""
    Age.value=""
    Text.value=""
  }
localStorage.setItem("data",JSON.stringify(array))
}



let listing=()=>{
  if(array.length===0){
     console.log(array);
     listData.innerHTML=
     ` <div clas="empty">
       <h2>DATA</h2>
       <h3>Data is empty<h3>
       <a href="index.html">
         <button > Return to Home></button>
       </a> 
       </div>
     `
    }

  else{
    listData.innerHTML=array.map((x , index)=>{
      console.log(x);
      let{Name, Email,Age,Text}= x;
      return ` <ul class="listing-data">
      
       <li> Name:${Name}</li>
       <li> Email:${Email}</li>
       <li> Age:${Age}</li>
       <li> Text:${Text}</li>
       <i  onclick="removeItem(${index})" class="bi bi-x-lg"></i>
       
      </ul>
    `;

    }).join('');
    console.log("ok")
   }

}
function removeItem(index) {
  array.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem("data", JSON.stringify(array));
  listing();
}
listing();

