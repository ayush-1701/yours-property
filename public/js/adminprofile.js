var entry = document.getElementById("addbtn");
var edit = document.querySelector(".editbtn");
var del = document.querySelector(".deletebtn");

var flag = 0;
if (flag == 0) {
  document.getElementById("data").innerHTML = ` <tr>
          <td><input type="text" class="form-control usname" required></input></td>
          <td><input type="email" class="form-control email" required></input></td>
          <td><input type="number" class="form-control phone" required></input></td>
          <td><input type="text" class="form-control seller" required></input></td>
          <td><input type="text" class="form-control subscribe" required></input></td>
          <td><input type="text" class="form-control admin" required></input></td>
          <td><button type="button" class="btn btn-success rounded" id="addbtn" 
          onClick="entrydata()">Add Entry</button></td></td>
        </tr>`;
  flag = 1;
}

//Add user
function entrydata() {
  var uname = document.querySelector(".usname");
  var email = document.querySelector(".email");
  var phone = document.querySelector(".phone");
  var seller = document.querySelector(".seller");
  var subscribe = document.querySelector(".subscribe");
  var admin = document.querySelector(".admin");

  if (
    uname.value === "" ||
    email.value === "" ||
    phone.value === "" ||
    seller.value === "" ||
    subscribe.value === "" ||
    admin.value === ""
  ) {
    showAlert("No Empty Fields Allowed");
  } else {
    // console.log(seller.value," ",admin.value," ",subscribe.value);
    if (
      seller.value === "true" ||
      subscribe.value === "true" ||
      admin.value === "true" ||
      seller.value === "false" ||
      subscribe.value === "false" ||
      admin.value === "false"
    ) {
      axios
        .post("/user-profile", {
          name: uname.value,
          email: email.value,
          mobile: phone.value,
          isSeller: stringToBool(seller.value),
          isSubscribe: stringToBool(subscribe.value),
          isAdmin: stringToBool(admin.value),
        })
        .then(function (response) {
          // console.log(response);
        });
      uname.value = "";
      email.value = "";
      phone.value = "";
      seller.value = "";
      subscribe.value = "";
      admin.value = "";
      showAlert("User Added Successfully!");
      
    } else {
      showAlert(
        "Please enter true or false for isSubscribe, isAdmin, isSeller"
      );
    }
  }
}

//read data from users table
async function jdata() {
  var arr = [];

  await fetch("/getuser").then(async (response) =>
    response
      .json()
      .then((data) => ({
        data: data,
        status: response.status,
      }))
      .then((res) => {
        arr = res.data;
        for (var i = 0; i < arr.length; i++) {
          document.getElementById(
            "data"
          ).innerHTML += `<tr><td>${arr[i].name}</td><td class="temail">${arr[i].email}</td><td>${arr[i].mobile}</td><td>${arr[i].isSeller}</td><td>${arr[i].isSubscribe}</td><td>${arr[i].isAdmin}</td><td class="action"><button type="button" class="btn btn-primary rounded editbtn">+</button><button type="button" class="btn btn-danger mx-2 deletebtn">-</button></td></tr>`;
        }
      })
  );
}

jdata();

// edit users data
let arr = [];
let arrd = [];
$(document).ready(function () {
  $("#myTable").on("click", ".editbtn", function () {
    {
      var r = $(this).parents("tr").find("td");

      $.each(r, function () {
        if (!$(this).hasClass("action")) $(this).prop("contenteditable", true);
      });
      $(this).toggle();
      $(this)
        .parents("td")
        .prepend('<button class="btn btn-success save">+</button>');
    }
  });

  $("#myTable").on("click", ".save", function () {
    {
      var r = $(this).parents("tr").find("td");

      $.each(r, function () {
        arr.push($(this).text());
        $(this).prop("contenteditable", false);
      });
      // console.log(arr);
      $(this).toggle();
      $(this).parents("td").find(".editbtn").toggle();

      axios.post("/update", arr).then((response) => {
        showAlert("Updated Successfully");
      });
    }
  });
  $("#myTable").on("click", ".deletebtn", function () {
    var r = $(this).parents("tr").find("td");
    $.each(r, function () {
      arrd.push($(this).text());
      $(this).prop("contenteditable", false);
    });
    // console.log(arrd);
    axios.post("/delete", arrd).then((response) => {
      showAlert("Deleted Successfully");
    });
  });
});

// fetch property
async function pdata() {
  var parr = [];
  await fetch("/getproperty").then((response) =>
    response
      .json()
      .then((data) => ({
        data: data,
        status: response.status,
      }))
      .then((res) => {
        parr = res.data;
        // console.log(parr);
        for (var i = 0; i < parr.length; i++) {
          document.getElementById("propdata").innerHTML += `
          <tr>
          <td>${parr[i].id}</td>
          
          <td>${parr[i].city}</td>
          <td>${parr[i].zipCode}</td>
          <td>${parr[i].type}</td>
          <td>${parr[i].builtUpArea}</td>
          <td>${parr[i].carpetArea}</td>
          <td>${parr[i].sellPrice}</td>
          <td>${parr[i].email}</td>
          <td class="action">
          <button type="button" class="btn btn-danger mx-2 deletebtn">Delete</button></td>
          </tr>`;
        }
      })
  );
}
pdata();

// edit & delete property
let parr = [];
let parrd = [];
$(document).ready(function () {
  // $("#propdata").on("click", ".editbtn", function () {
  //   {
  //     var r = $(this).parents("tr").find("td");

  //     $.each(r, function () {
  //       if (!$(this).hasClass("action")) $(this).prop("contenteditable", true);
  //     });
  //     $(this).toggle();
  //     $(this)
  //       .parents("td")
  //       .prepend('<button class="btn btn-success save">+</button>');
  //   }
  // });

  // $("#propdata").on("click", ".save", function () {
  //   {
  //     var r = $(this).parents("tr").find("td");

  //     $.each(r, function () {
  //       parr.push($(this).text());
  //       $(this).prop("contenteditable", false);
  //     });
  //     console.log(parr);
  //     $(this).toggle();
  //     $(this).parents("td").find(".editbtn").toggle();

  //     axios.post("/pupdate", parr).then((response) => {
  //       alert("Updated Successfully");
  //     });
  //   }
  // });

  $("#propdata").on("click", ".deletebtn", function () {
    var r = $(this).parents("tr").find("td");
    $.each(r, function () {
      parrd.push($(this).text());
      $(this).prop("contenteditable", false);
    });
    // console.log(parrd);
    axios.post("/pdelete", parrd).then((response) => {
      showAlert("Deleted Successfully");
    });
  });
});

function stringToBool(str) {
  return str === "true" ? true : false;
}
