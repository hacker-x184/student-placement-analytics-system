import React from 'react';
import { Button } from '../../../../components/common/Button';
import { Input } from '../../../../components/common/Input';
import { Save } from 'lucide-react';

export interface PolicyData {
  activeBatchYear: number;
  defaultMinCgpa: number;
  maxOffersPerStudent: number;
  dreamPackageThreshold: number;
  allowTier2AfterTier1: boolean;
  mandatoryAttendancePct: number;
  enableAutoResumeVerification: boolean;
}

export interface PlacementPolicyTabProps {
  policyData: PolicyData;
  onChange: (updated: PolicyData) => void;
  onSave: (e: React.FormEvent) => void;
}

export const PlacementPolicyTab: React.FC<PlacementPolicyTabProps> = ({
  policyData,
  onChange,
  onSave,
}) => {
  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <h3 className="text-base font-bold text-slate-900">General Placement Rules</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Active Graduation Batch"
            type="number"
            value={policyData.activeBatchYear}
            onChange={(e) =>
              onChange({ ...policyData, activeBatchYear: parseInt(e.target.value, 10) || 2024 })
            }
          />
          <Input
            label="Institutional Minimum CGPA Floor"
            type="number"
            step="0.1"
            value={policyData.defaultMinCgpa}
            onChange={(e) =>
              onChange({ ...policyData, defaultMinCgpa: parseFloat(e.target.value) || 0 })
            }
          />
          <Input
            label="Maximum Offers per Student (Dream Policy)"
            type="number"
            value={policyData.maxOffersPerStudent}
            onChange={(e) =>
              onChange({ ...policyData, maxOffersPerStudent: parseInt(e.target.value, 10) || 1 })
            }
          />
          <Input
            label="Dream Company Cutoff Threshold (LPA)"
            type="number"
            step="0.5"
            value={policyData.dreamPackageThreshold}
            onChange={(e) =>
              onChange({ ...policyData, dreamPackageThreshold: parseFloat(e.target.value) || 0 })
            }
          />
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-3">
          <label className="flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer">
            <span>Allow Tier 2 Applications After Securing Tier 1 Offer</span>
            <input
              type="checkbox"
              checked={policyData.allowTier2AfterTier1}
              onChange={(e) =>
                onChange({ ...policyData, allowTier2AfterTier1: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer">
            <span>Automatic AI Resume Verification & Score Extraction</span>
            <input
              type="checkbox"
              checked={policyData.enableAutoResumeVerification}
              onChange={(e) =>
                onChange({ ...policyData, enableAutoResumeVerification: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
          </label>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="md"
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Institutional Policies
          </Button>
        </div>
      </div>
    </form>
  );
};
