/*En Opera es donde mejor se visualiza, en Chrome y Edge se ve todo unos px a la izquierda x el tamaño de la scrollbar :) */ 
function Buscar(){
    let apikey= "5c54844d";
    let titulo= document.getElementById("titulo").value;
    let anio= document.getElementById("anio").value;
    let tipoBusqueda= document.getElementById("tipoBusqueda").value;
    document.getElementById("table").innerText="";


    axios({
        method: 'get',
        url:` http://www.omdbapi.com/?apikey=${apikey}&s=${titulo}&y=${anio}&type=${tipoBusqueda}`,
        
       }).then(response => {
        if(titulo===''){
            alert("Para poder efectuar la búsqueda es necesario que complete el campo del nombre del contenido");
        }

        let table= document.getElementById("table");
        let td1;
        let td2;
        let td3;
        let td4;
        let td5;
        response.data.Search.forEach(response=> {
            
            tr=document.createElement("tr");
            td1=document.createElement("td");
            td2=document.createElement("td");
            td3=document.createElement("td");
            td4=document.createElement("td");
            td5=document.createElement("td");
            td1.innerText=`${response.Title}`;
            td2.innerText=`${response.Year}`;
            td3.innerText=`${response.Type}`;
            td4.innerHTML=`<img src="${response.Poster}" class="img" alt="">`;
            td5.innerHTML=`<button type="button" class="btn-detalle" onclick="pelisDetalles('${response.imdbID}')"> Ver detalles</button>`;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            table.appendChild(tr);


        })


    


          
          console.log(response)

      });

} 

function pelisDetalles(id){
    axios({
        method: "get",
        url: "http://www.omdbapi.com/?apikey=5c54844d",
        params:{
            i:`${id}`
        }
    }).then(response=>{

    
    console.log(response);
    $("#InfoModal").modal("show");
    let bodyModal=document.getElementById("modalBody");
    bodyModal.innerHTML=`
    <li><div class="titleLi"> Nombre:</div>&ensp;${response.data.Title}</li>
    <li><div class="titleLi">tipo:</div>&ensp;${response.data.Type}</li>
    <li><div class="titleLi">Año:</div>&ensp;${response.data.Year}</li>
    <li><div class="titleLi">Fecha Estreno:</div>&ensp;${response.data.Released}</li>
    <li><div class="titleLi">Actores:</div>&ensp;${response.data.Actors}</li>
    <li><div class="titleLi">Director:</div>&ensp;${response.data.Director}</li>
    <li><div class="titleLi">Premios:</div>&ensp;${response.data.Awards}</li>
    <li><div class="titleLi">Genero:</div>&ensp;${response.data.Genre}</li>
    <li><div class="titleLi">Duración:</div>&ensp;${response.data.Runtime}</li>
    <li><div class="titleLi">Descripción:</div>&ensp;${response.data.Plot}</li>
    `
})
}
