import styles from '../../css/products/produtcs.module.css';
import { useSelector,useDispatch } from 'react-redux';
import * as dataApi from '../../api/data';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getAllProducts } from '../../context/AllProducts';
import { addProductToEcart } from '../../context/Ecart';
import { removeUserData } from '../../api/util';
import { useEffect } from 'react';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { id } = useParams();;
  const products = useSelector((state) => state.allproducts.allProductsData)
  const allPharms = useSelector((state) => state.allpharms.allPharmsData)
  const user = useSelector((state) => state.user.userData)
  let pharmacyOwnerId = undefined;

  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  
  useEffect(() => {
    window.scrollTo(0,0)
  },[onAddProductSubmit])

  if(user.email === undefined){

    removeUserData(); 
    return(
      <Navigate to="/login" replace={true}/>
    );
  }

  if(allPharms !== undefined){
    for (const pharm of allPharms) {
      if(pharm.id === id){
        pharmacyOwnerId = pharm.userApp.id
        document.getElementById('pharmacyName').textContent= "избрана Аптека: " + pharm.name;

      }
    }

  }

  async function buyProduct(productId){
    const quantity = document.getElementById(productId).children[2].children[1].textContent;
    const totalPrice = document.getElementById(productId).children[3].textContent.split(" ")[0];
    
    if(Number(quantity) === 0){
      return;
    }

    for (const product of products) {
      if(product.id === productId){
        const productToPurchase={
          productId,
          product,
          quantity,
          totalPrice
        }
        dispatch(addProductToEcart(productToPurchase))
      } 
    }

    document.getElementById(productId).children[2].children[1].textContent = '0';
    document.getElementById(productId).children[3].textContent = '00.00 лв';

    navigate('/cart')
    
  }

  function addQuantity(price,productId){
    const quantityElement = document.getElementById(productId).children[2].children[1];
    const quantity = String(Number(quantityElement.textContent) + 1);
    quantityElement.textContent=quantity

    const total = document.getElementById(productId).children[3];
    const totalSum = String((price * Number(quantityElement.textContent)).toFixed(2));
    total.textContent=totalSum + ' лв';
    
  }
  function removeQuantity(price,productId){
    const quantityElement = document.getElementById(productId).children[2].children[1];
    if(Number(quantityElement.textContent) === 0){
      return
    }
    const qu = String(Number(quantityElement.textContent) - 1);
    quantityElement.textContent=qu
    
    const total = document.getElementById(productId).children[3];
    const totalSum = String(price * Number(quantityElement.textContent));
    total.textContent=totalSum + ' лв';
  }

  async function deleteProduct(e){
    e.preventDefault();

    await dataApi.deleteProduct(e.currentTarget.parentElement.parentElement.id)
    const resp = await dataApi.getAllProductsByPharmacyId(id);
    dispatch(getAllProducts(resp))

  }
 
  async function onAddProductSubmit(e){
    e.preventDefault();

    const form = new FormData(e.currentTarget)
    const name = form.get('name').trim().toLowerCase();
    const price = form.get('price').trim();
    const pictureUrl = form.get('pictureUrl').trim();
    const data = {
      name,
      price,
      pictureUrl
    }
    await dataApi.saveProduct(id,data);
    const resp = await dataApi.getAllProductsByPharmacyId(id);
    dispatch(getAllProducts(resp))
    document.getElementsByTagName('form')[0].reset();
  }

  async function updateProductsPage(e){
    e.preventDefault();
    document.getElementById('refresh__button').style.color = '';
    document.getElementById('refresh__button').textContent = '';
    const resp = await dataApi.getAllProductsByPharmacyId(id);
    dispatch(getAllProducts(resp))
  }

  function popUpblock(id,name,price){

    if(document.getElementById('update__form__container').style.display === 'block'){
      document.getElementById('update__form__container').style.display = 'none' 

    }else{
      document.getElementById('product__id__update').textContent = id;
      document.getElementById('nameUpdate').value = name;
      document.getElementById('priceUpdate').value = price;
      document.getElementById('name__product').textContent = 'Въведи нови данни за : ' + name;
      document.getElementById('update__form__container').style.display = 'block';
    }
  }

  async function saveChangesOfProductUpdate(e){
    e.preventDefault();

    const id = e.currentTarget.parentElement.children[0].textContent;
    const name = e.currentTarget.parentElement.children[2].children[0].value;
    const price = e.currentTarget.parentElement.children[3].children[0].value;

    const productUpdate = {
      id,
      name,
      price
    };

    document.getElementById('update__form__container').style.display = 'none';
    document.getElementById('refresh__button').style.color = '#6adb6a';
    document.getElementById('refresh__button').textContent = 'обнови';
    await dataApi.updateProduct(productUpdate);
    
  }

  return (
    <div>
        <section className={styles.ecart__container__info}>
          <section className={styles.ecart__container__products}>
          {pharmacyOwnerId === user.id 
          ? <i onClick={updateProductsPage} id="refresh__button" className="fa-solid fa-arrows-rotate"></i>
          : null}
            <section className={styles.titles}>
              <span>Продукт</span>  
              <span>Цена</span>  
              <span>Количество</span>  
              <span>Общо</span>  
            </section>
            
            <div id="update__form__container" className={styles.update__container}>
              <from className={styles.from__update}>
                <div className={styles.product__id} id="product__id__update"></div>
                <p className={styles.name__product_style} id="name__product"></p>
                <div>
                  <input className={styles.input}  type="text" placeholder="Име" name="name" id="nameUpdate" required/><span className={styles.span__update}>име</span>
                </div>
                <div>
                  <input className={styles.input}  type="text" placeholder="Цена на продукта" name="price" id="priceUpdate" required/><span className={styles.span__update}>цена</span>
                </div>
                <br/>
                <button type="submit" className={styles['add--pharmacy--btn']} onClick={saveChangesOfProductUpdate}>Запази Променте</button>
              </from>
            </div>
            <section className={styles.product}>
              {products.length !== 0 || products !== null 
              ? products.map(product => 
              <section className={styles.product__price} id={product.id} key={product.id}>
                <div className={styles.product_image_container}>
                  <h2>{product.name}</h2>
                  <img src={product.pictureUrl} alt="..."></img>
                  <div>#{product.id}</div>
                  {pharmacyOwnerId !== user.id 
                  ? <button className={styles.toLogin__btn} onClick={() => buyProduct(product.id)}>Купи</button>
                  :null
                  }
                </div>
                <div>
                  $ {product.price}
                </div>
                <div className={styles.quantity__control}>
                  <div className={styles["quantity__control--btn"]} onClick={() => removeQuantity(product.price,product.id)}>-</div>
                  <div className={styles.quantity}>0</div>
                  <div className={styles["quantity__control--btn"]} onClick={() => addQuantity(product.price,product.id)}>+</div>
                </div>
                <div id="total" className={styles.total}>
                   00.00 лв
                </div>
                {user.id === product.pharmacy.userApp.id 
                ? <div>
                    <button className={styles.update__product__btn} onClick={() => popUpblock(product.id,product.name, product.price)}>промени</button>
                    <button className={styles.delete__product__btn} onClick={deleteProduct}>изтрий</button>
                  </div>
                : null}
              </section>) : null}
            </section>
            {products.length === 0
            ? 
              <div className={styles.noProducts}>Няма налични продукти в Аптеката</div>
            : null}
            {pharmacyOwnerId === user.id
            ? <section className={styles.form__container}>
                <p>Добави Продукт</p>
                  <form onSubmit={onAddProductSubmit}>
                    <div>
                      <input className={styles.input}  type="text" placeholder="Име" name="name" id="name" required/>
                    </div>
                    <div>
                      <input className={styles.input}  type="text" placeholder="Цена на продукта" name="price" id="price" required/>
                    </div>
                    <div>
                      <input className={styles.input}  type="text" placeholder="Линк към снимката на продукта" name="pictureUrl" id="pictureUrl" required/>
                    </div>
                    <button type="submit" className={styles['add--pharmacy--btn']}>Запази Продукт</button>
                  </form>
              </section>
            : null}
           
          </section>
          </section>
    </div>
  )
}

export default Products