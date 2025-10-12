// @ts-ignore
import './styles/App.css';
import ExcelViewer from "./ExcelViewer.tsx";

function App() {

  return (
    <div className="app">
      <header>
        <div className="container header-content">
          <div className="logo">
            <img src="https://placehold.co/60x60/1e3a8a/ffffff?text=ЗЛ" alt="Здоровая лапка логотип" />
            <h1>Здоровая лапка</h1>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h2>Ветеринарная клиника "Здоровая лапка"</h2>
            <p>Мы заботимся о здоровье ваших питомцев с любовью и профессионализмом</p>
          </div>
        </section>

        <div className="container">
          <section className="about-section">
            <div className="about-text">
              <h3>О нашей клинике</h3>
              <p>
                Ветеринарная клиника "Здоровая лапка" предоставляет полный спектр услуг
                по диагностике, лечению и профилактике заболеваний домашних животных.
                Наши специалисты имеют многолетний опыт работы и используют современное оборудование.
              </p>
              <p>
                Мы стремимся создать комфортные условия для ваших питомцев и обеспечить
                им качественную медицинскую помощь.
              </p>
            </div>
            <div className="about-image">
              <img src="https://burobiz-a.akamaihd.net/uploads/images/112672/large_nevrolog.jpg" alt="Клиника Здоровая лапка" />
            </div>
          </section>

          <section className="contact-section">
            <h3>Контактная информация</h3>
            <div className="contact-info">
              <div className="contact-item">
                <h4>Адрес</h4>
                <p>г. Москва, проспект Маршала Жукова, 35</p>
              </div>
              <div className="contact-item">
                <h4>Телефон</h4>
                <p>+7 499 342-12-56</p>
              </div>
              <div className="contact-item">
                <h4>Email</h4>
                <p>clients@zdorovaya-lapka.ru</p>
              </div>
              <div className="contact-item">
                <h4>Социальные сети</h4>
                <div className="social-links">
                  <a href="https://vk.com/zdoravaya_lapka" target="_blank" rel="noopener noreferrer">
                    ВКонтакте
                  </a>
                  <a href="https://t.me/+WqKcasdRe-VQyYasasd" target="_blank" rel="noopener noreferrer">
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="services-section">
            <h2>Каталог услуг</h2>
            <ExcelViewer/>
          </section>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Ветеринарная клиника "Здоровая лапка". Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
