
function saveData()
{
    let name,email, phone, city , country;
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    id = document.getElementById("id").value;
    username = document.getElementById("username").value;

    let records=new Array();
    records = JSON.parse(localStorage.getItem("users"));
    if(records.some((v)=>{return v.email==email}))
    {
    alert("Email already exist");
    }
    else
    {
    records.unshift({
        name,
        email,
        phone,
        id,
        username,
    })
    
    localStorage.setItem("users",JSON.stringify(records));
    showData();
    }
    

}

function fetchuser(){
    let records= JSON.parse(localStorage.getItem("users"));
   let userinfo = fetch('https://jsonplaceholder.typicode.com/users');
   userinfo.then((response)=>{
        return response.json();
    }).then((data)=>{
        let records1=records.concat(data);
        console.log(records1);
        localStorage.setItem("users",JSON.stringify(records1));
        showData();
    }).catch((err)=>{
        console.log("ERROR"+err)
    });
 
}

function showData()
{
  document.getElementById("showUsers").innerHTML="";
  let records= JSON.parse(localStorage.getItem("users"));
  records.sort(function(a, b) {
    return parseFloat(b.id) - parseFloat(a.id) ;
});
  if(records)
  {
    
    for(let i=0 ; i<records.length ; i++)
    {
        let addlist=document.createElement('ul');
        // addlist.className="row";
        addlist.innerHTML='<h4>' +records[i].name+' details </h4><button type="button" onclick=remove('+records[i].id+') class="btn btn-default" style="float:right">Remove</button><li> Name : '+records[i].name+'</li><li> Email : '+records[i].email+'</li><li> Phone no.: '+records[i].phone+'</li><li> Id No.: '+records[i].id+'</li><li> UserName :'+records[i].username+'</li>';
        document.getElementById("showUsers").appendChild(addlist);
        
    }
    
  }
  
}

  function remove(idnum){
    
    let records =JSON.parse(localStorage.getItem("users"));
    let index = records.findIndex(({id})=> id == idnum);
    if (index > -1) {
        records.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(records));
        showData();
    }
    else
    {
        console.log("cant remove user info");
    }
    
  }

  function reset() {
    document.getElementById("form").reset();
 }

 