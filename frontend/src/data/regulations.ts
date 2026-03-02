export interface Regulation {
    id: string;
    code: string;
    title: string;
    description: string;
    fullText: string;
    category: 'Safety' | 'Electrical' | 'General';
}

export const regulations: Regulation[] = [
    {
        id: 'reg-001',
        code: 'OSHA 1910.137',
        title: 'Electrical Protective Equipment',
        description: 'Covers the design, in-service care, and use of electrical protective equipment.',
        category: 'Safety',
        fullText: `Employers must ensure that electrical protective equipment is maintained in a safe, reliable condition. 

Equipment must be inspected for damage before each day's use and immediately following any incident that can reasonably be suspected of having caused damage. Insulating equipment shall be cleaned as needed to remove foreign substances.

The employer must certify that equipment has been tested in accordance with the requirements of this section. The certification shall identify the equipment that passed the test and the date it was tested. Records of tests for rubber insulating equipment must be kept by the employer for at least 12 months.`
    },
    {
        id: 'reg-002',
        code: 'NFPA 70E',
        title: 'Standard for Electrical Safety in the Workplace',
        description: 'Requirements for safe work practices to protect personnel by reducing exposure to major electrical hazards.',
        category: 'Electrical',
        fullText: `An arc flash risk assessment shall be performed and shall determine if an arc flash hazard exists. If an arc flash hazard exists, the risk assessment shall determine appropriate safety-related work practices, the arc flash boundary, and the PPE to be used within the arc flash boundary.

The incident energy analysis shall be updated when changes occur in the electrical distribution system that could affect the results of the analysis. The incident energy analysis shall also be reviewed for accuracy at intervals not to exceed 5 years. 

Employees must be retrained in NFPA 70E safety procedures every three years, or sooner if inspections indicate non-compliance or if the equipment/procedures change.`
    },
    {
        id: 'reg-003',
        code: 'NEC Article 250',
        title: 'Grounding and Bonding',
        description: 'General requirements for grounding and bonding of electrical installations.',
        category: 'Electrical',
        fullText: `Equipment grounding conductors, grounding electrode conductors, and bonding jumpers shall be connected by exothermic welding, listed pressure connectors, listed clamps, or other listed means. Connection devices or fittings that depend solely on solder shall not be used.

The grounding electrode system must be inspected visually to verify that the connections to the grounding electrodes are secure and free of severe corrosion. 

A thorough electrical system grounding audit must be conducted by a certified electrician by Q4 2026 to ensure all facility bonding jumpers comply with the latest NEC lifecycle standards.`
    },
    {
        id: 'reg-004',
        code: 'ISO 45001',
        title: 'Occupational Health and Safety',
        description: 'International standard specifying requirements for an occupational health and safety (OH&S) management system.',
        category: 'General',
        fullText: `The organization shall establish, implement and maintain a process(es) for hazard identification that is ongoing and proactive. The process(es) shall take into account past relevant incidents, domestic or international, including emergencies, and their causes.

The organization must maintain documented continuous improvement objectives and ensure that hazard mitigation controls are regularly tested. Safety leadership must schedule an internal OH&S management system audit annually.`
    }
];
