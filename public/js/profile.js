
 let user = JSON.parse(sessionStorage.user || null);
// let loader = document.querySelector('.loader');

window.onload = () => {
    if(user!=null)
    {if (user.email==null) {
        location.replace('/login');
    }}
    else{
       location.replace('/login'); 
    }
}

const getUserDetails=()=>{
    return fetch('/profile',{
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email :user.email,edit:false})
    }).then(res=>res.json()).then(data=>{
            return data;
        })
}
const name = document.querySelector('.uname');
const email = document.querySelector('.uemail');
const number = document.querySelector('.umno');
const saveBtn = document.querySelector('.save');
getUserDetails().then(data=>{
    name.value=data.name;
    email.value=data.email;
    number.value=data.mobile;
})
saveBtn.addEventListener('click',(e)=>{
fetch('/profile',{
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email :user.email,edit:true,name:name.value,number:number.value})
    }).then(res=>res.json()).then(response=>{
        if(response.alert){
               showAlert(response.alert);
                
            }
        else    
        {location.reload()
            e.preventDefault();
    // document.getElementsByClassName('.uname').
    $('.uname').attr('readonly',true);
    $('.uemail').attr('readonly',true);
    $('.umno').attr('readonly',true);
  
    $('.save').attr('disabled',true);
    $('.edit').attr('disabled',false);}
        })
})
 $('.edit').click(function (e) {
    e.preventDefault();
    // document.getElementsByClassName('.uname').
    $('.uname').attr('readonly',false);
    $('.umno').attr('readonly',false);
    $('.save').attr('disabled',false);
    $('.edit').attr('disabled',true);
  });
  const getPropety=()=>{
    return fetch('/get-property',{
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email:user.email})
    }).then(res=>res.json()).then(data=>{
            return data;
        })
}
$('.details').hasClass('active')
	{
		$('.contacted-grid').hide();
		$('.sell-grid').hide();
	}
	$('.contacted-properties').click((e)=>{
		e.preventDefault();
		$('.details').hide();
    
		$('.contacted-grid').show();
	});
	$('.sell-properties').click((e)=>{
		e.preventDefault();
		$('.details').hide();
		$('.contacted-grid').hide();
		$('.sell-grid').show();

	});
    //  coded by Shubham
 const getconPropety=()=>{
    return fetch('/contactedprofile',{
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email:user.email})
    }).then(res=>res.json()).then(data=>{
            return data;
        })
}

  getPropety().then(props => {  
    let test1 = document.getElementById(`prop-grid-2`);
     if(props=="no property"){
test1.innerHTML=`<img src="../img/no-property.png" alt="" style="display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;">`;
}
else{ 

test1.innerHTML=`<div class="col-sm-12">
            <div class="grid-option">
              <form>
                <select class="custom-select">
                  <option selected>All</option>
                  <option value="1">New to Old</option>
                  <option value="2">For Rent</option>
                  <option value="3">For Sale</option>
                </select>
              </form>
            </div>
          </div>`;

  for(let i = 0; i<props.length; i++){
      let url=props[i].imageUrls==undefined?'img/no image.png':props[i].imageUrls[0]==null?'img/no image.png':props[i].imageUrls[0]==""?'img/no image.png':props[i].imageUrls[0];
    test1.innerHTML += `
    <div class="col-md-4">
      <div class="card-box-a card-shadow">
          <div class="img-box-a ">
          ${props[i].draft ?`<span class="tag">Draft</span>`:'' }
            <img src="${url}" alt="" class="img-a img-fluid property-thumb">
            
          </div>
          <div class="card-overlay">
          
            <div class="card-overlay-a-content">
             <button type="button" class="btn card-action-btn edit-btn" onclick = "location.href = '/sell/${props[i].id}'"><img src="img/edit.png" alt=""></button>
        <button type="button" class="btn card-action-btn delete-popup-btn" onclick="deletePopupModal('${props[i].id}')"><img src="img/delete.png" alt=""></button>
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
  }} 
})
 getconPropety().then(props => {  
let test1 = document.getElementById(`prop-grid-1`);
if(props=="no property"){
test1.innerHTML=`<img src="../img/no-property.png" alt="" style="display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;">`;
}
else{
let key=Object.keys(props);
test1.innerHTML=`<div class="col-sm-12">
            <div class="grid-option">
              <form>
                <select class="custom-select">
                  <option selected>All</option>
                  <option value="1">New to Old</option>
                  <option value="2">For Rent</option>
                  <option value="3">For Sale</option>
                </select>
              </form>
            </div>
          </div>`;

  key.forEach(i=>{
      let url=props[i].imageUrls==undefined?'img/no image.png':props[i].imageUrls[0]==null?'img/no image.png':props[i].imageUrls[0]==""?'img/no image.png':props[i].imageUrls[0];
    test1.innerHTML += `
    <div class="col-md-4">
      <div class="card-box-a card-shadow">
          <div class="img-box-a ">
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
  } );  } 
})

	
 
const deletePopupModal=(id)=>{
document.querySelector('#delete-modal').innerHTML=`  
<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">Warning </h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
          </div>
        <div class="modal-body">
          <p>Are you sure ? you want to delete this property<p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" onclick="deleteItem('${id}')">Delete</button>
        </div>
      </div>
      
    </div>
  </div>`;
  
$('#myModal').modal("toggle");
}
const deleteItem = (id) => {
    fetch('/delete-property',{
        method: 'post',
        headers: new Headers({'Content-Type' : 'application/json'}),
        body: JSON.stringify({id:id})
    }).then(res=>res.json()).then(data =>{
        if(data == 'success'){
            location.reload();
        }
        else{
            showAlert('Some error occured while deleting the property. Try Again');
        }
    })
}
