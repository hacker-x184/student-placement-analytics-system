import React from 'react';
import { RoutePlaceholder } from '../../components/common/RoutePlaceholder';

interface Props {
  onNavigate?: (route: string) => void;
}

export const SettingsPage: React.FC<Props> = ({ onNavigate }) => (
  <RoutePlaceholder
    routeName="Portal Settings"
    routePath="/settings"
    role="student"
    description="Account preferences, notification alerts, and data privacy controls"
    onNavigate={onNavigate}
  />
);
