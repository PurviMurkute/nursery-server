import Plant from './../models/Plant.js'

const getHealth = (req, res) => {
    res.json({
        success: true,
        message: "server is running",
        data: null
    })
}

const postPlant = async (req, res) => {
    const {
        name,
        category,
        image,
        price,
        description
    } = req.body

    const newPlant = new Plant({
        name: name,
        category: category,
        image: image,
        price: price,
        description: description
    })

    const savedPlant = await newPlant.save();

    /*if(!name){
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

    plants.push(newPlant)*/

    res.json({
        success: true,
        message: "New plant added successfully",
        data: savedPlant
    })
}

const getPlants = async (req, res) => {

    const allPlants = await Plant.find().sort({updatedAt: -1})
    res.json({
        success: true,
        data: allPlants,
        message: "all plants fetches successfully"
    })
}

const getPlantID = async (req, res) => {
    const { id } = req.params

    const plant = await Plant.findById(id)


    res.json({
        success: plant ? true : false,
        data: plant || null,
        message: plant ? "Plant fetched successfully" : "plant not found"
    })
}

const putPlantID = async (req, res) => {
    const {
        name,
        category,
        image,
        price,
        description
    } = req.body

    const { id } = req.params

    await Plant.updateOne({ _id: id }, {
        $set: {
            name: name,
            category: category,
            image: image,
            price: price,
            description: description
        }
    })

    const updatedPlant = await Plant.findById(id)

    res.json({
        success: true,
        message: "Plant updated successfully",
        data: updatedPlant
    })

    /*let index = -1

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
    }*/
}

const deletePlantID = async (req, res) => {

    const { id } = req.params

    await Plant.deleteOne({
        _id: id
    })

    /*let index = -1

    plants.forEach((plant, i) => {
        if (plant.id == id) {
            index = i
        }
    })

    if (index == -1) {
        return res, json({
            success: false,
            message: `plant not found with id ${id}`
        })
    }

    plants.splice(index, 1)*/

    res.json({
        success: true,
        message: "plant deleted successfully",
        data: null
    })
}

const handlePageNotFound = (req, res) => {
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