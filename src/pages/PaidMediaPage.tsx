import React from 'react';
import { Megaphone } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { MenuId } from '../types';

interface PaidMediaPageProps {
  onNavigate: (menu: MenuId) => void;
}

export const PaidMediaPage: React.FC<PaidMediaPageProps> = ({ onNavigate }) => {
  return (
    <EmptyState
      icon={Megaphone}
      category="Paid Media"
      title="No Active Paid Campaigns Connected"
      description="Paid advertising performance metrics (PPC, Meta Ads, Search Ads) are currently not configured for this client portal. Connect your ad accounts once setup tasks are complete."
      actionText="Connect Ad Accounts"
      secondaryActionText="View Ads Tasks in Task DB"
      onSecondaryAction={() => onNavigate('task-db')}
      suggestedFromAudit={[
        {
          title: 'Task: AIZ_CM and Tommy to decide on which ads to run',
          description: 'Client and agency leadership need to decide between Google Ads vs Meta Ads strategy.',
        },
        {
          title: 'Task: AIZ_Set up ads accounts and run Ads',
          description: 'Status: Generated. Awaiting budget sign-off and billing credentials setup.',
        },
        {
          title: 'Task: Set up Google Ads',
          description: 'Status: Generated. Search campaigns planned for primary commercial services.',
        },
      ]}
      tips={[
        'The original audit PDF did not include ad conversion or spend metrics.',
        'Once Google Ads or Meta Ads is connected, ROAS, CPC, CPA, and campaign stats will appear here.',
      ]}
    />
  );
};
