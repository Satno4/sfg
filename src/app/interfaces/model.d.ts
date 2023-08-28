export interface SocialService {
  serviceName: string; //
  serviceDescription: string; //
  serviceCategory: string[];
  beneficiary: string[];
  provider: string;
  location?: string;
  region: string[];
  email: string;
  phone: string;
  address: string;
  singleUse: boolean;
  healthRequirement?: string[];
  familyRequirement?: string[];
  documentation?: string[];
  ageRestriction?: {
    min: number,
    max: number,
  };
  benefit?: string;
  yearSpecific?: boolean;
  educationRequirement?: string[];
  diagnoses?: string[];
  index: number;
}
