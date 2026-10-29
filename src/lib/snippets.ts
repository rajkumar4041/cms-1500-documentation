export const INSTALL_CMD = 'npm install cms1500-react pdf-lib'

export const COMPONENT_USAGE = `import { CMS1500Form } from 'cms1500-react';

function ClaimPage({ claimData }) {
  return (
    <CMS1500Form
      data={claimData}
      width="100%"
      height="calc(100vh - 120px)"
    />
  );
}`

export const HOOK_USAGE = `import { useCMS1500 } from 'cms1500-react';

function ClaimPage({ claimData }) {
  const { pdfUrl, loading, generatePdf, handlePrint, handleDownload, iframeRef } =
    useCMS1500();

  useEffect(() => { generatePdf(claimData); }, []);

  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <button onClick={() => handleDownload('claim.pdf')}>Download</button>
      {pdfUrl && (
        <iframe ref={iframeRef} src={pdfUrl} style={{ width: '100%', height: '80vh' }} />
      )}
    </div>
  );
}`

export const HEADLESS_USAGE = `import { fillCMS1500Pdf, getEmbeddedTemplate } from 'cms1500-react';

// Template is bundled — no fetch needed
const templateBytes = getEmbeddedTemplate();
const filledPdf = await fillCMS1500Pdf(templateBytes, claimData);
// filledPdf is a Uint8Array — save to file, upload, etc.`

export const TEMPLATE_HELPERS = `import {
  getEmbeddedTemplate,
  TEMPLATE_ASSET_PATH,
  TEMPLATE_FILENAME,
} from 'cms1500-react';

getEmbeddedTemplate(); // Uint8Array of the blank CMS-1500 PDF (bundled)
TEMPLATE_ASSET_PATH;   // path to the asset shipped in the package
TEMPLATE_FILENAME;     // "form-cms-1500.pdf"`

export const FHIR_USAGE = `import { mapFHIRToCMS1500 } from 'cms1500-react';
import type { FHIRClaimBundle } from 'cms1500-react';

const bundle: FHIRClaimBundle = {
  patient: {
    resourceType: 'Patient',
    name: [{ family: 'Doe', given: ['John'] }],
    birthDate: '1980-01-15',
    gender: 'male',
  },
  claim: {
    resourceType: 'Claim',
    diagnosis: [
      { sequence: 1, diagnosisCodeableConcept: { coding: [{ code: 'J06.9' }] } },
    ],
    item: [
      {
        sequence: 1,
        productOrService: { coding: [{ code: '99213' }] },
        servicedDate: '2026-03-15',
        locationCodeableConcept: { coding: [{ code: '11' }] },
        quantity: { value: 1 },
        net: { value: 150.0 },
        diagnosisSequence: [1],
      },
    ],
  },
};

const formData = mapFHIRToCMS1500(bundle);`

export const MINIMAL_EXAMPLE = `{
  "patientName": "JOHN DOE",
  "patientDOB": "1980-01-15",
  "patientSex": "M",
  "insuranceId": "XYZ123456789",
  "diagnisisCodeData": [{ "code": "J06.9" }],
  "dateOfService": "2026-03-15",
  "posCode": "11",
  "patientProcedureCodes": [
    {
      "procedureCode": { "1": "99213" },
      "diagnosisFirstPointers": "A",
      "charges": 150.00,
      "quantity": 1
    }
  ],
  "total": 150.00
}`

export const FULL_DATA_REFERENCE = `{
  // ── CARRIER / INSURANCE (top of form) ──
  "insuranceType": "group_health",       // medicare | medicaid | tricare | champva | group_health | feca_blk_lung | other
  "insuranceId": "XYZ123456789",         // Box 1a: Insured's ID number
  "patientInsurance": {
    "planName": "BCBS PPO",
    "policyNumber": "GRP-001234",
    "address": { "line1": "PO Box 100", "city": "Chico", "state": "CA", "zipcode": "95927" },
    "phoneNumber": "5559876543",
    "dob": "1980-01-15",
    "sex": "M"
  },

  // ── PATIENT (Boxes 2-5) ──
  "patientName": "JOHN DOE",             // Box 2
  "patientDOB": "1980-01-15",            // Box 3 (YYYY-MM-DD)
  "patientSex": "M",                     // Box 3: M | F
  "patientAddress": { "line1": "123 Main St", "city": "Anytown", "state": "CA", "zipcode": "90210" },
  "patientPhone": "(555) 123-4567",      // Box 5

  // ── INSURED (Boxes 4, 6-7, 11) ──
  "insuredName": "JOHN DOE",             // Box 4 (defaults to patient if self)
  "patientRelationship": "Self",         // Box 6: Self | Spouse | Child | Other

  // ── OTHER INSURED (Box 9) ──
  "otherInsuredName": "JANE DOE",
  "otherInsuredPolicy": "POL-5678",
  "otherInsuredPlanName": "AETNA HMO",

  // ── CONDITION (Box 10) ──
  "conditionRelatedTo": { "employment": false, "autoAccident": false, "autoAccidentState": "CA", "otherAccident": false },

  // ── SIGNATURES (Boxes 12-13) ──
  "patientSignature": "SIGNATURE ON FILE",
  "patientSignatureDate": "2026-03-15",
  "insuredSignature": "SIGNATURE ON FILE",

  // ── DATES (Boxes 14-16, 18) ──
  "dateOfCurrentIllness": "2026-03-10",
  "unableToWorkFrom": "2026-03-10",
  "unableToWorkTo": "2026-03-17",
  "hospitalizationFrom": "2026-03-11",
  "hospitalizationTo": "2026-03-13",

  // ── PROVIDER INFO (Boxes 17, 19-20) ──
  "referringProvider": { "1": "SMITH, JANE MD" },  // Box 17
  "referringProviderNPI": "1234567890",            // Box 17b
  "additionalClaimInfo": "Initial treatment",      // Box 19
  "outsideLab": false,                             // Box 20

  // ── DIAGNOSIS (Box 21, A-L, up to 12) ──
  "diagnisisCodeData": [
    { "code": "J06.9" },  // A
    { "code": "R05.9" }   // B
  ],
  // Fallback when diagnisisCodeData is empty: keyed "CODE - description" map
  "diagnosisCodes": { "1": "J06.9 - Acute upper respiratory infection" },

  // ── RESUBMISSION / AUTH (Boxes 22-23) ──
  "resubmissionCode": "7",
  "originalRefNumber": "ORIG-12345",
  "priorAuthorization": "AUTH-2026-0042",

  // ── SERVICE LINES (Box 24, up to 6) ──
  "dateOfService": "2026-03-15",
  "posCode": "11",                       // 11 = Office
  "renderingProviderNPI": "9876543210",
  "patientProcedureCodes": [
    {
      "procedureCode": { "1": "99213-Office Visit" },
      "modifiers": { "1": "25-Significant E/M" },
      "diagnosisFirstPointers": "A",
      "charges": 150.00,
      "quantity": 1
    }
  ],

  // ── PROVIDER / BILLING (Boxes 25-33) ──
  "federalTaxId": "12-3456789",
  "federalTaxIdType": "EIN",             // SSN | EIN
  "patientAccountNumber": "ACCT-001234",
  "acceptAssignment": true,
  "total": 150.00,
  "amountPaid": 50.00,
  "physicianSignature": "SIGNATURE ON FILE",
  "physicianSignatureDate": "2026-03-15",
  "serviceFacilityName": "ANYTOWN MEDICAL CENTER",
  "serviceFacilityAddress": "456 Health Blvd, Anytown CA 90210",
  "billingProviderName": "ANYTOWN MEDICAL GROUP",
  "billingProviderAddress": "789 Billing Ave, Anytown CA 90210",
  "billingProviderNPI": "1112223334",
  "billingProviderGroupNPI": "5556667778"
}`

export const CONSTANTS_USAGE = `import {
  DIAGNOSIS_FIELDS,
  SERVICE_LINE_FIELDS,
  PRIOR_AUTH_FIELD,
  BILLING_PROVIDER_FIELDS,
  FACILITY_FIELDS,
  PHYSICIAN_FIELDS,
} from 'cms1500-react';

// The exact PDF form-field names for each CMS-1500 box —
// use these to fill or read fields with your own pdf-lib logic.
SERVICE_LINE_FIELDS[0].charges; // -> the field name for line 1 charges`

export const DATA_FLOW = `Your App (authenticated) → Props → cms1500-react → pdf-lib → Browser Memory → Print/Download
                                    ↑                                ↑
                              No disk writes                  No server calls
                              No logging                      No persistence`