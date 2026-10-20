if(localStorage.getItem('jwt')) window.location.href = '/form/animals'
//====================================================================

async function auth (e) {
    e.preventDefault()
    const errorNode = e.target.parentNode.querySelector('.div-error')
    errorNode.innerHTML = ''
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    try{
        const response = await fetch(`/${e.target.name}`,{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
        })
        const responseData = await response.text()
        if(response.status >= 300) errorNode.innerHTML = responseData
        else{
            localStorage.setItem('jwt',`Bearer ${responseData}`)
            window.location.href = '/form/animals'
        }
    }catch(e){ errorNode.innerHTML = e }
    e.target.reset()
}

//EVENTS
document.getElementById('login-form').onsubmit = auth

document.getElementById('register-form').onsubmit = auth

document.getElementById('a-register').addEventListener('click',(e)=>{
    e.preventDefault()
    document.getElementById('container-login-form').classList.toggle('div-hidden')
    document.getElementById('container-register-form').classList.toggle('div-hidden')
    document.getElementById('login-form').reset()
})

document.getElementById('a-login').addEventListener('click',(e)=>{
    e.preventDefault()
    document.getElementById('container-login-form').classList.toggle('div-hidden')
    document.getElementById('container-register-form').classList.toggle('div-hidden')
    document.getElementById('register-form').reset()
})