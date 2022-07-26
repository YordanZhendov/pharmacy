import {Link, useNavigate} from 'react-router-dom';
import  styles from '../../css/register/register.module.css';
import * as api from '../../api/api.js';
import { useEffect } from 'react';

export default function Register(){
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0,0)
    },[])
    
    async function onRegisterSubmit(e){
        e.preventDefault();
        
        const form = new FormData(e.currentTarget)
        const firstName = form.get('firstName').trim();
        const lastName = form.get('lastName').trim();
        const email = form.get('email').trim().toLowerCase();
        const password = form.get('password').trim();
        const repeatPassword = form.get('password-repeat').trim();
        const phoneNumber = form.get('phoneNumber').trim();
        const redTerms = Boolean(form.get('redTerms'));

        if(!redTerms){
            window.alert('Please read our terms before register!')
            return;
        }

        if(email === '' || password === ''  || repeatPassword === '' || phoneNumber === '' ){
            window.alert('All Fields must be filled!')
            return;
        }

        if(password !== repeatPassword ){
            window.alert('Passwords must be the same!')
            return;
        }

        const dateAfterRegistration =  await api.register(firstName,lastName,email,password,phoneNumber);
        if(dateAfterRegistration !== undefined){
            navigate('/login')
        }else{
            navigate('/register')
        }

    };


    return (
        <main>
            <form onSubmit={onRegisterSubmit} className={styles.form}>
                <div className={styles.imgcontainer} >
                <img src="https://www.infobusiness.bcci.bg/content/image2014/aznewnew.png" alt="Avatar" className={styles.avatar}/>
                </div>
                <div className={styles.container}>
                    
                    <input autoFocus  className={styles.input}  type="text" placeholder="Име" name="firstName" id="firstName" required/>

                    <input className={styles.input}  type="text" placeholder="Фамилия" name="lastName" id="lastName" required/>
                    
                    <input className={styles.input}  type="text" placeholder="Имейл" name="email" id="email" required/>
                    
                    <label> Най-малко 8 символа на латиница, най-малко 1 буква и 1 число</label>
                    <input className={styles.input} type="password" placeholder="Парола" name="password" id="password" required title="Моля спазете по-горе посочения формат." pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'/>

                    <input className={styles.input} type="password" placeholder="Повторете паролата" name="password-repeat" id="password-repeat" required title="Моля спазете по-горе посочения формат." pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'/>

                    <input className={styles.input} type="text" placeholder="Телефон" name="phoneNumber" id="phoneNumber" required/>
                
                    <p>При създаване на акаунта вие се съгласявате с нашите <Link to="/terms-conditios" className={styles.terms__conditions}>Условия и разпоредби</Link>.
                    <label htmlFor='redTerms'>
                        <input type="checkbox" name="redTerms" defaultChecked/>
                    </label></p>
                    
                    <button type="submit" className={styles['register-btn']}>Регистрирай се</button>
                </div>
            </form>
        </main>
    );
};