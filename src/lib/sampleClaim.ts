import type { CMS1500Data } from 'cms1500-react'

/** Obviously-synthetic demo claim — no real PHI. */
export const sampleClaim: CMS1500Data = {
  insuranceType: 'group_health',
  insuranceId: 'XYZ123456789',
  patientName: 'JOHN DOE',
  patientDOB: '1980-01-15',
  patientSex: 'M',
  patientAddress: {
    line1: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipcode: '90210',
  },
  patientPhone: '(555) 123-4567',
  patientRelationship: 'Self',
  diagnisisCodeData: [{ code: 'J06.9' }, { code: 'R05.9' }],
  dateOfService: '2026-03-15',
  posCode: '11',
  renderingProviderNPI: '9876543210',
  patientProcedureCodes: [
    {
      procedureCode: { '1': '99213-Office Visit' },
      diagnosisFirstPointers: 'A',
      charges: 150,
      quantity: 1,
    },
  ],
  federalTaxId: '12-3456789',
  federalTaxIdType: 'EIN',
  acceptAssignment: true,
  total: 150,
  billingProviderName: 'ANYTOWN MEDICAL GROUP',
  billingProviderAddress: '789 Billing Ave, Anytown CA 90210',
  billingProviderNPI: '1112223334',
}

/** The editable subset surfaced in the live demo. */
export interface DemoFields {
  patientName: string
  patientDOB: string
  patientSex: 'M' | 'F'
  insuranceId: string
  diagnosisCode: string
  cptCode: string
  charge: string
}

export const defaultDemoFields: DemoFields = {
  patientName: 'JOHN DOE',
  patientDOB: '1980-01-15',
  patientSex: 'M',
  insuranceId: 'XYZ123456789',
  diagnosisCode: 'J06.9',
  cptCode: '99213',
  charge: '150',
}

/** Merge the editable fields onto the base sample claim to form full data. */
export function buildClaim(f: DemoFields): CMS1500Data {
  const charge = Number(f.charge)
  const safeCharge = Number.isFinite(charge) ? charge : 0
  return {
    ...sampleClaim,
    patientName: f.patientName,
    patientDOB: f.patientDOB,
    patientSex: f.patientSex,
    insuranceId: f.insuranceId,
    diagnisisCodeData: f.diagnosisCode ? [{ code: f.diagnosisCode }] : [],
    patientProcedureCodes: [
      {
        procedureCode: { '1': f.cptCode },
        diagnosisFirstPointers: 'A',
        charges: safeCharge,
        quantity: 1,
      },
    ],
    total: safeCharge,
  }
}
