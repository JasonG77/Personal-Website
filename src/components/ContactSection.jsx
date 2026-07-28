const links = [
  ["EMAIL", "mailto:jasongutierrez318@gmail.com", "jasongutierrez318@gmail.com"],
  ["LINKEDIN", "https://www.linkedin.com/in/jason-gutierrez7/", "jason-gutierrez7"],
  ["GITHUB", "https://github.com/JasonG77", "JasonG77"],
];

export const ContactSection = () => (
  <section id="contact" className="archive-section contact-archive px-4 py-24">
    <div className="container max-w-5xl mx-auto archive-entry">
      <p className="archive-number">07</p>
      <div className="w-full">
        <p className="archive-label">CONTACT</p>
        <h2>Let&apos;s make something useful.</h2>
        <p className="archive-body">For engineering opportunities, project conversations, or work focused on equitable technology.</p>
        <div className="contact-lines">
          {links.map(([label, href, value]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><span>{label}</span><strong>{value}</strong><b>↗</b></a>)}
        </div>
        <p className="resume-note">RESUME / AVAILABLE BY REQUEST</p>
      </div>
    </div>
  </section>
);
