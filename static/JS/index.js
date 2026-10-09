const usersForm = document.getElementById('form-users')
const usersList = document.getElementById('users-list')

const getUsers = async () => {
    usersList.innerHTML = ''
    try{
        const users = await fetch('/users')
        if(users.ok && users.status === 200){
            
        }
    }catch(error){ console.error(error) }

}

usersForm.onsubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(usersForm)
    const data = Object.fromEntries(formData.entries())
    const response = await fetch('/users',
        {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
    console.log(response)
    usersForm.reset()
}

await getUsers()