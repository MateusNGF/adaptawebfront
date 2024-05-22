import axios from "axios"

const url = `${process.env.REACT_APP_API_URI}/triangle/classify`

async function classificationTriangles(ladoA, ladoB, ladoC) {
    try{
        const { data } =  await axios.post(url, {
            'sideA': ladoA,
            'sideB': ladoB,
            'sideC': ladoC
        })
        return data
    }catch(e){
        throw new Error(e.response.data.message)
    }
}

export  {
    classificationTriangles
}