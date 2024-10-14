import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IProposalStoreState {
  proposalDetails: {
    impact: string;
    resources: string;
    proposalDetail: string;
    proposalFile: File | null;
  };
  personalInfo: {
    name: string;
    contact: string;
    email: string;
    dob: string;
  };
  documentUploads: {
    aadharCard: File | null;
    panCard: File | null;
  };
  educationalBackground: {
    university: string;
    startYear: string;
    endYear: string;
    degree: string;
  };
  professionalProfiles: {
    github: string;
    linkedin: string;
  };
  occupationsAndExperience: {
    occupations: string;
    experience: string;
  };
  additionalDocuments: {
    noObjectionCertificate: File | null;
    enrollmentCertificate: File | null;
  };
  setProposalDetails: (
    details: Partial<IProposalStoreState["proposalDetails"]>
  ) => void;
  setPersonalInfo: (info: Partial<IProposalStoreState["personalInfo"]>) => void;
  setDocumentUploads: (
    uploads: Partial<IProposalStoreState["documentUploads"]>
  ) => void;
  setEducationalBackground: (
    background: Partial<IProposalStoreState["educationalBackground"]>
  ) => void;
  setProfessionalProfiles: (
    profiles: Partial<IProposalStoreState["professionalProfiles"]>
  ) => void;
  setOccupationsAndExperience: (
    data: Partial<IProposalStoreState["occupationsAndExperience"]>
  ) => void;
  setAdditionalDocuments: (
    documents: Partial<IProposalStoreState["additionalDocuments"]>
  ) => void;
}

const useProposalStore = create<IProposalStoreState>()(
  devtools(
    persist(
      (set) => ({
        proposalDetails: {
          impact: "",
          resources: "",
          proposalDetail: "",
          proposalFile: null,
        },
        personalInfo: {
          name: "",
          contact: "",
          email: "",
          dob: "",
        },
        documentUploads: {
          aadharCard: null,
          panCard: null,
        },
        educationalBackground: {
          university: "",
          startYear: "",
          endYear: "",
          degree: "",
        },
        professionalProfiles: {
          github: "",
          linkedin: "",
        },
        occupationsAndExperience: {
          occupations: "",
          experience: "",
        },
        additionalDocuments: {
          noObjectionCertificate: null,
          enrollmentCertificate: null,
        },

        setProposalDetails: (details) =>
          set((state) => ({
            proposalDetails: { ...state.proposalDetails, ...details },
          })),

        setPersonalInfo: (info) =>
          set((state) => ({
            personalInfo: { ...state.personalInfo, ...info },
          })),
        setDocumentUploads: (uploads) =>
          set((state) => ({
            documentUploads: { ...state.documentUploads, ...uploads },
          })),
        setEducationalBackground: (background) =>
          set((state) => ({
            educationalBackground: {
              ...state.educationalBackground,
              ...background,
            },
          })),
        setProfessionalProfiles: (profiles) =>
          set((state) => ({
            professionalProfiles: {
              ...state.professionalProfiles,
              ...profiles,
            },
          })),
        setOccupationsAndExperience: (data) =>
          set((state) => ({
            occupationsAndExperience: {
              ...state.occupationsAndExperience,
              ...data,
            },
          })),
        setAdditionalDocuments: (documents) =>
          set((state) => ({
            additionalDocuments: { ...state.additionalDocuments, ...documents },
          })),
      }),
      { name: "proposalStore" }
    )
  )
);

export { useProposalStore };
