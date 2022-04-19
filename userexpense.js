async function verifyPremium() {
    // checkPremium
    console.log('leaderBoard button clicked')
    // try {
        console.log('getting inside try block...')
        const token = localStorage.getItem('authToken');
        console.log('token >>>> ', token);
        const res = await axios.get("http://localhost:3000/checkPremium", { headers: { "Authorization": token } });
        console.log("response  >>> ", res);
        console.log("response data status >>> ", res.status);
        if (res.status === 200) {
            // location.href = './leaderBoard.html';
            alert("you're an premium user")
        }
    // }
    // catch (err) {
    //     // console.log(err);
    //     alert("This feature available only for premium members");
    // }

    // console.log("res.status for checkPremium >>>  ", res.status);
    // if (res.status !== 401) {

    // } else {

    // }
}