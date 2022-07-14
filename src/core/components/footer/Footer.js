import styles from "../../css/footer/footer.module.css"


function Footer() {
  return (
    <footer>
            <ul>
                Социални Медий
                <li><i className="fa-brands fa-facebook"></i><a href="https://www.facebook.com"> Facebook </a></li>
                <li><i className="fa-brands fa-instagram"></i><a href="https://www.instagram.com/"> Instagram </a></li>
                <li><i className="fa-brands fa-twitter"></i><a href="https://twitter.com/"> Twitter </a></li>
            </ul>
            <ul>
                Контакти
                <li><i className="fa-solid fa-phone"></i> + 359 (0) 893747880</li>
                <li><i className="fa-solid fa-envelope"></i> jnikolovzhendov@gmail.com</li>
            </ul>
            <ul>
                <li className="copy"><p>&copy; Copyright 2022 | JD Ltd.</p></li>
            </ul>
    </footer>  
    )
}

export default Footer