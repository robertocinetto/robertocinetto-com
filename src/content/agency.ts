export interface AgencyTerm {
  /** Set in the display face — the part an agency lead scans for. */
  lead: string;
  /** Continues the sentence. Includes its own leading punctuation/space. */
  detail: string;
}

export const agencyTerms: AgencyTerm[] = [
  { lead: "White-label by default.", detail: " Your client never knows I exist." },
  { lead: "No contact with your client.", detail: " Everything routes through you." },
  {
    lead: "Fixed weekly capacity",
    detail: ", agreed up front. I’d rather under-commit and be there in six months.",
  },
  {
    lead: "One async update per week",
    detail: ", plus a flag the moment something looks like it will slip.",
  },
  { lead: "MSA and per-project SOW", detail: ", non-solicit both ways." },
  {
    lead: "Senior enough not to need hand-holding.",
    detail: " You scope it; I ship it.",
  },
];

export const agencySection = {
  label: "White-label",
  heading: "How I work with agencies",
  lead: "Senior capacity you can put on a client project without changing how your team already runs.",
} as const;
