const groups = [
  ["DIGITAL HARDWARE", "FPGA design, Verilog, digital logic, validation"],
  ["EMBEDDED SYSTEMS", "STM32, C, ADC/DAC, I²C, sensors, firmware"],
  ["SOFTWARE", "React, JavaScript, Python, Git, web applications"],
];

export const SkillsSection = () => (
  <section id="skills" className="archive-section px-4 py-24">
    <div className="container max-w-5xl mx-auto archive-entry">
      <p className="archive-number">04</p>
      <div className="w-full">
        <p className="archive-label">TOOLS &amp; PRACTICE</p>
        <h2>Technical range</h2>
        <div className="skill-lines">
          {groups.map(([title, detail]) => <div key={title}><strong>{title}</strong><span>{detail}</span></div>)}
        </div>
      </div>
    </div>
  </section>
);
