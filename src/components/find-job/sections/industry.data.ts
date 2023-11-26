import { Language } from "../../../constants/languages";

export type Data = {
  label: Language;
  id: string;
  content?: Data[];
};
export const DATA_FILTERS: Data[] = [
  {
    label: { en: "Information Technology" },
    id: "information_technology",
    content: [
      {
        id: "application_developer",
        label: { en: "Application Developer" },
      },
      {
        id: "cloud_architect",
        label: { en: "Cloud Architect" },
      },
      {
        id: "cloud_system_engineer",
        label: { en: "Cloud System Engineer" },
      },
      {
        id: "computer_network_architect",
        label: { en: "Computer Network Architect" },
      },
      {
        id: "computer_programmer",
        label: { en: "Computer Programmer" },
      },
      {
        id: "database_administrator",
        label: { en: "Database Administrator" },
      },
      {
        id: "developer",
        label: { en: "Developer" },
      },
      {
        id: "it_manager",
        label: { en: "IT Manager" },
      },
      {
        id: "java_developer",
        label: { en: "Java Developer" },
      },
      {
        id: "net_developer",
        label: { en: ".NET Developer" },
      },
      {
        id: "network_administrator",
        label: { en: "Network Administrator" },
      },
      {
        id: "network_engineer",
        label: { en: "Network Engineer" },
      },
      {
        id: "programmer_analyst",
        label: { en: "Programmer Analyst" },
      },
      {
        id: "software_architect",
        label: { en: "Software Architect" },
      },
      {
        id: "software_engineer",
        label: { en: "Software Engineer" },
      },
      {
        id: "software_quality_assurance_analyst",
        label: { en: "Software Quality Assurance Analyst" },
      },
      {
        id: "support_specialist",
        label: { en: "Support Specialist" },
      },
      {
        id: "system_architect",
        label: { en: "System Architect" },
      },
      {
        id: "system_designer",
        label: { en: "System Designer" },
      },
      {
        id: "systems_administrator",
        label: { en: "Systems Administrator" },
      },
      {
        id: "systems_analyst",
        label: { en: "Systems Analyst" },
      },
      {
        id: "ui_ux_engineer",
        label: { en: "UI/UX Engineer " },
      },
      {
        id: "web_administrator",
        label: { en: "Web Administrator" },
      },
      {
        id: "web_developer",
        label: { en: "Web Developer" },
      },
    ],
  },
  {
    label: { en: "Education" },
    id: "education",
    content: [
      {
        id: "academic_adviser",
        label: { en: "Academic Adviser" },
      },
      {
        id: "administrator",
        label: { en: "Administrator" },
      },
      {
        id: "child_care_assistant",
        label: { en: "Child Care Assistant " },
      },
      {
        id: "dean",
        label: { en: "Dean" },
      },
      {
        id: "instructor",
        label: { en: "Instructor" },
      },
      {
        id: "laboratory_technicians",
        label: { en: "Laboratory Technicians " },
      },
      {
        id: "senior_lecturer",
        label: { en: "Lecturer/Senior Lecturer " },
      },
      {
        id: "librarian",
        label: { en: "Librarian" },
      },
      {
        id: "preschool_teacher",
        label: { en: "Preschool Teacher" },
      },
      {
        id: "principal",
        label: { en: "Principal" },
      },
      {
        id: "professor",
        label: { en: "Professor" },
      },
      {
        id: "program_coordinator",
        label: { en: "Program Coordinator" },
      },
      {
        id: "registrar",
        label: { en: "Registrar" },
      },
      {
        id: "research_assistants",
        label: { en: "Research Assistants" },
      },
      {
        id: "sports_coach",
        label: { en: "Sports Coach" },
      },
      {
        id: "teacher",
        label: { en: "Teacher" },
      },
    ],
  },
  {
    label: { en: "Banking / Insurance" },
    id: "banking_insurance",
    content: [
      {
        id: "audit_manager",
        label: { en: "Audit Manager" },
      },
      {
        id: "bank_examiner",
        label: { en: "Bank Examiner" },
      },
      {
        id: "banking_officer",
        label: { en: "Banking Officer" },
      },
      {
        id: "branch_manager",
        label: { en: "Branch Manager" },
      },
      {
        id: "client_service_manager",
        label: { en: "Client Service Manager" },
      },
      {
        id: "credit_analyst",
        label: { en: "Credit Analyst" },
      },
      {
        id: "customer_service_representative",
        label: { en: "Customer Service Representative" },
      },
      {
        id: "financial_analyst",
        label: { en: "Financial Analyst" },
      },
      {
        id: "front_counter_officers",
        label: { en: "Front Counter Officers" },
      },
      {
        id: "internal_auditor",
        label: { en: "Internal Auditor" },
      },
      {
        id: "investment_analyst",
        label: { en: "Investment Analyst" },
      },
      {
        id: "investment_management_specialist",
        label: { en: "Investment Management Specialist" },
      },
      {
        id: "loan_officer",
        label: { en: "Loan Officer" },
      },
      {
        id: "loss_recovery_manager",
        label: { en: "Loss Recovery Manager" },
      },
      {
        id: "mortgage_consultant",
        label: { en: "Mortgage Consultant" },
      },
      {
        id: "online_customer_service_representative",
        label: { en: "Online Customer Service Representative" },
      },
      {
        id: "teller",
        label: { en: "Teller" },
      },
    ],
  },
  {
    label: { en: "Sales / Marketing" },
    id: "sales_marketing",
    content: [
      {
        id: "account_coordinator",
        label: { en: "Account Coordinator" },
      },
      {
        id: "account_executive",
        label: { en: "Account Executive" },
      },
      {
        id: "assistant_account_executive",
        label: { en: "Assistant Account Executive" },
      },
      {
        id: "brand_marketing_intern",
        label: { en: "Brand Marketing Intern" },
      },
      {
        id: "business_development_officer",
        label: { en: "Business Development Officer" },
      },
      {
        id: "marketing_assistant",
        label: { en: "Marketing Assistant" },
      },
      {
        id: "marketing_manager",
        label: { en: "Marketing Manager" },
      },
      {
        id: "marketing_representative",
        label: { en: "Marketing Representative" },
      },
      {
        id: "regional_account_manager",
        label: { en: "Regional Account Manager" },
      },
      {
        id: "regional_sales_manager",
        label: { en: "Regional Sales Manager" },
      },
      {
        id: "relationship_manager",
        label: { en: "Relationship Manager" },
      },
      {
        id: "sales_assistant",
        label: { en: "Sales Assistant" },
      },
    ],
  },
  {
    label: { en: "Media  / Advertise / Communi." },
    id: "media_advertise",
    content: [
      {
        id: "animator",
        label: { en: "Animator" },
      },
      {
        id: "announcer",
        label: { en: "Announcer" },
      },
      {
        id: "audio_and_video_technician",
        label: { en: "Audio and Video Technician" },
      },
      {
        id: "author",
        label: { en: "Author" },
      },
      {
        id: "camera_operator",
        label: { en: "Camera Operator" },
      },
      {
        id: "content_writer",
        label: { en: "Content Writer" },
      },
      {
        id: "creative_director",
        label: { en: "Creative Director" },
      },
      {
        id: "designer",
        label: { en: "Designer" },
      },
      {
        id: "digital_media_specialist",
        label: { en: "Digital Media Specialist" },
      },
      {
        id: "editor",
        label: { en: "Editor" },
      },
      {
        id: "journalist",
        label: { en: "Journalist" },
      },
      {
        id: "marketing_assistant",
        label: { en: "Marketing Assistant" },
      },
      {
        id: "photographer",
        label: { en: "Photographer" },
      },
      {
        id: "producer",
        label: { en: "Producer" },
      },
      {
        id: "production_artist",
        label: { en: "Production Artist" },
      },
      {
        id: "production_manager",
        label: { en: "Production Manager" },
      },
      {
        id: "project_coordinator",
        label: { en: "Project Coordinator" },
      },
      {
        id: "project_manager",
        label: { en: "Project Manager" },
      },
      {
        id: "proofreader",
        label: { en: "Proofreader" },
      },
      {
        id: "reporter",
        label: { en: "Reporter" },
      },
      {
        id: "sound_engineer",
        label: { en: "Sound Engineer" },
      },
      {
        id: "television_announcer",
        label: { en: "Television Announcer" },
      },
      {
        id: "videographer",
        label: { en: "Videographer" },
      },
    ],
  },
  {
    label: { en: "Apperal / Clothing " },
    id: "apperal_clothing",
    content: [
      {
        id: "fashion_designer",
        label: { en: "Fashion Designer" },
      },
      {
        id: "garment_technologist",
        label: { en: "Garment Technologist" },
      },
      {
        id: "graphic_designer",
        label: { en: "Graphic Designer" },
      },
      {
        id: "head_of_design",
        label: { en: "Head of Design" },
      },
      {
        id: "head_of_marketing",
        label: { en: "Head of Marketing" },
      },
      {
        id: "hr_administrator_assistant",
        label: { en: "HR Administrator / Assistant" },
      },
      {
        id: "pattern_maker_technologist",
        label: { en: "Pattern Maker/Technologist" },
      },
      {
        id: "product_developer",
        label: { en: "Product Developer" },
      },
      {
        id: "production_supervisor",
        label: { en: "Production Supervisor" },
      },
      {
        id: "quality_assurance_manager",
        label: { en: "Quality Assurance Manager" },
      },
      {
        id: "regional_area_manager",
        label: { en: "Regional/Area Manager" },
      },
      {
        id: "sales_manager",
        label: { en: "Sales Manager" },
      },
      {
        id: "shop_manager_assistant",
        label: { en: "Shop Manager Assistant" },
      },
      {
        id: "store_manager",
        label: { en: "Store Manager" },
      },
      {
        id: "stylist",
        label: { en: "Stylist" },
      },
      {
        id: "supervisor",
        label: { en: "Supervisor" },
      },
      {
        id: "visual_merchandiser",
        label: { en: "Visual Merchandiser" },
      },
    ],
  },
  {
    label: { en: "Hospitality / Tourism" },
    id: "hospitality_tourism",
    content: [
      {
        id: "airport_information_officer",
        label: { en: "Airport Information Officer" },
      },
      {
        id: "cabin_crew",
        label: { en: "Cabin Crew" },
      },
      {
        id: "customer_service_agent",
        label: { en: "Customer Service Agent" },
      },
      {
        id: "hotel_manager",
        label: { en: "Hotel Manager" },
      },
      {
        id: "housekeeper",
        label: { en: "Housekeeper" },
      },
      {
        id: "interpreter",
        label: { en: "Interpreter" },
      },
      {
        id: "pilot",
        label: { en: "Pilot" },
      },
      {
        id: "resort_representative",
        label: { en: "Resort Representative" },
      },
      {
        id: "sailing_instructor",
        label: { en: "Sailing Instructor" },
      },
      {
        id: "tour_executive",
        label: { en: "Tour Executive" },
      },
      {
        id: "tour_manager",
        label: { en: "Tour Manager" },
      },
      {
        id: "tourist_guide",
        label: { en: "Tourist Guide" },
      },
      {
        id: "travel_agent",
        label: { en: "Travel Agent" },
      },
    ],
  },
  {
    label: {
      en: "Hotels / Restaurants / Food",
    },
    content: [
      {
        id: "bellman",
        label: { en: "Bellman" },
      },
      {
        id: "catering_sales_manager",
        label: { en: "Catering Sales Manager" },
      },
      {
        id: "chef",
        label: { en: "Chef" },
      },
      {
        id: "cook",
        label: { en: "Cook" },
      },
      {
        id: "driver",
        label: { en: "Driver" },
      },
      {
        id: "events_manager",
        label: { en: "Events Manager" },
      },
      {
        id: "food_and_beverage_manager",
        label: { en: "Food and Beverage Manager" },
      },
      {
        id: "hotel_manager",
        label: { en: "Hotel Manager" },
      },
      {
        id: "housekeeper",
        label: { en: "Housekeeper" },
      },
      {
        id: "maid",
        label: { en: "Maid" },
      },
      {
        id: "meeting_coordinator",
        label: { en: "Meeting Coordinator" },
      },
      {
        id: "quality_controller",
        label: { en: "Quality Controller" },
      },
      {
        id: "receptionist",
        label: { en: "Receptionist" },
      },
      {
        id: "reservationist",
        label: { en: "Reservationist" },
      },
      {
        id: "sales_and_marketing_manager",
        label: { en: "Sales and Marketing Manager" },
      },
      {
        id: "special_events_manager",
        label: { en: "Special Events Manager" },
      },
      {
        id: "supply_chain_specialist",
        label: { en: "Supply Chain Specialist" },
      },
      {
        id: "waiter",
        label: { en: "Waiter/Waitress" },
      },
    ],
    id: "hotels_restaurants_food",
  },
  {
    label: { en: "Medical" },
    id: "medical",
    content: [
      {
        id: "clinical_research_coordinator",
        label: { en: "Clinical Research Coordinator" },
      },
      {
        id: "counselor",
        label: { en: "Counselor" },
      },
      {
        id: "dentist",
        label: { en: "Dentist" },
      },
      {
        id: "dietitian",
        label: { en: "Dietitian" },
      },
      {
        id: "doctor",
        label: { en: "Doctor" },
      },
      {
        id: "language_therapist",
        label: { en: "Language and Speech Therapist" },
      },
      {
        id: "medical_laboratory_technologist",
        label: { en: "Medical Laboratory Technologist" },
      },
      {
        id: "microbiologist",
        label: { en: "Microbiologist" },
      },
      {
        id: "midwife",
        label: { en: "Midwife" },
      },
      {
        id: "nurse",
        label: { en: "Nurse" },
      },
      {
        id: "nutritionist",
        label: { en: "Nutritionist" },
      },
      {
        id: "occupational_therapist",
        label: { en: "Occupational Therapist" },
      },
      {
        id: "optician",
        label: { en: "Optician" },
      },
      {
        id: "pediatrician",
        label: { en: "Pediatrician" },
      },
      {
        id: "pharmacist",
        label: { en: "Pharmacist" },
      },
      {
        id: "physician",
        label: { en: "Physician" },
      },
      {
        id: "physiotherapist",
        label: { en: "Physiotherapist" },
      },
      {
        id: "radiologist",
        label: { en: "Radiologist" },
      },
      {
        id: "surgeon",
        label: { en: "Surgeon" },
      },
      {
        id: "veterinarian",
        label: { en: "Veterinarian" },
      },
    ],
  },
  {
    label: { en: "Fashion / Design / Beauty" },
    id: "fashion_design_beauty",
    content: [
      {
        id: "commercial_photographer",
        label: { en: "Commercial Photographer" },
      },
      {
        id: "creative_director",
        label: { en: "Creative Director" },
      },
      {
        id: "fashion_coordinator",
        label: { en: "Fashion Coordinator" },
      },
      {
        id: "fashion_designer",
        label: { en: "Fashion Designer" },
      },
      {
        id: "graphic_artist",
        label: { en: "Graphic Artist" },
      },
      {
        id: "graphic_designer",
        label: { en: "Graphic Designer" },
      },
      {
        id: "model",
        label: { en: "Model" },
      },
      {
        id: "photographer",
        label: { en: "Photographer" },
      },
      {
        id: "stylist",
        label: { en: "Stylist" },
      },
      {
        id: "technical_designer",
        label: { en: "Technical Designer" },
      },
      {
        id: "textile_fabric_colorist",
        label: { en: "Textile Fabric Colorist" },
      },
    ],
  },
  {
    label: { en: "Agriculture / Environment" },
    id: "agriculture_environment",
    content: [
      {
        id: "agricultural_manager",
        label: { en: "Agricultural Manager" },
      },
      {
        id: "agricultural_specialist",
        label: { en: "Agricultural Specialist" },
      },
      {
        id: "agronomist",
        label: { en: "Agronomist" },
      },
      {
        id: "conservation_planner",
        label: { en: "Conservation Planner" },
      },
      {
        id: "conservationist",
        label: { en: "Conservationist" },
      },
      {
        id: "ecologist",
        label: { en: "Ecologist" },
      },
      {
        id: "horticulturalist",
        label: { en: "Horticulturalist" },
      },
      {
        id: "landscaper",
        label: { en: "Landscaper" },
      },
      {
        id: "municipal_forester",
        label: { en: "Municipal Forester" },
      },
      {
        id: "plant_biologist",
        label: { en: "Plant Biologist" },
      },
      {
        id: "plant_ecologist",
        label: { en: "Plant Ecologist" },
      },
      {
        id: "soil_and_plant_scientist",
        label: { en: "Soil and Plant Scientist" },
      },
      {
        id: "soil_engineer",
        label: { en: "Soil Engineer" },
      },
      {
        id: "water_conservationist",
        label: { en: "Water Conservationist" },
      },
      {
        id: "water_management_planner",
        label: { en: "Water Management Planner" },
      },
      {
        id: "water_quality_specialist",
        label: { en: "Water Quality Specialist" },
      },
      {
        id: "wetlands_biologist",
        label: { en: "Wetlands Biologist" },
      },
      {
        id: "wetlands_designer",
        label: { en: "Wetlands Designer" },
      },
      {
        id: "wildlife_administrator",
        label: { en: "Wildlife Administrator" },
      },
      {
        id: "wildlife_consultant",
        label: { en: "Wildlife Consultant" },
      },
      {
        id: "wildlife_forensics",
        label: { en: "Wildlife Forensics" },
      },
      {
        id: "wildlife_inspector",
        label: { en: "Wildlife Inspector" },
      },
      {
        id: "wildlife_manager",
        label: { en: "Wildlife Manager" },
      },
      {
        id: "wildlife_officer",
        label: { en: "Wildlife Officer" },
      },
    ],
  },
  { label: { en: "Other" }, id: "other" },
];

const genSelectables = (data: Data) => ({
  id: data.id,
  label: data.label.en,
});
export const DATA_INDUSTRY = 
[
  { id: "1", label: {
    en:"Cleaner"
  } },
        { id: "2", label: {
          en:"Care Assistant" 
        }},
        { id: "3", label: {
          en:"Driver"
        } },
        { id: "4", label: {
          en:"Factory Worker"
        } },
        { id:"5", label: {
          en:"Farm Worker" 
        }},
        { id: "6", label: {
          en:"Remote Working"
        } },
        { id: "7", label: {
          en:"Retail"
        } }
]

export const cv_temp = [
  {
    "id": 1,
    "path": "cv-1.svg",
    "label": "CV Template 1"
}
]

export const dumyDataforPosting = [
  {
    id: 1,
    description: "Post Your Jobs",
    amount: "€49"
  },
  {
    id: 2,
    description: "Save with Multiple Jobs",
    amount: "€120"
  }
];
export const cv_guidelines= [
  {
    title: "Step 1",
    description: "Choose the sample template of your interest which represents you well among the other candidates by clicking 'View All Templates.'",
  },
  {
    title: "Step 2",
    description: "Feed your personal, educational, professional, technical, extracurricular, and other relevant information to the selected format.",
  },
  {
    title: "Step 3",
    description: "Double-check your details and click the 'Generate CV' button to automatically create a full sample CV.",
  },
]

export const description = "rechargeables doivent être retirées du produit avant d'être rechargées. Les piles rechargeables ne doivent être rechargées que sous la surveillance d'un adulte. Ne mélangez pas des piles alcalines, standard (carbone-zinc) ou rechargeables Ne melangez jamais des piles usées avec des piles neuves Nutilisez que des piles du même type que celles recommandées ou des piles équivalentes Insérez les piles en respectant les polarités (et) - Retirez toujours les piles usées du produit. Ne court-circuitez pas les bornes des piles. Jetez les piles usées dans un conteneur réservé à cet usage. Ne jetez pas le produit au feu. Les piles incluses pourraient exploser ou couler. In Ausnahmefällen können Batterien auslaufen. Die auslaufende Flüssigkeit kann Verbrennungen verursachen oder das Produkt zerstören. Um ein Auslaufen von Batterien zu vermeiden, beachten Sie bitte folgende Hinweise: Niemals Alkal Batterien, Standardbatterien (Zink-Kohle) oder wiederaufladbare Nickel-Cadmium-Zellen miteinander kombinieren-Niemals alte und neue Batterien zusammen einlegen. Immer alle Batterien zur gleichen Zeit auswechseln. Darauf achten, dass die Batterien in der richtigen Polrichtung (+/-) eingelegt sind. Die Batterien immer herausnehmen, wenn das Produkt längere Zeit nicht benutzt wird. Alte oder verbrauchte Batterien immer aus dem Produkt entfernen, -Das Produkt zum Entsorgen nicht ins Feuer werfen, da die Batterien explodieren oder auslaufen können. Die Anschlussklemmen dürfen nicht kurzgeschlossen werden. Nur Batterien desselben oder eines entsprechenden Batterietyps wie empfohlen verwenden. Nicht wiederaufladbare Batterien dürfen nicht aufgeladen werden, Wiederaufladbare Batterien vor dem Aufladen immer aus dem Produkt herausnehmen. Das Aufladen wiederaufladbarer Batterien darf nur unter Aufsicht eines Erwachsenen durchgeführt werden. Batterien sicher und vorschriftsgemäß entsorgen. In casi eccezionali le pile potrebbero presentare perdite di liquido che possono causare ustioni chimiche o danneggiare il prodotto. Per prevenire le perdite di liquido dalle pile: Non ricaricare pile non ricaricabili. Estrarre le pile ricaricabili dal prodotto prima di ricaricarle Ricaricare le pile ricaricabili solo sotto la supervisione di un adulto. Non mischiare pile alcaline, standard (zinco-carbone) o ricaricabill. Non mischiare pile usate e nuove. Usare solo pile dello stesso tipo o equivalenti, come raccomandato. Le pile devono essere inserite rispettando la corretta polarità (+e-). Estrarre le pile scariche dal prodotto. Non invertire i terminali delle pile. Smaltire le pile in modo appropriato. Non gettare questo prodotto nel fuoco. Le pile all'interno potrebbero esplodere o presentare perdite di liquido. Perfect In uitzonderlijke omstandigheden kan uit batterijen vloeistof lekken die brandwonden kan veroorzaken of het produc onherstelbaar kan beschadigen. Om batterijlekkage te voorkomen: Niet-oplaadbare batterijen mogen niet worden opgeladen. Oplaadbare batterijen uit het speelgoed verwijderen voordat ze worden opgeladen. Oplaadbare batterijen mogen alleen onder toezicht van een volwassene worden opgeladen, Nooit batterijen van een verschillend type bij elkaar gebruiken: alkaline, standaard (koolstof-zink) of oplaadbare batterijen. Nooit oude en nieuwe batterijen bij elkaar gebruiken Gebruik uitsluitend dezelfde of hetzelfde type-batterijen als wordt aanbevolen. Batterijen moeten met de polen (+en+) op de juiste plaats worden geplaatst.- Lege batterijen altijd uit het product verwijderen. Zorg ervoor dat er geen kortsluiting bij de batterijpolen ontstaat. Batterijen inleveren als KCA. Dit product niet in het vuur gooien. De batterijen kunnen dan ontploffen of gaan lekken. your En circunstancias excepcionales, las pilas pueden desprender liquido corrosivo que puede provocar quemaduras o dañar el juguete. Para evitar el derrame de líquido corrosivo: No intentes recargar las pilas no recargables. Saca las p recargables antes de cargarlas. Recarga las pilas recargables siempre bajo la supervisión de un adulto. No mezcles pilas de diferentes tipos: alcalinas, estándar (carbono-cinc) o recargables. No mezcles pilas nuevas con gastadas. Utiliza pilas del t recomendado en las instrucciones o pilas equivalentes. Coloca las pilas según la polaridad indicada (+y). Retira las pilas gastadas del juguete. Evita cortocircuitos en los polos de las pilas. Desecha las pilas gastadas en un contenedor de recicla de pilas No arrojes el juguete al fuego. Las pilas del interior podrían explotar o desprender liquido corrosivo. Em circunstâncias excepcionais, as pilhas/baterias podem vazar e seus fluidos podem causar queimaduras ou danif produto. Para evitar o vazamento das pilhas: ADVERTENCIA! NAO RECARREGAR PILHAS NAO RECARREGÁVEIS. No misture p gastas com novas ou de tipos diferentes: alcalinas, padrão (carbono-zinco) ou recarregáveis. Insira as pilhas conforme ind dentro do compartimento de pilhas (+/4). Remova as pilhas do interior do produto durante longos períodos de não utiliza Sempre retire as pilhas gastas do interior do produto. Descarte as pilhas gastas em local apropriado. Não descarte este pro no fogo. As pilhas no interior do produto podem explodir ou vazar. Nunca ponha os terminais das pilhas em curto-circuit Utilize apenas pilhas do mesmo tipo ou de tipo equivalente, conforme recomendado Remova as pilhas recarregáveis da produto antes de recarregá-las. Se pilhas removíveis e recarregávels forem utilizadas, as mesmas devem ser recarregadas apenas com a supervisão de um adulto. I undantagsfall kan batterierna läcka vätska som kan orsaka frätskador eller förstöra leksaken. Så här undviker du batteriläckage: Ladda Inte batterier som inte är laddningsbara Laddningsbara batterier ska tas ur produkten innan de laddas Laddningsbara batterier får endast laddas under overvakning av en vuxen. Blanda aldrig olika typer av batterier alkaliska med vanliga (kol-zink) eller laddningsbara batterier. Blanda aldrig nya och gamla batterier. Använd endast bat av den typ som rekommenderas, eller motsvarande. Sätt i batterierna med polerna åt rätt häll (+ och -). Ta ut uttjänta b ur leksaken. Batteripolerna får inte kortslutas. Släng batterierna på ett miljövänligt sätt. Försök inte elda upp produkte Batterierna kan explodera eller läcka. Jos paristoja tai akkuja käsittelee väärin, niistä voi vuotaa nesteitä, jotka saattavat aiheuttaa kemiallisen palovamman tai pilata tuotteen. Noudata siksi seuraavia ohjeita:- Alä lataa paristoja uudestaan. Irrota ladattavat a tuotteesta ennen lataamista.- Akut saa ladata vain aikuisen valvonnassa. Älä käytä sekaisin tavallisia paristoja, alkalipar ja ladattavia akkuja. Älä käytä sekaisin eri-ikäisiä paristoja ja akkuja. - Käytä vain suositellun tyyppisiä tai vastaavia paris akkuja. Aseta paristot ja akut kotelon merkkien (+ ja-) mukaisesti. Irrota loppuun kuluneet paristot ja akut Alä kosk aiheuta oikosulkua pariston tai akun napojen välille. Hävitä paristot asianmukaisesti. Ala polta tuotetta. Sen sisällä ole paristot tai akut saattavat räjähtää tai vuotaa. Protect the environment by not disposing of this product or any batteries with household waste. This symb l'environnement: ne jetez pas ce produit ni tout type de piles avec les ordures ménagères, Ce symbole ind recyclage et connaitre les centres de recyclage les plus proches. Schützen Sie die Umwelt, indem Sie dies entsorgt werden darf. Wenden Sie sich bitte an die zuständigen Behörden hinsichtlich der Entsorgung un simbolo indica che il prodotto non rientra nella categoria dei rifiuti domestici. Rivolgersi alle autorità local batterijen niet af via het huishoudafval. Dit symbool geeft aan dat het product niet bij het huishoudafval producto ni las pilas a la basura doméstica. Este simbolo indica que el producto no debe tratarse"
const dummyJobData = [
  {
    id: 1,
    candidate_name: "John Doe",
    job_title_description: "Cleaner Job",
    published_on: "7",
    industry: "1",
    company_name:"Apple",
    location: "canada",
    job_key: "cleaner", // Added job_key
    price_range:"$1000 - $1500",
    roster:"Full Time",
    date_range:"Monday to Friday",
    required_doc:[
      "Driving Licence"
    ],
    features:[
      "easily apply",
      "Hiring multiple candidates",
      "Easily arrange Interviews"
    ],
    main_points:[
      "testing Main point 1",
      "testing Main point 2"
    ]
  },
  {
    id: 2,
    candidate_name: "Jane Smith",
    job_title_description: "Care Assistant Position",
    published_on: "6",
    industry: "2",
    company_name:"Apple",
    location: "dubai",
    job_key: "careAssistant", // Added job_key
    price_range:"$1000 - $1500",
    roster:"Full Time",
    date_range:"Monday to Friday",
    required_doc:[
      "Driving Licence"
    ],features:[
      "easily apply",
      "Hiring multiple candidates",
      "Easily arrange Interviews"
    ],
    main_points:[
      "testing Main point 1",
      "testing Main point 2"
    ]
  },
  {
    id: 3,
    candidate_name: "Alice Johnson",
    job_title_description: "Driver Position",
    published_on: "5",
    industry: "3",
    company_name:"Apple",
    location: "england",
    job_key: "driver", // Added job_key
    price_range:"$1000 - $1500",
    roster:"Full Time",
    date_range:"Monday to Friday",
    required_doc:[
      "Driving Licence"
    ],features:[
      "easily apply",
      "Hiring multiple candidates",
      "Easily arrange Interviews"
    ],
    main_points:[
      "testing Main point 1",
      "testing Main point 2"
    ]
  },
  {
    id: 4,
    candidate_name: "Bob Johnson",
    job_title_description: "Factory Worker Role",
    published_on: "4",
    industry: "4",
    company_name:"Apple",
    location: "romania",
    job_key: "factoryWorker", // Added job_key
    price_range:"$1000 - $1500",
    roster:"Full Time",
    date_range:"Monday to Friday",
    required_doc:[
      "Driving Licence"
    ],features:[
      "easily apply",
      "Hiring multiple candidates",
      "Easily arrange Interviews"
    ],
    main_points:[
      "testing Main point 1",
      "testing Main point 2"
    ]
  },
  {
    id: 5,
    candidate_name: "Eva Williams",
    job_title_description: "Farm Worker Job",
    published_on: "3",
    industry: "5",
    company_name:"Apple",
    location: "newZealand",
    job_key: "farmWorker", // Added job_key
    price_range:"$1000 - $1500",
    roster:"Full Time",
    date_range:"Monday to Friday",
    required_doc:[
      "Driving Licence"
    ],
    features:[
      "easily apply",
      "Hiring multiple candidates",
      "Easily arrange Interviews"
    ],
    main_points:[
      "testing Main point 1",
      "testing Main point 2"
    ]
  },
  {
    id: 6,
    candidate_name: "Mike Adams",
    job_title_description: "Remote Working Opportunity",
    published_on: "2",
    industry: "6",
    company_name:"Apple",
    location: "canada",
    job_key: "remoteWorking", // Added job_key
    price_range:"$1000 - $1500",
    roster:"Full Time",
    date_range:"Monday to Friday",
    required_doc:[
      "Driving Licence"
    ],
    features:[
      "easily apply",
      "Hiring multiple candidates",
      "Easily arrange Interviews"
    ],
    main_points:[
      "testing Main point 1",
      "testing Main point 2"
    ]
  },
  {
    id: 7,
    candidate_name: "Sarah Davis",
    job_title_description: "Retail Sales Associate",
    published_on: "1",
    industry: "7",
    company_name:"Apple",
    location: "dubai",
    job_key: "retail", // Added job_key
    price_range:"$1000 - $1500",
    roster:"Full Time",
    date_range:"Monday to Friday",
    required_doc:[
      "Driving Licence"
    ],
    features:[
      "easily apply",
      "Hiring multiple candidates",
      "Easily arrange Interviews"
    ],
    main_points:[
      "testing Main point 1",
      "testing Main point 2"
    ]
  },
  // Add more job card data for other industries as needed
];



export default dummyJobData;

export const getJobTitle = (
  industry: Data["id"],
  jobTitle?: Data["id"],
  code?: keyof Language
) => {
  return DATA_FILTERS.find((ind) => ind.id === industry)?.content?.find(
    (job) => job.id === jobTitle
  )?.label?.[code ?? "en"];
};
