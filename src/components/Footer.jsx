import { ArrowUp } from "lucide-react";
import { ActionButton, MetaLabel, PageContainer } from "./system/DesignSystem";

export const Footer = () => (
  <footer className="site-footer">
    <PageContainer className="site-footer-inner">
      <div>
        <MetaLabel>JG.OS / PORTFOLIO</MetaLabel>
        <p>&copy; {new Date().getFullYear()} Jason Gutierrez. Built with intention.</p>
      </div>
      <ActionButton to="/" variant="secondary"><ArrowUp aria-hidden="true" /> Return to player</ActionButton>
    </PageContainer>
  </footer>
);
