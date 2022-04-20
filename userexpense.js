
window.addEventListener('load', () => {
    getParticularUserExpenses();
    getExpenseFiles();
})

async function getParticularUserExpenses() {
    console.log("front end inside getParticularUserExpense function ")
    const token = localStorage.getItem('authToken');
    const res = await axios.get('http://localhost:3000/getParticularUserExpenses', { headers: { "Authorization": token } });
    console.log("particular user res >>> ", res);
    const tableId = document.getElementById('table');
    console.log("table >>> ", table);
    let count = 1;

    res.data.expenses.forEach((expense) => {

        let tablerow = '';

        if (count % 2 == 0) {
            tablerow = `<tr class="table-rows" style="background-color: lightyellow;">
        <td class="items">${expense.createdAt}</td>
        <td class="items">${expense.description}</td>
        <td class="items icon">${expense.category}</td>
        <td class="items">0</td>
        <td class="items">${expense.amount}</td>
      </tr> `;
        } else {
            tablerow = `<tr class="table-rows" style="background-color: lightgray;">
        <td class="items">${expense.createdAt}</td>
        <td class="items">${expense.description}</td>
        <td class="items icon">${expense.category}</td>
        <td class="items">0</td>
        <td class="items">${expense.amount}</td>
      </tr> `;
        }

        table.innerHTML += tablerow;
        count++;

    });

    // const tableid = document.getElementById('table');
    console.log("table >>> ", tableId);


}


async function verifyPremium() {
    // checkPremium
    console.log('leaderBoard button clicked')
    try {
        console.log('getting inside try block...')
        const token = localStorage.getItem('authToken');
        console.log('token >>>> ', token);
        const res = await axios.get("http://localhost:3000/checkPremium", { headers: { "Authorization": token } });
        console.log("response  >>> ", res);
        console.log("response data status >>> ", res.status);
        if (res.status === 200) {
            const res = await axios.get("http://localhost:3000/download", { headers: { "Authorization": token } });

            console.log("response from download backend >>> ", res);
            // location.href = res.data.url;
            getExpenseFiles();
        }
    }
    catch (err) {
        // console.log(err);
        alert("This feature available only for premium members");
    }

}


async function getExpenseFiles() {
    const list = document.getElementById("file-list");
    console.log('list >>> ', list);
    const token = localStorage.getItem('authToken');
    try {
        const res = await axios.get("http://localhost:3000/getexpensefile", { headers: { "Authorization": token } });
        res.data.files.forEach(file => {
            let tmp = `
            <li class="files">  <a href=${file.url}>${file.name} </a>&emsp;<span>${file.createdAt}</span></li> <br>
            `
            list.innerHTML += tmp;
        })
    } catch (err) {
        console.log(err);
    }
} 