import {useNavigate} from 'react-router-dom';
import  styles from '../../css/login/login.module.css';
import * as api from '../../api/api.js';
import * as dataApi from '../../api/data'; 
import {useDispatch} from 'react-redux'
import { login } from '../../context/User';
import {getAllPharmacies} from '../../context/Pharmacy';
import { useEffect } from 'react';

export default function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        window.scrollTo(0,0)
    },[])
    
    async function onRegisterSubmit(e){
        e.preventDefault();
        
        const form = new FormData(e.currentTarget)
        const email = form.get('email').trim().toLowerCase();
        const password = form.get('password').trim();

        if(email === '' || password === ''){
            window.alert('All Fields must be filled!')
            return;
        }

        const dateAfterRegistration =  await api.login(email,password);
        const pharmacies =  await dataApi.getAllPharmaciesByUserId(dateAfterRegistration.id);
       
        if(dateAfterRegistration !== undefined){
            dispatch(login(dateAfterRegistration))
            dispatch(getAllPharmacies(pharmacies))
            navigate('/')
        }else{
            navigate('/login')
        }

    };


    return (
        <main>
            <form onSubmit={onRegisterSubmit} className={styles.form}>
                <div className={styles.imgcontainer} >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOzyRxuCacyG9vtH_SV_r6u8LcuEiLvGx0N8SZrMyA-71lufvU8vTFt973kJ_wdqIvACE&usqp=CAU" alt="Avatar" className={styles.avatar}/>
                <span className={styles.enter}> ВХОД </span>
                </div>
                <div className={styles.container}>
            
                    <input autoFocus className={styles.input}  type="text" placeholder="Имейл" name="email" id="email" required/>

                    <input className={styles.input} type="password" placeholder="Парола" name="password" id="password" required pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'/>

                    <button type="submit" className={styles['register-btn']}>Влез</button>
                </div>
            </form>
        </main>
    );
};