/*En Opera es donde mejor se visualiza, en Chrome y Edge se ve todo unos px a la izquierda x el tamaño de la scrollbar :) */ 
function Buscar(){
    let apikey= "5c54844d";
    let titulo= document.getElementById("titulo").value;
    let anio= document.getElementById("anio").value;
    let tipoBusqueda= document.getElementById("tipoBusqueda").value;
    document.getElementById("table").innerText="";


    axios({
        method: 'get',
        url:` https://www.omdbapi.com/?apikey=${apikey}&s=${titulo}&y=${anio}&type=${tipoBusqueda}`,
        
       }).then(response => {
        if(titulo===''){
            alert("Para poder efectuar la búsqueda es necesario que complete el campo del nombre del contenido");
        }

        let table= document.getElementById("table");
        let tr;
        let tdArr=[]
        response.data.Search.forEach(response=> {
            tr=document.createElement("tr");
            for(i=0; i<5; i++){
               
                tdArr[i]=document.createElement("td");
                switch(i){
                case 0: tdArr[i].innerText = `${response.Title}`; break;
                case 1: tdArr[i].innerText=`${response.Year}`; break;
                case 2: tdArr[i].innerText=`${response.Type}`; break;
                case 3: var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                if (vw <= 500) {
                    $(tdArr[i].innerText=`${response.imdbID}`).show()
                }
                else{
                    $(tdArr[i].innerHTML=`<img src="${response.Poster}" class="img" alt="">`).show() 
                };break;
                case 4: tdArr[i].innerHTML=`<button type="button" class="btn-detalle" onclick="pelisDetalles('${response.imdbID}')"> Ver detalles</button>`
                }
                tr.appendChild(tdArr[i]);
            }
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
