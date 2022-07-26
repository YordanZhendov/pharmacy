import * as api from './api.js';

// const barberApp = 'http://localhost:8081';
const barberApp = 'https://pharmacy-be.herokuapp.com';

export async function savePharmacy(data,id){
    return await api.post(barberApp + `/pharmacy/add/${id}`,data)
}
export async function saveProduct(id,data){
    return await api.post(barberApp + `/product/add/${id}`,data)
}
export async function updateProduct(data){
    return await api.put(barberApp + `/update/product`,data)
}
export async function getAllPharmaciesByUserId(id){
    return await api.get(barberApp + `/pharmacy/${id}`)
}
export async function getAllPharms(){
    return await api.get(barberApp + `/pharmacy/all`)
}
export async function getAllProductsByPharmacyId(id){
    return await api.get(barberApp + `/products/all/${id}`)
}
export async function deletePharmacy(id){
    return await api.del(barberApp + `/pharmacy/delete/${id}`)
}
export async function deleteProduct(id){
    return await api.del(barberApp + `/product/delete/${id}`)
}

export const imageData=[
    {
        image: "https://bizmonthly.com/wp-content/uploads/2017/12/pills-red-and-white-_88599355_M.jpg"
    },
    {
        image: "https://media.istockphoto.com/photos/prescription-drugs-picture-id481780310?k=20&m=481780310&s=612x612&w=0&h=0yhIkxUHSCOEnyHx3ZzGIRoMq7DtgxxfLonhLLG77Po="
    },
   
]