const forgotPass=()=>{
  let forgotpassemail = document.querySelector("#forgotPassEmail");
      if(loader!=null)
        loader.style.display='block';
  if(!forgotpassemail.value){
    showAlert('Enter Email')
  }
    fetch('/forgotUserPass', {
                method: "post",
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify({email:forgotpassemail.value})
              }).then(res => res.json()).then(data => {
            if(data.alert){
        loader.style.display='none';
              if(loader!=null)
            loader.style.display='none';
                showAlert(data.alert)
            }
           
              }).catch(e => {
                showAlert(e)
              })
}

const createForgotPassAlert = () => {
  let forgotpass = document.querySelector("#forgetPassModal");

  forgotpass.innerHTML = `
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Reset Password</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
        <input
            type="email"
            id="forgotPassEmail"
            class="form-control form-control-lg form-control-a"
            placeholder="Enter your email"
            data-rule="minlen:1"
        />
        <i style="color: red;">*</i><br><br>
        <label>Password will be displayed here<br></label>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
        <button onclick="forgotPass()" type="button" class="btn btn-outline-success" data-dismiss="modal" >Submit</button>
      </div>
    </div>
  </div>
  `;
};

createForgotPassAlert();
