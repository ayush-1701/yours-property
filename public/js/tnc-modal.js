const createTnCAlert = () => {
    let loginmodal = document.querySelector(".modal");
  
    loginmodal.innerHTML=`
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Terms and Conditions </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <i style="color: black;">Welcome to <b>YoursProperty Name</b><br><br>

        These terms and conditions outline the rules and regulations for the use of Company Name's Website, located at 'yoursproperty.com'.<br><br>
        
        By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.*<br></i><br>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-success" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
  `;
  };
  
  createTnCAlert();