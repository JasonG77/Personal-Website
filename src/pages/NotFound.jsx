import { ArrowLeft } from "lucide-react";
import { ActionButton, ArchiveHeader, PageContainer } from "../components/system/DesignSystem";
import { PageShell } from "../components/system/PageShell";

export const NotFound = () => (
  <PageShell>
    <section className="archive-section not-found-section">
      <PageContainer>
        <ArchiveHeader
          number="00"
          label="FILE NOT FOUND"
          title="This track is missing."
          intro="The page you requested is not in this portfolio archive. Return to the player and choose another section."
        />
        <ActionButton to="/"><ArrowLeft aria-hidden="true" /> Return to player</ActionButton>
      </PageContainer>
    </section>
  </PageShell>
);
