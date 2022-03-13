    //  implemented by Shubham

 let user = JSON.parse(sessionStorage.user || null);
const loader=document.querySelector('.loader')||null;

let propertyId=null;
if(location.pathname!='/single-property'){
    propertyId=decodeURI(location.pathname.split('/').pop());
}
const getSinglePropety=()=>{
    return fetch('/get-property',{
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({id: propertyId })
    }).then(res=>res.json()).then(data=>{
            return data;
        })
}
function contactBtn(email){
  
}
getSinglePropety().then(props => {
  const propertyImages = document.querySelectorAll(".property-images img"); // selecting all image thumbs
const propertyImageSlide = document.querySelector(".image-slider"); // seclecting image slider element

let activeImageSlide = 0; // default slider image

propertyImages.forEach((item, i) => { // loopinh through each image thumb
    item.addEventListener('click', () => { // adding click event to each image thumbnail
        propertyImages[activeImageSlide].classList.remove('active'); // removing active class from current image thumb
        item.classList.add('active'); // adding active class to the current or clicked image thumb
        propertyImageSlide.style.backgroundImage = `url('${item.src}')`; // setting up image slider's background image
        activeImageSlide = i; // updating the image slider variable to track current thumb
    })
})
propertyImages.forEach((img,i)=>{
        if(props.imageUrls[i]){
            img.src=props.imageUrls[i];
        }
        else{
            img.style.display='none';
        }
    })
    propertyImages[0].click();
    
  let imgUrl_1 = props.imageUrls==undefined?'../img/no image.png':props.imageUrls[0]==null?'../img/no image.png':props.imageUrls[0]==""?'../img/no image.png':props.imageUrls[0];
  let imgUrl_2 = props.imageUrls==undefined?'../img/no image.png':props.imageUrls[1]==null?'../img/no image.png':props.imageUrls[1]==""?'../img/no image.png':props.imageUrls[1];
  let imgUrl_3 = props.imageUrls==undefined?'../img/no image.png':props.imageUrls[2]==null?'../img/no image.png':props.imageUrls[2]==""?'../img/no image.png':props.imageUrls[2];
    document.getElementById('propertyName').innerHTML=`${props.name}`; 
    document.getElementById('propertyName-1').innerHTML=`${props.name}`; 
    document.getElementById('propertyCity-1').innerHTML=`${props.city}`; 
    document.getElementById('prop-img-1').src=imgUrl_1; 
    document.getElementById('prop-img-2').src=imgUrl_2; 
    document.getElementById('prop-img-3').src=imgUrl_3; 
    document.getElementById('propertySellPrice').innerHTML=`₹${props.sellPrice}`; 
    document.getElementById('propertyDes').innerHTML=`${props.des}`;

    document.getElementById('propertyAddress').innerHTML=`${props.address}`;

    document.getElementById('propertyBuildArea').innerHTML=`${props.builtUpArea}`;

    document.getElementById('propCararea').innerHTML=`${props.carpetArea}`;

    document.getElementById('propType').innerHTML=`${props.type}`;
    document.getElementById('propertyCity-2').innerHTML=`${props.city}`;

    document.getElementById('propType').innerHTML=`${props.type}`;
    document.getElementById('contactBtn').addEventListener('click',(e)=>{
      
      e.preventDefault();
        
      let contactModal = document.getElementById(`dynamicModal`);
  if(user==null){
    contactModal.innerHTML=`<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Please login to contact </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <i style="color: red;">You need to sign in first to contact the seller*<br></i><br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
            <a href="/login" class="btn btn-success">Login</a>
          </div>
        </div>
      </div>
    </div>`;
    $('#loginModal').modal("toggle");

  }
  else if(!user.isSubscribe){
    contactModal.innerHTML=` <div class="modal fade" id="subsciberModal" tabindex="-1" role="dialog" aria-labelledby="subModal"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="subModal">Please Subscribe first to contact Seller</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <i style="color: red;">You need to subscribe first to contact the seller*<br></i><br>
            <!-- form for card details -->
            <!-- <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Recipient:</label>
                <input type="text" class="form-control" id="recipient-name">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Message:</label>
                <textarea class="form-control" id="message-text"></textarea>
              </div>
            </form> -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Later</button>
            <a href="/subscribeUser" class="btn btn-success">Subscribe Now</a>
          </div>
        </div>
      </div>
    </div>`;
    $('#subsciberModal').modal("toggle");

  }
  else{
    loader.style.display="block";
    fetch('/contact-property',{
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email:props.email,id:propertyId,selfEmail:user.email })
    }).then(res=>res.json()).then(data=>{
          //  console.log(data.email) 
       loader.style.display='none'; 
    contactModal.innerHTML=`
    <div class="modal fade" id="sellerDetailsModal" tabindex="-1" role="dialog" aria-labelledby="sellerModal"
              aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="sellerModal">Seller Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <i style="color: green;">Seller Details:<br> Name: ${data.name} <br>Email: ${data.email}<br> Number: ${data.mobile}<br></i><br>
                    <!-- form for card details -->
                    <!-- <form>
                      
                    </form> -->
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
                    
                  </div>
                </div>
              </div>
            </div>
    `;
  $('#sellerDetailsModal').modal("toggle");
  })
  
  }
        

    });
})
