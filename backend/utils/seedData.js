const initialServices = [
  {
    icon: '⚙️',
    title: 'Compact Spinning Spares',
    description: 'Precision-engineered spare parts including sensors, gears, pins, and suction components for optimal spinning efficiency.',
    category: 'core',
  },
  {
    icon: '🔧',
    title: 'Electronic Servicing',
    description: 'PCB repairs, VFD servicing, drive support for Siemens, Mitsubishi, Danfoss, and ABB systems with quick turnaround.',
    category: 'core',
  },
  {
    icon: '📱',
    title: 'HMI Display Solutions',
    description: 'Professional HMI conversions, display upgrades, and custom safety covers for modern textile machinery systems.',
    category: 'core',
  },
  {
    icon: '🤖',
    title: 'Industrial Automation',
    description: 'Customized automation solutions, control panel diagnostics, and machine interface upgrades for enhanced productivity.',
    category: 'core',
  },
  {
    icon: '🛡️',
    title: 'Preventive Maintenance',
    description: 'Comprehensive maintenance support designed to minimize downtime and extend the life of your equipment.',
    category: 'core',
  },
  {
    icon: '💡',
    title: 'Technical Support',
    description: '24/7 responsive technical assistance and expert troubleshooting for all your textile machinery needs.',
    category: 'core',
  },
];

const initialExpertise = [
  {
    title: 'Compact Spinning Systems',
    description: 'Deep expertise in compact spinning technology including sensors, gears, and pneumatic components for Rieter, Trützschler, Lakshmi, and other leading systems.',
    category: 'expertise',
  },
  {
    title: 'Drive & Inverter Support',
    description: 'Specialized servicing for VFDs, Siemens drives, Mitsubishi inverters, Danfoss, and ABB systems with factory-certified expertise.',
    category: 'expertise',
  },
  {
    title: 'Industrial Electronics',
    description: 'PCB diagnostics, repairs, and component replacement for textile machinery control systems and HMI displays.',
    category: 'expertise',
  },
  {
    title: 'Machine Integration',
    description: 'Seamless integration of new components, display upgrades, and automation enhancements with minimal production disruption.',
    category: 'expertise',
  },
  {
    title: 'Technical Consulting',
    description: 'Expert guidance on equipment optimization, upgrade planning, and best practices for maximum machinery performance.',
    category: 'expertise',
  },
  {
    title: 'Rapid Response Support',
    description: 'Quick diagnostic and repair services to minimize downtime and keep your operations running smoothly every day.',
    category: 'expertise',
  },
];

const initialStats = [
  { icon: '✓', number: '50+', label: 'Years Combined Experience' },
  { icon: '✓', number: '1K+', label: 'Machines Serviced' },
  { icon: '✓', number: '2.5K+', label: 'Happy Customers' },
  { icon: '✓', number: '99%', label: 'Customer Satisfaction' },
];

const initialTeam = [
  { name: 'Senior Engineer', role: 'Senior Engineer', specialty: 'Compact Spinning Systems', icon: '👨‍🔧' },
  { name: 'Electronics Specialist', role: 'Electronics Specialist', specialty: 'Drive & PCB Repairs', icon: '👩‍💼' },
  { name: 'Automation Expert', role: 'Automation Expert', specialty: 'HMI & Control Systems', icon: '👨‍💻' },
  { name: 'Technical Support Lead', role: 'Technical Support Lead', specialty: '24/7 Customer Service', icon: '👩‍🔬' },
];

const initialFaqs = [
  {
    question: 'What types of machinery do you service?',
    answer: 'We specialize in compact spinning systems, modern textile machinery, and industrial automation equipment from leading manufacturers including Rieter, Trützschler, Lakshmi, Savio, and others.',
    order: 1,
  },
  {
    question: "What's your typical turnaround time?",
    answer: 'Most repairs are completed within 24-48 hours. For complex jobs, we provide daily updates and work to minimize your downtime wherever possible.',
    order: 2,
  },
  {
    question: 'Do you offer preventive maintenance?',
    answer: 'Yes, we offer comprehensive preventive maintenance plans customized to your machinery and production schedule to minimize unexpected breakdowns.',
    order: 3,
  },
  {
    question: 'Are spare parts always in stock?',
    answer: 'We maintain inventory of commonly needed parts and can source specialized components quickly through our supplier network across India.',
    order: 4,
  },
  {
    question: 'Do you provide warranty on repairs?',
    answer: 'All repairs come with a 6-month warranty on parts and labor. Extended warranties and maintenance contracts are also available.',
    order: 5,
  },
];

module.exports = {
  initialServices,
  initialExpertise,
  initialStats,
  initialTeam,
  initialFaqs,
};
