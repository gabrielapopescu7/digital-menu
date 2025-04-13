import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()
  type Language = 'en' | 'ro'
  const [language, setLanguage] = useState<Language>('en')
  const switchLanguage = (lang: Language) => {
    setLanguage(lang)
  }
  const texts: Record<
    Language,
    {
      welcome: string
      description: string
      viewMenu: string
      openingHours: string
      hoursMonFri: string
      hoursSaturday: string
      hoursSunday: string
    }
  > = {
    en: {
      welcome: 'Welcome to Our Restaurant!',
      description:
        'Enjoy our delicious dishes, crafted with care and the freshest ingredients for a truly memorable experience!',
      viewMenu: 'View Our Menu',
      openingHours: 'Opening Hours',
      hoursMonFri: 'Monday - Friday: 10:00 AM - 10:00 PM',
      hoursSaturday: 'Saturday: 12:00 PM - 12:00 PM',
      hoursSunday: 'Sunday: 12:00 PM - 10:00 PM'
    },
    ro: {
      welcome: 'Bine ați venit la Restaurantul nostru!',
      description:
        'Savurați preparatele noastre delicioase, pregătite cu grijă și cele mai proaspete ingrediente pentru o experiență cu adevărat memorabilă!',
      viewMenu: 'Vizualizați Meniul',
      openingHours: 'Program',
      hoursMonFri: 'Luni - Vineri: 10:00 AM - 10:00 PM',
      hoursSaturday: 'Sâmbătă: 12:00 PM - 12:00 PM',
      hoursSunday: 'Duminică: 12:00 PM - 10:00 PM'
    }
  }

  return (
    <div style={{ padding: '20px', position: 'relative', color: 'white' }}>
      {/* Contact info section */}
      <div className="contact-info">
        <div>0723043202</div>
        <div>contact@restaurant.com</div>
      </div>

      {/* Section for change language */}
      <div className="language-switcher">
        <button onClick={() => switchLanguage('en')}>EN</button>
        <button onClick={() => switchLanguage('ro')}>RO</button>
      </div>

      {/* Restaurant opening hours */}
      <div className="opening-hours">
        <h3>{texts[language].openingHours}</h3>
        <p>
          <strong>Monday - Friday:</strong> {texts[language].hoursMonFri}
        </p>
        <p>
          <strong>Saturday:</strong> {texts[language].hoursSaturday}
        </p>
        <p>
          <strong>Sunday:</strong> {texts[language].hoursSunday}
        </p>
      </div>

      <div className="welcome-message">
        <h1>{texts[language].welcome}</h1>

        <p>{texts[language].description}</p>

        <button onClick={() => navigate('/menu')}>
          {texts[language].viewMenu}
        </button>
      </div>
    </div>
  )
}

export default Home
