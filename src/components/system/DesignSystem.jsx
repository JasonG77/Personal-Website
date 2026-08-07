/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const PageContainer = ({ children, className = "" }) => (
  <div className={`design-container ${className}`.trim()}>{children}</div>
);

export const MetaLabel = ({ children, as: Component = "span", className = "", ...props }) => (
  <Component className={`meta-label ${className}`.trim()} {...props}>{children}</Component>
);

export const SectionDivider = ({ className = "" }) => (
  <div className={`section-divider ${className}`.trim()} aria-hidden="true"><span /></div>
);

export const ArchiveHeader = ({ number, label, title, intro, meta, className = "" }) => (
  <header className={`archive-header ${className}`.trim()}>
    <div className="archive-header-bar">
      <MetaLabel>{number}</MetaLabel>
      <MetaLabel>{label}</MetaLabel>
      <MetaLabel className="archive-header-status">JG.OS / OPEN</MetaLabel>
    </div>
    <h2>{title}</h2>
    {meta && <MetaLabel as="p" className="archive-header-meta">{meta}</MetaLabel>}
    {intro && <p className="archive-header-intro">{intro}</p>}
    <SectionDivider />
  </header>
);

export const ActionButton = ({ children, to, href, variant = "primary", className = "", ...props }) => {
  const classes = `action-button action-button-${variant} ${className}`.trim();

  if (to) return <Link className={classes} to={to} {...props}>{children}</Link>;
  return <a className={classes} href={href} {...props}>{children}</a>;
};

export const ContentCard = ({ children, as: Component = "article", className = "", ...props }) => (
  <Component className={`content-card ${className}`.trim()} {...props}>{children}</Component>
);
