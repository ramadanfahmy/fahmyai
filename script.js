async function gen(){

 let k=document.getElementById("kw").value;
 if(!k) return alert("Enter keyword");

 let res=document.getElementById("res");
 res.innerHTML="Loading...";

 try{

   let r=await fetch("https://fahmyai.onrender.com/generate", {...})
     method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify({keyword:k})
   });

names = names.slice(0,5);
   res.innerHTML="";

   names.forEach(n=>{
     let d=n+".com";

     res.innerHTML+=`
     <div class="card">
       <h3>${d}</h3>
       <button onclick="navigator.clipboard.writeText('${d}')">Copy</button>
       <a href="https://www.namecheap.com/domains/registration/results/?domain=${d}&aff=YOUR_ID" target="_blank">
       <button>Buy</button></a>
     </div>`;
   });

 }catch{
   res.innerHTML="Error";
 }
}
