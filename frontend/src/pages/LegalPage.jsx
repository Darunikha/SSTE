import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const EMAIL = 'srisasthatexengg@gmail.com';
const PHONE = '+91 87540 22322';
const UPDATED = '29 September 2026';

const DOCS = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'How Sri Sastha Textile Engineering collects, uses, stores and protects your personal information.',
    sections: [
      {
        heading: 'Who we are',
        body: [
          'Sri Sastha Textile Engineering ("we", "us") is a Coimbatore-based provider of textile machinery spare parts, electronic servicing, HMI conversions and industrial automation support. This policy explains what we do with information you share through this website.',
        ],
      },
      {
        heading: 'Information we collect',
        body: ['We only collect information you choose to give us, or that your browser sends automatically when you visit.'],
        list: [
          'Quote requests: your name, email address, the service you are interested in, and the message you write (which may include machine model, part numbers or fault descriptions).',
          'Newsletter sign-up: your email address.',
          'Catalog enquiries: the item name and SKU you selected, added to your quote message.',
          'Technical data: basic request information such as IP address, browser type and pages requested, recorded in server logs for security and troubleshooting.',
          'Phone, WhatsApp and email: anything you tell us when you contact us directly.',
        ],
      },
      {
        heading: 'How we use your information',
        list: [
          'To reply to your enquiry and prepare quotations.',
          'To diagnose, repair, supply and support machinery and parts you ask about.',
          'To send occasional updates on machinery support and maintenance, only if you subscribed.',
          'To keep the website secure, prevent abuse and fix technical problems.',
          'To meet legal, accounting and tax obligations where they apply.',
        ],
      },
      {
        heading: 'Legal basis and consent',
        body: [
          'We process your information because you asked us to (responding to an enquiry), because you consented (newsletter), or because we have a legitimate business interest in running and securing our services. You can withdraw consent at any time.',
        ],
      },
      {
        heading: 'Who we share it with',
        body: ['We do not sell or rent your personal data. We share it only where necessary:'],
        list: [
          'Service providers who help us run the site and send email (hosting, database and email delivery), under confidentiality obligations.',
          'Suppliers or courier partners, only when needed to source or ship a part you ordered.',
          'Authorities, when required by law or to protect our rights.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'Enquiry details are kept for as long as needed to handle your request and any follow-up support, and for a reasonable period afterwards for business records. Newsletter addresses are kept until you unsubscribe. Server logs are kept for a short period for security purposes. Financial records are retained as required by Indian law.',
        ],
      },
      {
        heading: 'Security',
        body: [
          'We use reasonable technical and organisational measures, including access controls and encrypted connections, to protect your information. No online system is completely secure, so please avoid sending sensitive information such as passwords or bank details through the contact form.',
        ],
      },
      {
        heading: 'Your rights',
        body: ['You may ask us to:'],
        list: [
          'Tell you what personal data we hold about you.',
          'Correct information that is inaccurate.',
          'Delete your information, subject to records we must keep by law.',
          'Stop sending you updates (every message includes a way to opt out, or email us).',
        ],
      },
      {
        heading: "Children's privacy",
        body: ['This website is intended for businesses and adults. We do not knowingly collect information from children.'],
      },
      {
        heading: 'Changes to this policy',
        body: ['We may update this policy from time to time. The "last updated" date at the top shows when it last changed. Continued use of the site means you accept the updated policy.'],
      },
      {
        heading: 'Contact us',
        body: [`For any privacy question or request, email ${EMAIL} or call ${PHONE}.`],
      },
    ],
  },

  terms: {
    title: 'Terms of Service',
    intro: 'The terms that apply when you use this website and request products or services from us.',
    sections: [
      {
        heading: 'Acceptance of terms',
        body: ['By accessing this website or submitting a request through it, you agree to these terms. If you do not agree, please do not use the site.'],
      },
      {
        heading: 'About our services',
        body: ['We supply textile machinery spare parts and provide electronic servicing, HMI conversions, automation support, preventive maintenance and technical assistance. Descriptions on this site are for general information.'],
      },
      {
        heading: 'Quotes and orders',
        list: [
          'A quote request sent through the site is an enquiry, not an order or a contract.',
          'A binding agreement exists only once we send a written quotation and you accept it in writing (email or purchase order).',
          'Prices, availability and lead times are confirmed in the quotation and may change until then.',
          'Taxes, freight and any on-site visit charges are stated in the quotation.',
        ],
      },
      {
        heading: 'Parts, compatibility and specifications',
        body: [
          'Catalog entries describe typical compatibility and specifications. Machines vary by model, year and modification, so please confirm the exact machine model and part number with our team before ordering. We are not responsible for a mismatch caused by incomplete or incorrect information supplied to us.',
        ],
      },
      {
        heading: 'Repairs and servicing',
        list: [
          'Diagnosis findings and repair estimates are shared with you before significant work begins.',
          'Faults can sometimes be caused by conditions outside the repaired item (power quality, dust, heat, wear elsewhere in the machine). We will advise on these where we see them.',
          'Equipment left with us should be collected within a reasonable time after we notify you it is ready.',
        ],
      },
      {
        heading: 'Payment',
        body: ['Payment terms (advance, credit period, mode of payment) are stated in the quotation or invoice. Delayed payments may lead to a pause in supply or service.'],
      },
      {
        heading: 'Warranty and returns',
        body: ['Warranty and return conditions for parts and repairs are described in our Warranty & Returns policy and confirmed in your quotation.'],
      },
      {
        heading: 'Intellectual property',
        body: ['The website design, text, logo and images belong to Sri Sastha Textile Engineering or are used with permission. Brand names such as Rieter, Trützschler, Lakshmi, Savio, Siemens, Mitsubishi, Danfoss and ABB belong to their respective owners and are used only to describe compatibility; we are an independent service provider and not affiliated with them unless stated.'],
      },
      {
        heading: 'Acceptable use',
        list: [
          'Do not misuse the site, attempt to disrupt it, or try to gain unauthorised access.',
          'Do not submit false, misleading or unlawful content through our forms.',
          'Do not copy or resell site content without our written permission.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: ['To the extent permitted by law, we are not liable for indirect or consequential losses (such as lost production or profit) arising from use of this site or from information on it. Our liability for any product or service is limited to the value of that product or service, except where the law does not allow such a limit.'],
      },
      {
        heading: 'Third-party links and services',
        body: ['The site may link to third-party services such as WhatsApp or Google Fonts. We do not control them and are not responsible for their content or practices.'],
      },
      {
        heading: 'Governing law',
        body: ['These terms are governed by the laws of India. Any dispute is subject to the jurisdiction of the courts at Coimbatore, Tamil Nadu.'],
      },
      {
        heading: 'Changes and contact',
        body: [`We may update these terms from time to time; the updated version applies from the date shown above. Questions can be sent to ${EMAIL}.`],
      },
    ],
  },

  cookies: {
    title: 'Cookie Policy',
    intro: 'What this website stores in your browser, why, and how you can control it.',
    sections: [
      {
        heading: 'What are cookies?',
        body: ['Cookies and similar technologies (such as local storage) are small pieces of data a website saves in your browser to remember information between visits.'],
      },
      {
        heading: 'Our approach',
        body: ['This website does not use advertising cookies, behavioural tracking or social-media tracking pixels. We keep browser storage to the minimum needed for the site to work properly.'],
      },
      {
        heading: 'What we use',
        list: [
          'Essential storage: technical data needed to load pages and keep forms and navigation working.',
          'Security and logs: standard server logs (such as IP address and pages requested) used to keep the site secure and diagnose faults.',
        ],
      },
      {
        heading: 'Third-party content',
        list: [
          'Google Fonts: fonts are loaded from Google, which receives your IP address and browser details as part of the request.',
          'WhatsApp, phone and email links open external apps; those services apply their own policies.',
        ],
      },
      {
        heading: 'Analytics',
        body: ['We do not currently run analytics on this site. If we add privacy-friendly analytics in future, we will update this page before it starts.'],
      },
      {
        heading: 'Managing cookies and storage',
        body: ['You can view, block or delete cookies and site data in your browser settings (for example, in the Privacy or Site data section). Blocking essential storage may affect how parts of the site work.'],
      },
      {
        heading: 'Contact',
        body: [`Questions about this policy: ${EMAIL}.`],
      },
    ],
  },

  warranty: {
    title: 'Warranty & Returns',
    intro: 'What you can expect if a part or repair does not perform as it should.',
    sections: [
      {
        heading: 'Our commitment',
        body: ['We want your machinery back in production and staying there. If a part we supplied or a repair we carried out fails through a defect in the part or workmanship, we will work with you to put it right.'],
      },
      {
        heading: 'Warranty period',
        body: ['The warranty period depends on the item (new spare, repaired board, drive, HMI or other component) and is stated in your written quotation and invoice. Please keep your invoice or job reference as proof of supply.'],
      },
      {
        heading: 'What is covered',
        list: [
          'Defects in materials or workmanship in parts we supplied.',
          'Failure of the specific fault we repaired, under normal use and correct installation.',
        ],
      },
      {
        heading: 'What is not covered',
        list: [
          'Damage from incorrect installation, misuse, accidents or unauthorised repair attempts.',
          'Failures caused by power surges, water, dust, heat, pests or other environmental conditions.',
          'Normal wear and tear of consumable components.',
          'Faults in other parts of the machine that were not part of our supply or repair.',
        ],
      },
      {
        heading: 'How to make a claim',
        list: [
          `Contact us at ${EMAIL} or ${PHONE} with your invoice or job reference, machine model and a description of the fault (photos help).`,
          'We may ask you to send the item back or arrange an inspection so we can diagnose it.',
          'If the claim is covered we will repair, replace or otherwise resolve it. If it is not covered, we will explain why and quote separately if you wish.',
        ],
      },
      {
        heading: 'Returns of unused parts',
        body: ['Unused parts in original condition may be returned within the window stated on your quotation, subject to inspection. Custom-ordered, specially sourced, modified or opened electronic items may not be returnable unless faulty. Please contact us before returning anything so we can give you a return reference.'],
      },
      {
        heading: 'Shipping of returns',
        body: ['Unless the return is due to our error or a covered defect, return freight is arranged and paid by the customer. Please pack items securely; transit damage cannot be covered.'],
      },
      {
        heading: 'Contact',
        body: [`Warranty and returns help: ${EMAIL}, ${PHONE}.`],
      },
    ],
  },
};

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const LINKS = [
  ['privacy', 'Privacy Policy'],
  ['terms', 'Terms of Service'],
  ['cookies', 'Cookie Policy'],
  ['warranty', 'Warranty & Returns'],
];

const LegalPage = ({ type }) => {
  const doc = DOCS[type];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  return (
    <>
      <section className="legal-hero">
        <div className="container">
          <span className="eyebrow">Legal &middot; Last updated {UPDATED}</span>
          <h1>{doc.title}</h1>
          <p>{doc.intro}</p>
        </div>
      </section>
      <section className="section legal-section">
        <div className="container legal-layout">
          <aside className="legal-toc" aria-label="On this page">
            <h4>On this page</h4>
            <ol>
              {doc.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${slug(s.heading)}`}>{s.heading}</a>
                </li>
              ))}
            </ol>
            <h4>Other policies</h4>
            <ul>
              {LINKS.filter(([key]) => key !== type).map(([key, label]) => (
                <li key={key}>
                  <Link to={`/${key}`}>{label}</Link>
                </li>
              ))}
            </ul>
          </aside>

          <div className="legal-body">
            {doc.sections.map((s, i) => (
              <div key={s.heading} id={slug(s.heading)} className="legal-block">
                <h2>
                  <span>{String(i + 1).padStart(2, '0')}</span> {s.heading}
                </h2>
                {s.body?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <p className="legal-note">
              This page is provided for general information and is not legal advice. Questions?{' '}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalPage;
