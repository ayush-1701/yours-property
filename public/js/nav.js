const createNav = () => {
  let nav = document.querySelector(".navbar");
   let user = JSON.parse(sessionStorage.user || null);
   let loc=location.pathname.split('.')[0];
  nav.innerHTML = `
  <div class="container">
  <button
    class="navbar-toggler collapsed"
    type="button"
    data-toggle="collapse"
    data-target="#navbarDefault"
    aria-controls="navbarDefault"
    aria-expanded="true"
    aria-label="Toggle navigation"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
  <a class="navbar-brand text-brand" href="#"
    >Yours<span class="color-b">Property</span></a
  >
  <div
    class="navbar-collapse collapse justify-content-center"
    id="navbarDefault"
  >
    <ul class="navbar-nav">
    ${user!=null?`<li class="nav-item">
          <a class="nav-link" href="/profile">Profile</a>
        </li>`:`<li class="nav-item">
        <a class="nav-link" href="/">Home</a>
      </li>`}
      
      <li class="nav-item">
        <a class="nav-link" href="/buy">Buy</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/sell">Sell</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/rent">Rent</a>
      </li>
      ${user!=null?loc==='/profile'?`<li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  My List
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item contacted-properties" href="">Contacted Properties</a>
                  ${user.isSeller?`<a class="dropdown-item sell-properties" href="">Posted Properties</a>`:''}
                  
                  ${user.isAdmin?`<a class="dropdown-item user" href="#">User Details</a>
                  <a class="dropdown-item property" href="#">Property Details</a>`:''}
                </div>
              </li>`:'':''}
    </ul>
  </div>
  ${user==null?`<button
    type="button"
    class="btn btn-link nav-search navbar-toggle-box-collapse d-md-block"
    data-toggle="collapse"
    data-target="#navbarTogglerDemo01"
    aria-expanded="false"
    onclick="window.location.href='/login'"
  >
    <span class="fa fa-sign-in" aria-hidden="true"></span>
  </button>
  <button
    type="button"
    class="btn btn-link nav-search navbar-toggle-box-collapse d-md-block"
    data-toggle="collapse"
    data-target="#navbarTogglerDemo01"
    aria-expanded="false"
    onclick="window.location.href='/signup'"
  >
   <span class="fa fa-address-book-o" aria-hidden="true"></span>
  </button>`:`<button
      type="button"
      class="btn btn-link nav-search navbar-toggle-box-collapse d-md-block"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo01"
      aria-expanded="false"
      id="logout-btn"
    >
    <span class="fa fa-sign-out" aria-hidden="true"></span>
    </button>`}
  
   
</div>
    `;
    //  implemented by Shubham
    if(user)
{document.querySelector('#logout-btn').addEventListener('click',()=>{
  fetch('/logout', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({'logout':true})
    }).then((res) => res.json())
        .then(response => {
            if(response.alert){
                showAlert(response.alert)
                 sessionStorage.clear()
            }
          else{
             sessionStorage.clear();
            location.replace('/login')
          }
          })
  
 
})}
};

createNav();
