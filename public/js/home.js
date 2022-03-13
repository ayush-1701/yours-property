const getFeaturedProperty=()=>{
    return fetch('/get-property',{
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({all: 'all'})
    }).then(res=>res.json()).then(data=>{
            return data;
        })
}


// const type = document.querySelector('.type')||null;
// const search = document.querySelector('.search')||null;
// const location = document.querySelector('.location')||null;



getFeaturedProperty().then(props => {
    
let test1 = document.getElementById('property-carousel')
  

  
  for(let i = 1; i<=3; i++){
      let slide = "img/slide"+i+".jpg";
      let url =
      props[i].imageUrls == undefined
        ? "img/no image.png"
        : props[i].imageUrls[0] == null
        ? "img/no image.png"
        : props[i].imageUrls[0] == ""
        ? "img/no image.png"
        : props[i].imageUrls[0];
    test1.innerHTML += `
    
    <div class="carousel-item-b flex" style="width: 350px;height: 300px; display:inline-block;margin-left:1rem">
            <div class="card-box-a card-shadow">
              <div class="img-box-a">
                <img src="${slide}" alt="" class="img-a img-fluid" />
              </div>
              <div class="card-overlay">
                <div class="card-overlay-a-content">
                  <div class="card-header-a">
                    <h2 class="card-title-a">
                    ${props[i].zipCode} <br />
                    ${props[i].name}
                    </h2>
                  </div>
                  <div class="card-body-a">
                    <div class="price-box d-flex">
                      <span class="price-a">Price | Rs ${props[i].sellPrice}</span>
                    </div>
                    <a href="/single-property/${props[i].id}" class="link-a"
                      >Click here to view
                      <span class="ion-ios-arrow-forward"></span>
                    </a>
                  </div>
                  <div class="card-footer-a">
                    <ul class="card-info d-flex justify-content-around">
                      <li>
                        <h4 class="card-info-title">Area</h4>
                        <span
                          >${props[i].carpetArea}ft
                          <sup>2</sup>
                        </span>
                      </li>
                      <li>
                        <h4 class="card-info-title">Type</h4>
                        <span>${props[i].type}</span>
                      </li>
                      <li>
                        <h4 class="card-info-title">City</h4>
                        <span>${props[i].city}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
      ` 
  } 
})
    //  implemented by Shubham
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const submitBtn = document.querySelector('#submit-feedback');
const loader=document.querySelector('.loader')||null;

          submitBtn.addEventListener('click', () => {

            if (email != null && message != null) {
              let data = {
                email: email.value,
                message: message.value
              }
             if(loader!=null)
        loader.style.display='block';

              fetch('/feedbackUserform', {
                method: "post",
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify(data)
              }).then(res => res.json()).then(data => {
            if(data.alert){
              if(loader!=null)
            loader.style.display='none';
                showAlert(data.alert)
            }
           
              }).catch(e => {
                showAlert(e)
              })
             

            }
          })