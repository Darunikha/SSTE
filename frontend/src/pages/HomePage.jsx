import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustMetrics from '../components/TrustMetrics';
import ServiceCard from '../components/ServiceCard';
import ExpertiseItem from '../components/ExpertiseItem';
import ExpertiseVisual from '../components/ExpertiseVisual';
import IndustriesBand from '../components/IndustriesBand';
import WhyChooseUs from '../components/WhyChooseUs';
import ProcessSection from '../components/ProcessSection';
import ReviewsSection from '../components/ReviewsSection';
import TeamCard from '../components/TeamCard';
import FaqItem from '../components/FaqItem';
import QuoteForm from '../components/QuoteForm';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { getServicesApi, getExpertiseApi, getStatsApi, getTeamApi, getFaqsApi } from '../services/api';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [stats, setStats] = useState([]);
  const [team, setTeam] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [activeFaq, setActiveFaq] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resServices, resExpertise, resStats, resTeam, resFaqs] = await Promise.all([
          getServicesApi().catch(() => ({ data: { data: [] } })),
          getExpertiseApi().catch(() => ({ data: { data: [] } })),
          getStatsApi().catch(() => ({ data: { data: [] } })),
          getTeamApi().catch(() => ({ data: { data: [] } })),
          getFaqsApi().catch(() => ({ data: { data: [] } })),
        ]);

        if (resServices.data?.data) setServices(resServices.data.data);
        if (resExpertise.data?.data) setExpertise(resExpertise.data.data);
        if (resStats.data?.data) setStats(resStats.data.data);
        if (resTeam.data?.data) setTeam(resTeam.data.data);
        if (resFaqs.data?.data) setFaqs(resFaqs.data.data);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Hero onGetStartedClick={() => scrollToSection('contact')} onLearnMoreClick={() => scrollToSection('expertise')} />

      <TrustMetrics stats={stats} />

      <section id="services" className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="01 / Services"
              title="Engineering Support Built Around Your Production."
              lead="From precision spare parts to industrial automation, we provide the technical support required to keep textile manufacturing operations moving."
            />
          </Reveal>
          <ol className="service-list">
            {services.map((item, idx) => (
              <Reveal
                as="li"
                key={item._id || idx}
                className="service-row"
                style={{ transitionDelay: `${Math.min(idx, 6) * 70}ms` }}
              >
                <ServiceCard index={idx} title={item.title} description={item.description} />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="expertise" className="section section-alt">
        <div className="container expertise-grid">
          <Reveal>
            <SectionHeading
              eyebrow="02 / Expertise"
              title="Specialized Knowledge. Built on the Factory Floor."
            />
            <ExpertiseVisual />
          </Reveal>
          <ul className="expertise-list">
            {expertise.map((item, idx) => (
              <Reveal
                as="li"
                key={item._id || idx}
                className="expertise-row"
                style={{ transitionDelay: `${Math.min(idx, 6) * 70}ms` }}
              >
                <ExpertiseItem index={idx} title={item.title} description={item.description} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <IndustriesBand />

      <section id="about" className="section">
        <div className="container">
          <div className="about-block">
            <SectionHeading
              eyebrow="04 / About"
              title="Engineering Partners Since Day One."
              lead="Sri Sastha Textile Engineering is based in Coimbatore, Tamil Nadu, supporting textile manufacturers with spare parts, electronics servicing, and automation expertise built directly on the factory floor."
            />
          </div>

          <div className="about-block">
            <WhyChooseUs />
          </div>

          <div className="about-block">
            <ProcessSection />
          </div>

          <div className="about-block">
            <SectionHeading eyebrow="Team" title="Engineers Behind the Response." level={3} />
            <Reveal as="div" className="team-grid">
              {team.map((item, idx) => (
                <TeamCard key={item._id || idx} role={item.role} specialty={item.specialty} />
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section id="contact" className="section quote-section">
        <div className="container quote-grid">
          <Reveal>
            <SectionHeading
              eyebrow="Get in Touch"
              title="Need Technical Support?"
              lead="Tell us what your machinery needs. Our team will review your requirement and get back to you."
            />
            <ul className="quote-contact-list">
              <li>Coimbatore, Tamil Nadu, India</li>
              <li><a href="tel:+918754022322">+91 87540 22322</a></li>
              <li><a href="mailto:srisasthatexengg@gmail.com">srisasthatexengg@gmail.com</a></li>
            </ul>
          </Reveal>
          <Reveal>
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      <section id="faq" className="section section-alt">
        <div className="container faq-grid">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
          </Reveal>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <FaqItem
                key={faq._id || idx}
                id={faq._id || idx}
                question={faq.question}
                answer={faq.answer}
                isActive={activeFaq === idx}
                onToggle={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
