import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import StatItem from '../components/StatItem';
import TeamCard from '../components/TeamCard';
import FaqItem from '../components/FaqItem';
import QuoteForm from '../components/QuoteForm';
import { getServicesApi, getExpertiseApi, getStatsApi, getTeamApi, getFaqsApi } from '../services/api';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [stats, setStats] = useState([]);
  const [team, setTeam] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [activeFaq, setActiveFaq] = useState(0);

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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        onGetStartedClick={() => scrollToSection('contact')}
        onLearnMoreClick={() => scrollToSection('services')}
      />

      {/* Services Section */}
      <section id="services">
        <div className="container">
          <div className="section-title">
            <h2>Our Core Services</h2>
            <p>Complete textile machinery support solutions</p>
          </div>
          <div className="services-grid">
            {services.map((item, idx) => (
              <ServiceCard key={item._id || idx} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((item, idx) => (
              <StatItem key={item._id || idx} icon={item.icon} number={item.number} label={item.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise">
        <div className="container">
          <div className="section-title">
            <h2>Our Expertise</h2>
            <p>Specialized knowledge across the textile machinery industry</p>
          </div>
          <div className="services-grid">
            {expertise.map((item, idx) => (
              <ServiceCard key={item._id || idx} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Request A Quote Section */}
      <section id="contact" style={{ padding: '60px 24px', background: '#f5f3ff' }}>
        <div className="container">
          <QuoteForm />
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team-section">
        <div className="container">
          <div className="section-title">
            <h2>Meet Our Expert Team</h2>
            <p>Experienced engineers dedicated to your success</p>
          </div>
          <div className="team-grid">
            {team.map((item, idx) => (
              <TeamCard key={item._id || idx} icon={item.icon} role={item.role} specialty={item.specialty} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="container">
          <div className="faq-grid">
            <div className="faq-list">
              <h2 style={{ color: 'var(--primary)', marginBottom: '24px' }}>Frequently Asked Questions</h2>
              {faqs.map((faq, idx) => (
                <FaqItem
                  key={faq._id || idx}
                  question={faq.question}
                  answer={faq.answer}
                  isActive={activeFaq === idx}
                  onClick={() => setActiveFaq(idx)}
                />
              ))}
            </div>
            <div className="faq-image"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
