var isDark = false;
var isPremium = false;

window.addEventListener('load', (event) => {
    // event.preventDefault();
    console.log("page loaded....");

    if (isPremium) {
        document.getElementById('rzp-button').style.visibility = 'hidden';
    }

})


async function getPremiumMemberShip() {
    console.log("premium button clicked >> ");
    const token = localStorage.getItem('authToken');

    const response = await axios.get("http://localhost:3000/purchase/premiummembership", { headers: { "Authorization": token } });
    console.log('response for pur prem >> ', response);

    var options =
    {

        "key": response.data.key_id,
        "name": "To Activate Premium Account",
        "order_id": response.data.order.id,
        "prefill": {
            "name": "Test User",
            "email": "test.user@example.com",
            "contact": "8778648840"
        },
        "theme": {
            "color": "#3399cc"
        },

        "handler": function (response) {
            console.log("inside handler function >>> ");
            console.log('handler response fun >>> ', response);
            axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                orderId: options.order_id,
                paymentId: response.razorpay_payment_id,
            }, { headers: { "Authorization": token } }).then(() => {
                alert('You are a Premium User Now');
                window.location.reload();
            
                // location.href = "./homepage.html";
                // isPremium = true;

            }).catch(() => {
                alert('Something went wrong. Try Again!!!')
            })
        },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();

    rzp1.on('payment.failed', function (response) {
        // alert(response.error.code);
        // alert(response.error.description);

        if (confirm("Payment failed.Press ok to retry and cancel to quit")) {
            getPremiumMemberShip();
            // location.href = "./homepage.html";
            console.log("inside if function")


        } else {
            location.href = "./homepage.html";
            console.log("Inside else function");

        }
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
    });

}

function toggleMode() {

    isDark = !isDark;

    if (isDark) {
        console.log("Inside toggle mode...")
        const body = document.getElementsByTagName('body')[0];
        console.log('body >>>> ', body);
        body.style.background = 'black';
        body.sytle.color = 'white';
    } else {
        const body = document.getElementsByTagName('body')[0];
        console.log('body >>>> ', body);

        body.style.background = 'white';
        body.sytle.color = 'brown';
    }


}
