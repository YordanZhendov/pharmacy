import { useSelector,useDispatch} from 'react-redux';
import styles from '../../css/myprofile/myprofile.module.css';
import * as dataApi from '../../api/data';

import { getAllPharmacies } from '../../context/Pharmacy';
import { getAllPharms } from '../../context/AllPharms';
import { getAllProducts } from '../../context/AllProducts';

import { Navigate, useNavigate } from 'react-router-dom';
import {removeUserData} from '../../api/util';
import { useEffect } from 'react';


function Myprofile() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mydata = useSelector((state) => state.user.userData)
  const myPharmacies = useSelector((state) => state.pharmacy.pharmacyData)
  const productOfUser = useSelector((state) => state.ecart.ecartProducts)

  useEffect(() => {
    window.scrollTo(0,0)
  },[])

  if(mydata.email === undefined){

    removeUserData(); 
    return(
      <Navigate to="/login" replace={true}/>
    );
  }

  async function addProductsToPharm(e){
    e.preventDefault();
    const pharmId = e.currentTarget.parentElement.parentElement.id
    const resp = await dataApi.getAllProductsByPharmacyId(pharmId);
    dispatch(getAllProducts(resp))

    navigate(`/pharmacy/${pharmId}/products`)

  }

  async function deletePharmacy(e){
    e.preventDefault();
    await dataApi.deletePharmacy(e.currentTarget.parentElement.parentElement.id)
    const pharmacies =  await dataApi.getAllPharmaciesByUserId(mydata.id);
    const allPharms =  await dataApi.getAllPharms();
    dispatch(getAllPharmacies(pharmacies))
    dispatch(getAllPharms(allPharms))

    
  }

  async function onPharamcyAddSubmit(e){
    e.preventDefault();

        const form = new FormData(e.currentTarget)
        const email = form.get('email').trim().toLowerCase();
        const phoneNumber = form.get('phoneNumber').trim();
        const name = form.get('name').trim();
        const address = form.get('address').trim();
        const pictureUrl = form.get('pictureUrl').trim();
        const to = form.get('to').trim();
        const from = form.get('from').trim();

        const data = {
          email,
          phoneNumber,
          name,
          address,
          pictureUrl,
          to,
          from
        }
        await dataApi.savePharmacy(data,mydata.id)
        const pharmacies =  await dataApi.getAllPharmaciesByUserId(mydata.id);
        const allPharms =  await dataApi.getAllPharms();
        dispatch(getAllPharmacies(pharmacies))
        dispatch(getAllPharms(allPharms))
        document.getElementsByTagName('form')[0].reset();
      };

  return (
    <div>
      <section className={styles.creator_container}>
            <section className={styles.creator_info_container}>
                <article>
                    <div className={styles.creator_img_container}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30SfNCE6e-sM7qSa8Z9CwrktkRgrjbHKyeSh3VyZDrsXLDVW0uHVcjmeki6bBSwQnqWo&usqp=CAU" alt="creator_logo"/>
                    </div>
                    <p className={styles.name}>{mydata.firstName} {mydata.lastName}</p>
                    <p className={styles.creator_info}><i className="fa-solid fa-envelope"></i> {mydata.email}</p>
                    <p className={styles.creator_info}><i className="fa-solid fa-square-phone-flip"></i> {mydata.phoneNumber}</p>
                    <div className={styles.stars}>
                        <p className={styles.js}><i className="fa-solid fa-star"></i></p>           
                        <p className={styles.js}><i className="fa-solid fa-star"></i></p>           
                        <p className={styles.js}><i className="fa-solid fa-star"></i></p>           
                    </div>
                </article>
            </section>
            <section className={styles.info_container}>
                <article>
                    <section className={styles.current__orders}>
                      <h1>Продукти в кошницата</h1>
                      <section className={styles.orders__info__ecart}>
                        {productOfUser.lenght !== 0 
                        ? productOfUser.map(product => 
                            <div key={product.product.id}><i className="fa-solid fa-circle-check"></i>{product.product.name}</div>
                        )
                        :null}
                      </section>
                    </section>
                </article>
            </section>
      </section>
      <section className={styles.pharmacy__add__container}>
          <section className={styles.form__container}>
              <p>Добави Аптека</p>
              <form onSubmit={onPharamcyAddSubmit}>
                <div>
                  <input className={styles.input}  type="text" placeholder="Име" name="name" id="name" required/>
                </div>
                <div>
                  <input className={styles.input}  type="text" placeholder="Линк към снимката" name="pictureUrl" id="pictureUrl" required/>
                </div>
                <div>
                  <input className={styles.input}  type="text" placeholder="Адрес" name="address" id="address" required/>
                </div>
                <div>
                  <input className={styles.input}  type="text" placeholder="от" name="from" id="from" required/>
                </div>
                <div>
                  <input className={styles.input}  type="text" placeholder="до" name="to" id="to" required/>
                </div>
                <div>
                  <input className={styles.input}  type="text" placeholder="Имейл" name="email" id="email" required/>
                </div>
                <div>
                  <input className={styles.input}  type="text" placeholder="Телефонен номер" name="phoneNumber" id="phoneNumber" required/>
                </div>
                <button type="submit" className={styles['add--pharmacy--btn']}>Запази Аптека</button>
              </form>
          </section>
          <section className={styles.my__pharmacies}>
              
              {myPharmacies.length === 0
              ? <div className={styles.noProducts}>няма създадени аптеки</div> : <p>Моите Аптеки</p>}
              <ul>
                {myPharmacies !== null && myPharmacies !== String
                ? myPharmacies.map(pharmacy =>
                  <li key={pharmacy.id} id={pharmacy.id}>
                      <div className={styles.pharmacy__container_short}>
                        <div>
                            {pharmacy.name} 
                        </div>
                        <button className={styles.buttonDelete} onClick={deletePharmacy}>
                          <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                        <button className={styles.add__product__btn} onClick={addProductsToPharm}>
                          Добави продукт
                        </button>
                      </div>
                  </li>
                  )
                  :  null}
              </ul>
              
          </section>
      </section>
    </div>
  )
}

export default Myprofile