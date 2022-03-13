// Code by Shubham
const getPropety=()=>{
    return fetch('/get-property',{
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({all: 'all'})
    }).then(res=>res.json()).then(data=>{
            return data;
        })
}


getPropety().then(props => {  
let test1 = document.getElementById('prop-grid')
  
  // console.log(props)
  
  for(let i = 0; i<props.length; i++){
      let url=props[i].imageUrls==undefined?'img/no image.png':props[i].imageUrls[0]==null?'img/no image.png':props[i].imageUrls[0]==""?'img/no image.png':props[i].imageUrls[0];

    test1.innerHTML += `
    <div class="col-md-4">
      <div class="card-box-a card-shadow">
          <div class="img-box-a">
            <img src="${url}" alt="" class="img-a img-fluid property-thumb">
          </div>
          <div class="card-overlay">
            <div class="card-overlay-a-content">
              <div class="card-header-a">
                <h2 class="card-title-a">
                  <a href="/single-property/${props[i].id}"> ${props[i].name}, ${props[i].zipCode} </a>
                </h2>
              </div>
              <div class="card-body-a">
                <div class="price-box d-flex">
                  <span class="price-a" >Price | ${props[i].sellPrice} </span>
                </div>
                <a href="/single-property/${props[i].id}" class="link-a">Click here to view
                  <span class="ion-ios-arrow-forward"></span>
                </a>
              </div>
              <div class="card-footer-a">
                <ul class="card-info d-flex justify-content-around">
                  <li>
                    <h4 class="card-info-title">Area</h4>
                    <span> ${props[i].carpetArea} ft
                      <sup>2</sup>
                    </span>
                  </li>
                  <li>
                    <h4 class="card-info-title">Type</h4>
                    <span> ${props[i].type} </span>
                  </li>
                  <li>
                    <h4 class="card-info-title">City</h4>
                    <span>${props[i].city} </span>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
    ` 
  } 
})