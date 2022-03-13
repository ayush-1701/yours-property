 let user = JSON.parse(sessionStorage.user || null);
$(function() {
    var owner = $('#owner');
    var cardNumber = $('#cardNumber');
    var cardNumberField = $('#card-number-field');
    var CVV = $("#cvv");
    var mastercard = $("#mastercard");
    var confirmButton = $('#confirm-purchase');
    var visa = $("#visa");
    var amex = $("#amex");

    // Use the payform library to format and validate
    // the payment fields.

    cardNumber.payform('formatCardNumber');
    CVV.payform('formatCardCVC');


    cardNumber.keyup(function() {

        amex.removeClass('transparent');
        visa.removeClass('transparent');
        mastercard.removeClass('transparent');

        if ($.payform.validateCardNumber(cardNumber.val()) == false) {
            cardNumberField.addClass('has-error');
        } else {
            cardNumberField.removeClass('has-error');
            cardNumberField.addClass('has-success');
        }

        if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
            mastercard.addClass('transparent');
            amex.addClass('transparent');
        } else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
            mastercard.addClass('transparent');
            visa.addClass('transparent');
        } else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
            amex.addClass('transparent');
            visa.addClass('transparent');
        }
    });

    confirmButton.click(function(e) {
 let sessionUser = JSON.parse(sessionStorage.user || null);

        e.preventDefault();

        var isCardValid = $.payform.validateCardNumber(cardNumber.val());
        var isCvvValid = $.payform.validateCardCVC(CVV.val());

        if(owner.val().length < 5){
            showAlert("Incorrect Name");
        } else if (!isCardValid) {
            showAlert("Invalid card number");
        } else if (!isCvvValid) {
            showAlert("Incorrect CVV");
        } else {
            // Everything is correct. Add your form submission code here.
            fetch('/profile',{
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email :user.email,edit:true,isSubscribe:true})
    }).then(res=>res.json()).then(response=>{
        if(response.alert){
                showAlert(response.alert);}
                else if(response.isSubscribe){
                // user.isSeller=true;
                sessionUser.isSubscribe=response.isSubscribe;
                 sessionStorage.user=JSON.stringify(sessionUser)
                location.replace('/profile')
                //alert(response.isSubscribe)

            }
            
            else{

                location.replace('/profile')
            }
            });
        }
    });
});
