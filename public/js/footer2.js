const createFoot2 = () => {
    let foot = document.querySelector(".section-footer2");

    foot.innerHTML=`<div class="socials-a">
    <ul class="list-inline">
      <li class="list-inline-item">
        <a href="#">
          <i class="fa fa-facebook" aria-hidden="true"></i>
        </a>
      </li>
      <li class="list-inline-item">
        <a href="#">
          <i class="fa fa-twitter" aria-hidden="true"></i>
        </a>
      </li>
      <li class="list-inline-item">
        <a href="#">
          <i class="fa fa-instagram" aria-hidden="true"></i>
        </a>
      </li>
      <li class="list-inline-item">
        <a href="#">
          <i class="fa fa-pinterest-p" aria-hidden="true"></i>
        </a>
      </li>
      <li class="list-inline-item">
        <a href="#">
          <i class="fa fa-dribbble" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="copyright-footer">
          <p class="copyright color-text-a">
            &copy; Copyright
            <span class="color-a">YoursProperty</span> All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  </div>`;
};

createFoot2();