import styles from '../../css/pharmacies/pharmacies.module.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../context/AllProducts';
import * as dataApi from '../../api/data';
import { useEffect } from 'react';
import {getAllPharms} from '../../context/AllPharms';

function Pharmacies() {
  
const navigate = useNavigate();
const dispatch = useDispatch();
const mydata = useSelector((state) => state.user.userData)
const allPharms = useSelector((state) => state.allpharms.allPharmsData)

useEffect(() => {
  window.scrollTo(0,0)
  async function fetchData() {
    const allPharms =  await dataApi.getAllPharms();
    dispatch(getAllPharms(allPharms))
  }
  fetchData();
  const pharmName = document.getElementById('pharmacyName');
  if(pharmName !== null){
    pharmName.textContent= "избрана Аптека: няма";
  }

},[])

async function toProducts(e){

  if(mydata.email === undefined){
    <Navigate to="/login" replace={true}/>
  }
  
  const pharmID = e.currentTarget.id;
  const resp = await dataApi.getAllProductsByPharmacyId(pharmID);
  dispatch(getAllProducts(resp))
  
  navigate(`/pharmacy/${pharmID}/products`)
}

  return (
    <div>
      <section className={styles.creator_container}>
            <section className={styles.creator_info_container}>
                {allPharms !== null 
                ? allPharms.map(pharmacy => 
                    <article key={pharmacy.id} id={pharmacy.id} onClick={toProducts}>
                      <div className={styles.creator_img_container}>
                          <img src={pharmacy.pictureUrl} alt="https://image.shutterstock.com/image-vector/prohibition-sign-no-photography-260nw-209270626.jpg"/>
                      </div>
                      <section className={styles.article__info}>
                        <div className={styles.name}>{pharmacy.name}</div>
                        <div className={styles.creator_info}><i className="fa-solid fa-envelope"></i> {pharmacy.email}</div>
                        <div className={styles.creator_info}><i className="fa-solid fa-briefcase"></i> Отваря в: {pharmacy.from} ч.</div>
                        <div className={styles.creator_info}><i className="fa-solid fa-briefcase"></i> Затваря в: {pharmacy.to} ч.</div>
                        <div className={styles.creator_info}><i className="fa-solid fa-briefcase"></i> {pharmacy.address} </div>
                        <div className={styles.creator_info}><i className="fa-solid fa-briefcase"></i> {pharmacy.phoneNumber} </div>
                        <div className={styles.technologies}>
                            <div className={styles.pharmnacylogo}><i className="fa-solid fa-prescription-bottle-medical"></i></div>           
                        </div>
                      </section>
                  </article>)
                 : null}
                
            </section>
      </section>
    </div>
  )
}

export default Pharmacies