import React from 'react';
import { Button } from '../../../../components/common/Button';
import { Input } from '../../../../components/common/Input';
import { Badge } from '../../../../components/common/Badge';

export interface TpoSecurityTabProps {
  onUpdateSecurity: () => void;
}

export const TpoSecurityTab: React.FC<TpoSecurityTabProps> = ({ onUpdateSecurity }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 max-w-xl">
      <h3 className="text-base font-bold text-slate-900">TPO Officer Access & Authentication</h3>
      <p className="text-xs text-slate-500">
        Manage administrator privileges and session security.
      </p>

      <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">Two-Factor Authentication</span>
          <Badge variant="success" size="sm">
            Enforced for Admin
          </Badge>
        </div>
        <p className="text-[11px] text-slate-600">
          Institutional SSO via Google Workspace / Microsoft Entra is active.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <Input label="Current Admin Email" value="admin.tpo@university.edu" disabled />
        <Input label="Placement Office Emergency Contact" value="+91 (080) 4123-9999" />
      </div>

      <Button variant="outline" size="sm" onClick={onUpdateSecurity}>
        Update Security Settings
      </Button>
    </div>
  );
};
