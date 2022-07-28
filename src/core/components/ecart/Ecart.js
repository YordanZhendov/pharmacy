
import styles from '../../css/ecart/ecart.module.css'
import {Link, Navigate} from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux"
import { removeUserData } from '../../api/util';
import { useEffect } from 'react';
import { removeProductFromEcart } from '../../context/Ecart';
import {clearEcart} from '../../context/Ecart'

function Ecart() {
  
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.userData)
  const productOfUser = useSelector((state) => state.ecart.ecartProducts)
  
  useEffect(()=>{
    window.scrollTo(0,0)
    
    const totalSumToPay = document.getElementById('totalSum');
    let totalSumOfOrder = 0;

    for (const product of productOfUser) {
      totalSumOfOrder += Number(product.totalPrice)
    }
    
    if(productOfUser.length === 0 && totalSumToPay !== null){
      totalSumToPay.textContent= 0
      return
    }
    if(totalSumToPay !== null){
      totalSumToPay.textContent= String(totalSumOfOrder.toFixed(2));
    }
    
    
  },[removeProductFromEcart()])
  
  if(user.email === undefined){

    removeUserData(); 
    return(
      <Navigate to="/login" replace={true}/>
    );
  }

  async function buyProducts(e){
    e.preventDefault();
    if(!document.getElementById('check__terms').checked){
      return;
    };
   
    if(productOfUser.length !== 0){
      dispatch(clearEcart())
      const successPurchase = document.createElement('div',{});
      successPurchase.innerText = "Поръчката е успешно направена!";
      successPurchase.style.padding = "15px";
      successPurchase.style.fontSize = "18px";
      successPurchase.style.color = "green";
      document.getElementById('totalSection').appendChild(successPurchase);
    }
  }

  return (
    <div>
      <section className={styles.ecart__container}>
        <section className={styles.ecart__container__info}>
          <section className={styles.ecart__container__products}>
            <section className={styles.titles}>
              <span>Продукт</span>  
              <span>Количество</span>  
              <span>Общо</span>  
            </section>
            {productOfUser.length === 0 
            ? <div id="message" className={styles.noProducts}>няма избрани продукти</div>
            : null}
            {productOfUser !== null 
            ? productOfUser.map(productOfPurchase => 
                <section key={productOfPurchase.product.id} className={styles.product}>
                  <section className={styles.product__price}>
                    <div className={styles.product__image__container}>
                      <button className={styles.buttonDelete} onClick={() => dispatch(removeProductFromEcart(productOfPurchase.product.id))}>
                          <i className="fa-solid fa-circle-xmark"></i>
                      </button>                      
                      <img src={productOfPurchase.product.pictureUrl} alt="..."></img>
                      <h2 className={styles.name__product__ecart}>{productOfPurchase.product.name}</h2>
                      <div>#В333449СВ00323с</div>
                    </div>
                    <div className={styles.quantity__control}>
                      <div className={styles.quantity}>{productOfPurchase.quantity}</div>
                    </div>
                    <div className={styles.total}>
                      {productOfPurchase.totalPrice} лв
                    </div>
                  </section>
              </section>)
            : null}
            
          </section>
          <section id="totalSection" className={styles.ecart__container__price}>
            <div className={styles.divider}></div>
            <div className={styles.price__total}>Общо в кошницата: <span id="totalSum" className={styles.total}>0.00</span>лв</div>
            <p>
              <input id="check__terms" type="checkbox" name="redTerms" defaultChecked/>Съгласявам се! <Link to="/terms-conditios" className={styles.terms}> Условия и разпоредби</Link>.
            </p>
            <button className={styles.checkout} onClick={buyProducts}>
              <a href="https://www.paypal.com/us/signin" target="_blank" rel="noreferrer"> 
                  Плащане <i className="fa-solid fa-money-bill-1"></i>
              </a>
            </button>
          </section>
        </section>
      </section>
    </div>
  )
}

export default Ecart