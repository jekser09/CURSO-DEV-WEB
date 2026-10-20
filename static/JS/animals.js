if(!localStorage.getItem('jwt') ) window.location.href = '/'
//===============================================

const animalsForm = document.getElementById('form-animals')
const animalsList = document.getElementById('animals-list')

const getAnimals = async () => {
    animalsList.innerHTML = ''
    try{
        const animals = await fetch('/animals',{
            headers: {
                'Authorization':localStorage.getItem('jwt') 
            }
        })
        if(animals.ok && animals.status === 200){
            const data = await animals.json()
            const fragment = document.createDocumentFragment()
            for(const dat of data){
                const item = document.createElement('li')
                item.innerHTML = `${dat.name} ${dat.type} <button data-id = ${dat._id}>Eliminar</button>`
                fragment.appendChild(item)
            }
            animalsList.appendChild(fragment)
        }
    }catch(error){ console.error(error) }
}

const delAnimals = async (id) => {
    try{
        const animals = await fetch(`/animals/${id}`,{
            method:'DELETE',
            headers: {
                'Authorization':localStorage.getItem('jwt') 
            }
        })
        if(animals.ok && animals.status === 204) return true
        else alert('No fue posible eliminar el animal')
    }catch(error){ console.error(error) }
    return false
}

animalsForm.onsubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(animalsForm)
    const data = Object.fromEntries(formData.entries())
    try{
        const response = await fetch('/animals',
            {
                method: 'POST',
                headers:{
                    'Authorization':localStorage.getItem('jwt'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        if(response.ok && response.status === 201){
            animalsForm.reset()
            await getAnimals()
        }else alert('No fue posible registrar el animal')
    }catch(error){ console.error(error) }
}

animalsList.addEventListener("click",async (e) => {
    const element = e.target
    if(element.matches('button') && element.dataset.id){
        if(await delAnimals(element.dataset.id)){
            element.parentNode.remove()
            alert('Animal eliminado exitosamente')
        }
    }
})

document.getElementById('a-logout').addEventListener('click',(e)=>{
    e.preventDefault()
    localStorage.removeItem('jwt')
    window.location.href = '/'
})

getAnimals()