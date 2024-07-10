const plants = [
    {
        "id": 1,
        "name": "Rose",
        "category": "Flower",
        "image": "https://nurserylive.com/cdn/shop/products/nurserylive-damascus-rose-scented-rose-any-color-plant_253x253.jpg?v=1634217615",
        "price": 200,
        "description": "Damascus rose, Scented rose"
    },
    {
        "id": 2,
        "name": "Hibiscus",
        "category": "Outdoor",
        "image": "https://nurserylive.com/cdn/shop/products/nurserylive-damascus-rose-scented-rose-any-color-plant_253x253.jpg?v=1634217615",
        "price": 160,
        "description": "Hibiscuse Plant"
    },
    {
        "id": 3,
        "name": "Red Rose",
        "category": "Indoor",
        "image": "https://nurserylive.com/cdn/shop/products/nurserylive-damascus-rose-scented-rose-any-color-plant_253x253.jpg?v=1634217615",
        "price": 230,
        "description": "Beautiful red rose plant with awesome fregnance"
    }
]

const getHealth = (req, res) => {
    res.json({
        success: true,
        message: "server is running",
        data: null
    })
}

const postPlant = (req, res) => {
    const { name, category, image, price, description } = req.body

    if(!name){
        res.json({
            success: false,
            data: null,
            message: "Name cannot be empty"
        })
    }

    if(!category){
        res.json({
            success: false,
            data: null,
            message: "Category cannot be empty"
        })
    }

    if(!image){
        res.json({
            success: false,
            data: null,
            message: "Image is required"
        })
    }

    if(!price){
        res.json({
            success: false,
            data: null,
            message: "Price should be mentioned"
        })
    }

    if(!description){
        res.json({
            success: false,
            data: null,
            message: "Description cannot be empty"
        })
    }

    const randomId = Math.round(Math.random() * 10000)

    const newPlant = {
        id: randomId,
        name: name,
        category: category,
        image: image,
        price: price,
        description: description
    }

    plants.push(newPlant)

    res.json({
        success: true,
        message: "New plant added successfully",
        data: newPlant
    })
}

const getPlants = (req, res)=>{
    res.json({
        success: true,
        data: plants,
        message: "all plants fetches successfully"
    })
}

const getPlantID = (req, res)=>{
    const {id} = req.params

    const plant = plants.find((p)=>p.id == id )
        /*{
        if(p.id == id){
            return true
        }
        else{
            return false
        }
    }*/

    res.json({
        success: plant ? true : false ,
        data: plant || null,
        message: plant ? "Plant fetched successfully" : "plant not found"
    })
}

const putPlantID = (req, res)=>{
    const { name, category, image, price, description } = req.body

    const {id} = req.params

    let index = -1

    plants.forEach((plant, i)=>{
        if(plant.id == id){
            index = i
        }
    })

    const newObj = {
        id,
        name,
        category,
        image,
        price,
        description
    }

    if(index == -1){
        return res.json({
            success: false,
            message: `Plant not found for id ${id}`,
            data: null
        })
    }
    else{
        plants[index] = newObj

        return res.json({
            success: true,
            message: "plant updated successfully",
            data: newObj
        })
    }
}

const deletePlantID = (req, res)=>{

    const {id} = req.params

    let index = -1

    plants.forEach((plant, i)=>{
        if(plant.id==id){
            index = i
        }
    })

    if(index==-1){
        return res,json({
            success: false,
            message: `plant not found with id ${id}`
        })
    }

    plants.splice(index, 1)
    
    res.json({
        success: true,
        message: "plant deleted successfully",
        data: null
    })
}

const handlePageNotFound = (req, res)=>{
    res.send(
        `<div style="text-align: center;">
        <h1>404 Not Found</h1>
        </div>`
    )
}

export {
    getHealth,
    postPlant,
    getPlants,
    getPlantID,
    putPlantID,
    deletePlantID,
    handlePageNotFound
}