import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Star, Quote } from 'lucide-react'
import styles from './Testimonials.module.css'

// Expanded to 9 enterprise cards so 4K Ultra-Wide monitors never show empty gaps
const testimonials = [
  {
    name: 'Rajesh Kumar',
    company: 'ABC Developers',
    rating: 5,
    text: 'PlotCRM AI has completely transformed how we manage our plot sales. The AI assistant handles 70% of our customer queries automatically, and our conversion rate has jumped by 40%.',
    avatar: 'RK'
  },
  {
    name: 'Priya Sharma',
    company: 'Skyline Realty',
    rating: 5,
    text: 'The WhatsApp integration and automated follow-ups have saved us countless hours. Our sales team now focuses on closing deals instead of manual data entry.',
    avatar: 'PS'
  },
  {
    name: 'Amit Patel',
    company: 'Green Valley',
    rating: 5,
    text: 'We manage 15 projects from a single dashboard. The AI lead scoring is incredibly accurate, and the site visit scheduling is effortless.',
    avatar: 'AP'
  },
  {
    name: 'Sunita Verma',
    company: 'Elite Properties',
    rating: 4,
    text: 'The reports and analytics give us real-time visibility into every aspect of our business. Best CRM investment we have ever made.',
    avatar: 'SV'
  },
  {
    name: 'Vikram Singh',
    company: 'Smart Lands',
    rating: 5,
    text: 'From lead capture to deal closure, everything is automated. Our sales cycle has reduced by 50% since we started using PlotCRM AI.',
    avatar: 'VS'
  },
  {
    name: 'Anand Mahindra',
    company: 'Future Infra',
    rating: 5,
    text: 'The visual Kanban sales pipeline makes tracking ₹50+ Crore inventories feel like a breeze. Our field agents love the mobile app accessibility.',
    avatar: 'AM'
  },
  {
    name: 'Neha Dhupia',
    company: 'Prime Estates',
    rating: 5,
    text: 'Token advances are collected instantly via Razorpay links sent straight from the AI chatbot. Our cash flow velocity has doubled.',
    avatar: 'ND'
  },
  {
    name: 'Suresh Menon',
    company: 'Metro Plots',
    rating: 5,
    text: 'The automated drip email campaigns nurtured 400 cold leads into active site visits last month alone. Unbelievable ROI.',
    avatar: 'SM'
  },
  {
    name: 'Kavita Reddy',
    company: 'Apex Landbank',
    rating: 5,
    text: 'DocuSign integration means NRI buyers sign digital sale agreements from the US and UK instantly. Highly recommended.',
    avatar: 'KR'
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="testimonials" className={styles.section} ref={ref}>
      
      {/* Widescreen Header matching Navbar / Features alignment */}
      <div className={styles.headerContainer}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Customer Success</span>
          <h2 className={styles.title}>Loved by <span className={styles.highlight}>Plot Sales Teams</span></h2>
          <p className={styles.subtitle}>See how top developers scale their land inventory conversions</p>
        </motion.div>
      </div>

      {/* --- THE MAGIC: Full-Bleed Continuous Linear Marquee --- */}
      <div className={styles.tickerWrapper}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={32}
          slidesPerView="auto" // Allows custom fixed-width cards
          loop={true}
          speed={7000} // Silky-smooth constant speed
          autoplay={{
            delay: 0, // 0 delay creates the continuous stream effect
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Beautiful UX: pauses when user hovers to read!
          }}
          className={styles.tickerSwiper}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className={styles.slideItem}>
              <div className={styles.card}>
                <Quote size={32} className={styles.quoteIcon} />
                <p className={styles.text}>{t.text}</p>
                
                <div className={styles.cardBottom}>
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        size={16}
                        className={si < t.rating ? styles.starFilled : styles.starEmpty}
                      />
                    ))}
                  </div>
                  
                  <div className={styles.author}>
                    <div className={styles.avatar}>{t.avatar}</div>
                    <div>
                      <div className={styles.authorName}>{t.name}</div>
                      <div className={styles.authorCompany}>{t.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  )
}