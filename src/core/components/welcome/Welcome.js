import { useEffect } from "react"
import { useSelector} from "react-redux"
import styles from "../../css/welcome/welcome.module.css"
import ImageSlider from './slider/ImageSlider'

function Welcome() {

useEffect(() => {
    window.scrollTo(0,0)
},[])

const user = useSelector((state) => state.user.userData)

  return (
    <main>
        <section className={styles.info_container}>
                <div className={styles.info_background}></div>
                <article className={styles.info_text_container}>
                    <h1>Добре дошли!</h1>
                    <h1>{user === undefined ? null : <>
                        {user.firstName}  {user.lastName}
                    </>}</h1>
                    <p> Вашият лечебен свят вече вече само на един клик...</p>
                    <p> Използвайки това приложение клиентите могат да <b> следят, правят и организират </b> своите медикаменти.</p>
                </article>
        </section>
        <section className={styles.featers_container}>
            <section className={styles.features_info_container}>
                <h1><span>Услуги на Платформата</span></h1>
                <ul>
                    <li>
                        <article>
                            <i className="fa-solid fa-hand-holding-medical"></i>
                            <p>Консултация с Фармацефт</p>
                        </article>
                    </li>
                    <li>
                        <article>
                            <i className="fa-solid fa-capsules"></i>
                           <p>Проверка на наличност</p>
                        </article>
                    </li>
                    <li>
                        <article>
                            <i className="fa-solid fa-address-book"></i>                            
                            <p>Поръчка онлайн</p>
                        </article>
                    </li>
                    <li>
                        <article>
                            <i className="fa-solid fa-car-side"></i>
                            <p>Доставяме</p>
                        </article>
                    </li>
                </ul>
            </section>
        </section>
        <section className={styles.about_container}>
            <section className={styles.about_info_container} >
                <article className={styles.right_info} id="clearfix">
                    <img src="https://www.creativefabrica.com/wp-content/uploads/2020/07/17/Medicine-Logo-Graphics-4647232-1.jpg" alt=""/>
                    <p>Лекарството е фармацевтичен, химически по състава си или биологически активен продукт или вещество, водещ до оздравяване. Лекарствата се използват в хуманитарната или ветеринарна медицина, и стоматологията. Науката за лекарствата се нарича фармакология. Те се дозират и предписват от лекари, създават се от фармацевти химици, изготвят се от фармацевти, лекарствата се приготвят при хигенни условия, и продават в аптеки от фармацевти, в някои случаи биват директно давани на пациента или прилагани от лекари според неговите оплаквания.</p></article>
                <div className={styles.separator}></div>
                <article className={styles.right_info}>
                    <img src="https://media.istockphoto.com/vectors/blue-and-green-medical-cross-health-vector-id1275720974?k=20&m=1275720974&s=612x612&w=0&h=UTYONlQmk-ku34pq9m0sn-GzxPJVW7NdFQsJibSub9s=" alt=""/>
                    <p>Аптеката (от гръцки: ἀποθήκη – склад) е здравно заведение, в което се извършват следните дейности: съхранение, приготвяне, опаковане, контролиране, даване на консултации, отпускане по лекарско предписание и без лекарско предписание на разрешени за употреба в страната лекарствени продукти, както и хранителни добавки, козметични и санитарно-хигиенни средства.[1]
                    Аптеката е задължена да изпълни издадената рецепта, включително и когато са предписани екстемпорални лекарствени форми.

Аптеките могат да предлагат някои хранителни добавки, без да се регистрират по реда на Закона за храните.
                    </p>
                </article>
                <article className={styles.right_info}>
                        <p>Според българското законодателство, право да получи разрешение за откриване на аптека има само магистър-фармацевт. Лечебните заведения за болнична помощ и диспансерите за онкологични или психични заболявания могат да откриват аптеки за задоволяване на собствените си нужди. Производителите на лекарства и търговците на едро с лекарства не могат да откриват собствени аптеки, както и да участват в търговски дружества, които притежават аптеки. Магистър-фармацевт, който е открил аптека, не може да участва в търговски дружества, имащи за предмет на дейност производство или търговия на едро с лекарства, както и да работи по трудов договор на друго място. Магистър-фармацевти, които работят в аптеки на лечебни заведения или на общини, не могат да откриват частни аптеки.</p>
                </article>
            </section>
        </section>
        <ImageSlider slides={2}/>
    </main>
    )
}

export default Welcome;