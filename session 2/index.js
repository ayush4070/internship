// function clickFn(event) {
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('3 seconds have passed')
//         }, 3000)
//     }); // A promise can haave state of fullfilled/pending/rejected;

//     promise.then((val) => console.log(val))
//         .catch(err => console.log(err, 'err'))
//     console.log('clicked')
//     // insted of logging we will call a fetch API to www.google.com
//     fetch('http://localhost:8080/creator/login', {
//         method: 'POST',
//         body: {
//             email: 'email.com',
//             password: 'password'
//         }
//     })
//         .then(() => console.log('Google page oppened!'))
//         .catch((err) => console.log(err));

//     //login form => upon clicking it => function => fetchAPI req send
//     // => to http://localhost:8080/creator/login
//     // => attach login email and password field => return 404 not found; fine
//     // nav bar in HTML mobile friendly using css;
//     // push your code to github on a repo named internship;
//     // 11:05 - 4:30pm
// }

function clickFn(event) {
    event.preventDefault();
    const mainForm = document.getElementById('main-form');
    const email = mainForm['email'].value
    const password = mainForm['password'].value
    const cnfPassword = mainForm['cnfPassword'].value
    const name = mainForm['name'].value;
    const address = mainForm['address'].value
    const error = document.getElementById('error')

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        // error.append('E-Mail is not valid!')
        error.innerText = 'E-Mail is not valid!'
    } else {
        if (!password || !cnfPassword) {
            // error.append('Password is required!')
            error.innerText = 'Password is required!'
        } else {
            if (password !== cnfPassword) {
                // alert('password do not match!')
                // error.append('Password do not match!')
                error.innerText = 'Password do not match!'
            } else {
                error.innerText = '';
                fetch('http://localhost:8080/creator/signup',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                            name: name,
                            address: address
                        })
                    })
                    .then(data => data.json())
                    .then(data => {
                        if (data.status !== 200) {
                            error.innerText = data.data[0].msg;
                        }
                    })
                    .catch(err => console.log(err))
            }
        }
    }
}
