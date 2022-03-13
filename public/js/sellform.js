 // implemented by shubham
 let user = JSON.parse(sessionStorage.user || null);
 let loader = document.querySelector('.loader')||null;

window.onload = () => {
    if(user!=null)
    {if (user.email==null) {
        location.replace('/login');
    }}
    else{
       location.replace('/login'); 
    }
}

const sellingPrice = document.querySelector('#sell-price');
let uploadImages=document.querySelectorAll('.fileupload');
let imagePaths=[];

uploadImages.forEach((fileupload, index) => {
    fileupload.addEventListener('change', () => {
        const file = fileupload.files[0];
        let imageUrl;

        if (file.type.includes('image')) {
            // means user uploaded an image
            fetch('/get-imageurl').then(res => res.json())
                .then(url => {
                    fetch(url, {
                        method: 'PUT',
                        headers: new Headers({ 'Content-Type': 'multipart/form-data' }),
                        body: file
                    }).then(res => {
                        imageUrl = url.split("?")[0];
                        imagePaths[index] = imageUrl;
                        let label = document.querySelector(`label[for=${fileupload.id}]`);
                        label.style.backgroundImage = `url(${imageUrl})`;
                        let propertyImage = document.querySelector('.property-image');
                        propertyImage.style.backgroundImage = `url(${imageUrl})`;
                    })
                })
        } else {
            showAlert('upload image only');
        }
    })
})

const propertyName = document.querySelector('#propertyname');
const propertyAddress = document.querySelector('#propertyAddress');
const inputCity = document.querySelector('#inputCity');
const inputZip = document.querySelector('#inputZip');
const builtUpArea = document.querySelector('#builtUpArea');
const carpetArea = document.querySelector('#carpetArea');
const detailDes = document.querySelector('#detaildesc');
const downPayment = document.querySelector('#downPayment')||null;
const monthly = document.querySelector('#monthly')||null;

let apartType = ""; 
const addPropertyBtn = document.querySelector('#add-btn');
const saveDraftBtn = document.querySelector('#draft-btn');

const apartmenttype = () => {
    apartType="";
    const apartRadio = document.getElementsByName('apartRadio');
    apartRadio.forEach(item => {
        if (item.checked) {
            apartType=item.value;
        }
    })
}


const propertyData = () => {
    if(downPayment!=null){
        console.log('ji')
        data={
        name: propertyName.value,
        address:propertyAddress.value,
        city:inputCity.value,
        zipCode:inputZip.value,
        type: apartType,
        imageUrls:imagePaths,
        carpetArea:carpetArea.value,
        builtUpArea:builtUpArea.value,
        downPayment: downPayment.value,
        monthly: monthly.value,
        des: detailDes.value,
        email: user.email,
        isSeller:user.isSeller
        }
    }
     else{data = {
        name: propertyName.value,
        address:propertyAddress.value,
        city:inputCity.value,
        zipCode:inputZip.value,
        type: apartType,
        imageUrls:imagePaths,
        carpetArea:carpetArea.value,
        builtUpArea:builtUpArea.value,
        sellPrice: sellingPrice.value,
        des: detailDes.value,
        email: user.email,
        isSeller:user.isSeller
    }}
    return data
}
addPropertyBtn.addEventListener('click', () => {
    addPropertyBtn.disabled=true;
    apartmenttype(); 
        let data = propertyData();
        data.draft=false;
        if(propertyId){
            data.id=propertyId;
        }
        if(loader!=null)
        loader.style.display='block';
        if(downPayment!=null){
        sendData('/rent', data);
        }
        else
        sendData('/sell', data);

    addPropertyBtn.disabled=false;

    
})

saveDraftBtn.addEventListener('click', ()=>{
    apartmenttype();
    if(!propertyName.value.length){
       showAlert('enter property name');
    }
    else{
        let data=propertyData();
        data.draft=true;
        if(loader!=null)
        loader.style.display='block';
        if(propertyId){
            data.id=propertyId;
        }
       if(downPayment!=null){
        sendData('/rent', data);
        }
        else
        sendData('/sell', data);
    }
})
const setFormsData=(data)=>{
    propertyName.value=data.name;
    propertyAddress.value=data.address;
    detailDes.value=data.des;
    sellingPrice.value=data.sellPrice;
    inputCity.value=data.city;
    inputZip.value=data.zipCode;
    builtUpArea.value=data.builtUpArea;
    carpetArea.value=data.carpetArea;

    imagePaths=data.imageUrls;
    imagePaths.forEach((url, i)=>{
        let label = document.querySelector(`label[for=${uploadImages[i].id}]`);
        label.style.backgroundImage = `url(${url})`;
        let propertyImage = document.querySelector('.property-image');
        propertyImage.style.backgroundImage = `url(${url})`;
    });
    apartType=data.type;
    let radioButton =document.getElementsByName('apartRadio');
    radioButton.forEach(item=>{
        if(apartType.includes(item.value)){
            item.setAttribute('checked','');
        }
    });
}
function fetchPropertyData(){
    fetch('/get-property',{
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({id: propertyId })
    }).then(res=>res.json()).then(data=>{
            return data;
        }).then(data=>{
            setFormsData(data);
        })
}
let propertyId=null;
if(location.pathname!='/sell'&&location.pathname!='/rent'){
    propertyId=decodeURI(location.pathname.split('/').pop());
    fetchPropertyData();
}