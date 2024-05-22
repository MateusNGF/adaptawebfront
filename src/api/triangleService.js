import axios from "axios"

const url = `${process.env.REACT_APP_API_URI}/triangle/classify`

async function classificationTriangles(sideA, sideB, sideC) {
    try {
        const { data } = await axios.post(url, { sideA, sideB, sideC })
        return data
    } catch (e) {
        throw new Error(e.response.data.message)
    }
}

export {
    classificationTriangles
}