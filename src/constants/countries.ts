export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

export const DATA_COUNTRIES: readonly CountryType[] = [
  { label: "Afghanistan", phone: "+93", code: "AF" },
  { label: "Aland Islands", phone: "+358", code: "AX" },
  { label: "Albania", phone: "+355", code: "AL" },
  { label: "Algeria", phone: "+213", code: "DZ" },
  { label: "American Samoa", phone: "+1684", code: "AS" },
  { label: "Andorra", phone: "+376", code: "AD" },
  { label: "Angola", phone: "+244", code: "AO" },
  { label: "Anguilla", phone: "+1264", code: "AI" },
  { label: "Antarctica", phone: "+672", code: "AQ" },
  { label: "Antigua and Barbuda", phone: "+1268", code: "AG" },
  { label: "Argentina", phone: "+54", code: "AR" },
  { label: "Armenia", phone: "+374", code: "AM" },
  { label: "Aruba", phone: "+297", code: "AW" },
  { label: "Ascension Island", phone: "+247", code: "AC" },
  { label: "Australia", phone: "+61", code: "AU" },
  { label: "Austria", phone: "+43", code: "AT" },
  { label: "Azerbaijan", phone: "+994", code: "AZ" },
  { label: "Bahamas", phone: "+1242", code: "BS" },
  { label: "Bahrain", phone: "+973", code: "BH" },
  { label: "Bangladesh", phone: "+880", code: "BD" },
  { label: "Barbados", phone: "+1246", code: "BB" },
  { label: "Belarus", phone: "+375", code: "BY" },
  { label: "Belgium", phone: "+32", code: "BE" },
  { label: "Belize", phone: "+501", code: "BZ" },
  { label: "Benin", phone: "+229", code: "BJ" },
  { label: "Bermuda", phone: "+1441", code: "BM" },
  { label: "Bhutan", phone: "+975", code: "BT" },
  { label: "Bolivia", phone: "+591", code: "BO" },
  { label: "Bosnia and Herzegovina", phone: "+387", code: "BA" },
  { label: "Botswana", phone: "+267", code: "BW" },
  { label: "Brazil", phone: "+55", code: "BR" },
  { label: "British Indian Ocean Territory", phone: "+246", code: "IO" },
  { label: "Brunei Darussalam", phone: "+673", code: "BN" },
  { label: "Bulgaria", phone: "+359", code: "BG" },
  { label: "Burkina Faso", phone: "+226", code: "BF" },
  { label: "Burundi", phone: "+257", code: "BI" },
  { label: "Cambodia", phone: "+855", code: "KH" },
  { label: "Cameroon", phone: "+237", code: "CM" },
  { label: "Canada", phone: "+1", code: "CA" },
  { label: "Cape Verde", phone: "+238", code: "CV" },
  { label: "Cayman Islands", phone: "+1345", code: "KY" },
  { label: "Central African Republic", phone: "+236", code: "CF" },
  { label: "Chad", phone: "+235", code: "TD" },
  { label: "Chile", phone: "+56", code: "CL" },
  { label: "China", phone: "+86", code: "CN" },
  { label: "Christmas Island", phone: "+61", code: "CX" },
  { label: "Cocos (Keeling) Islands", phone: "+61", code: "CC" },
  { label: "Colombia", phone: "+57", code: "CO" },
  { label: "Comoros", phone: "+269", code: "KM" },
  { label: "Congo", phone: "+242", code: "CG" },
  { label: "Cook Islands", phone: "+682", code: "CK" },
  { label: "Costa Rica", phone: "+506", code: "CR" },
  { label: "Croatia", phone: "+385", code: "HR" },
  { label: "Cuba", phone: "+53", code: "CU" },
  { label: "Cyprus", phone: "+357", code: "CY" },
  { label: "Czech Republic", phone: "+420", code: "CZ" },
  { label: "Democratic Republic of the Congo", phone: "+243", code: "CD" },
  { label: "Denmark", phone: "+45", code: "DK" },
  { label: "Djibouti", phone: "+253", code: "DJ" },
  { label: "Dominica", phone: "+1767", code: "DM" },
  { label: "Dominican Republic", phone: "+1849", code: "DO" },
  { label: "Ecuador", phone: "+593", code: "EC" },
  { label: "Egypt", phone: "+20", code: "EG" },
  { label: "El Salvador", phone: "+503", code: "SV" },
  { label: "Equatorial Guinea", phone: "+240", code: "GQ" },
  { label: "Eritrea", phone: "+291", code: "ER" },
  { label: "Estonia", phone: "+372", code: "EE" },
  { label: "Eswatini", phone: "+268", code: "SZ" },
  { label: "Ethiopia", phone: "+251", code: "ET" },
  { label: "Falkland Islands (Malvinas)", phone: "+500", code: "FK" },
  { label: "Faroe Islands", phone: "+298", code: "FO" },
  { label: "Fiji", phone: "+679", code: "FJ" },
  { label: "Finland", phone: "+358", code: "FI" },
  { label: "France", phone: "+33", code: "FR" },
  { label: "French Guiana", phone: "+594", code: "GF" },
  { label: "French Polynesia", phone: "+689", code: "PF" },
  { label: "Gabon", phone: "+241", code: "GA" },
  { label: "Gambia", phone: "+220", code: "GM" },
  { label: "Georgia", phone: "+995", code: "GE" },
  { label: "Germany", phone: "+49", code: "DE" },
  { label: "Ghana", phone: "+233", code: "GH" },
  { label: "Gibraltar", phone: "+350", code: "GI" },
  { label: "Greece", phone: "+30", code: "GR" },
  { label: "Greenland", phone: "+299", code: "GL" },
  { label: "Grenada", phone: "+1473", code: "GD" },
  { label: "Guadeloupe", phone: "+590", code: "GP" },
  { label: "Guam", phone: "+1671", code: "GU" },
  { label: "Guatemala", phone: "+502", code: "GT" },
  { label: "Guernsey", phone: "+44", code: "GG" },
  { label: "Guinea", phone: "+224", code: "GN" },
  { label: "Guinea-Bissau", phone: "+245", code: "GW" },
  { label: "Guyana", phone: "+592", code: "GY" },
  { label: "Haiti", phone: "+509", code: "HT" },
  { label: "Holy See (Vatican City State)", phone: "+379", code: "VA" },
  { label: "Honduras", phone: "+504", code: "HN" },
  { label: "Hong Kong", phone: "+852", code: "HK" },
  { label: "Hungary", phone: "+36", code: "HU" },
  { label: "Iceland", phone: "+354", code: "IS" },
  { label: "India", phone: "+91", code: "IN" },
  { label: "Indonesia", phone: "+62", code: "ID" },
  { label: "Iran", phone: "+98", code: "IR" },
  { label: "Iraq", phone: "+964", code: "IQ" },
  { label: "Ireland", phone: "+353", code: "IE" },
  { label: "Isle of Man", phone: "+44", code: "IM" },
  { label: "Israel", phone: "+972", code: "IL" },
  { label: "Italy", phone: "+39", code: "IT" },
  { label: "Ivory Coast / Cote d'Ivoire", phone: "+225", code: "CI" },
  { label: "Jamaica", phone: "+1876", code: "JM" },
  { label: "Japan", phone: "+81", code: "JP" },
  { label: "Jersey", phone: "+44", code: "JE" },
  { label: "Jordan", phone: "+962", code: "JO" },
  { label: "Kazakhstan", phone: "+77", code: "KZ" },
  { label: "Kenya", phone: "+254", code: "KE" },
  { label: "Kiribati", phone: "+686", code: "KI" },
  {
    label: "Korea, Democratic People's Republic of Korea",
    phone: "+850",
    code: "KP",
  },
  { label: "Korea, Republic of South Korea", phone: "+82", code: "KR" },
  { label: "Kosovo", phone: "+383", code: "XK" },
  { label: "Kuwait", phone: "+965", code: "KW" },
  { label: "Kyrgyzstan", phone: "+996", code: "KG" },
  { label: "Laos", phone: "+856", code: "LA" },
  { label: "Latvia", phone: "+371", code: "LV" },
  { label: "Lebanon", phone: "+961", code: "LB" },
  { label: "Lesotho", phone: "+266", code: "LS" },
  { label: "Liberia", phone: "+231", code: "LR" },
  { label: "Libya", phone: "+218", code: "LY" },
  { label: "Liechtenstein", phone: "+423", code: "LI" },
  { label: "Lithuania", phone: "+370", code: "LT" },
  { label: "Luxembourg", phone: "+352", code: "LU" },
  { label: "Macau", phone: "+853", code: "MO" },
  { label: "Madagascar", phone: "+261", code: "MG" },
  { label: "Malawi", phone: "+265", code: "MW" },
  { label: "Malaysia", phone: "+60", code: "MY" },
  { label: "Maldives", phone: "+960", code: "MV" },
  { label: "Mali", phone: "+223", code: "ML" },
  { label: "Malta", phone: "+356", code: "MT" },
  { label: "Marshall Islands", phone: "+692", code: "MH" },
  { label: "Martinique", phone: "+596", code: "MQ" },
  { label: "Mauritania", phone: "+222", code: "MR" },
  { label: "Mauritius", phone: "+230", code: "MU" },
  { label: "Mayotte", phone: "+262", code: "YT" },
  { label: "Mexico", phone: "+52", code: "MX" },
  {
    label: "Micronesia, Federated States of Micronesia",
    phone: "+691",
    code: "FM",
  },
  { label: "Moldova", phone: "+373", code: "MD" },
  { label: "Monaco", phone: "+377", code: "MC" },
  { label: "Mongolia", phone: "+976", code: "MN" },
  { label: "Montenegro", phone: "+382", code: "ME" },
  { label: "Montserrat", phone: "+1664", code: "MS" },
  { label: "Morocco", phone: "+212", code: "MA" },
  { label: "Mozambique", phone: "+258", code: "MZ" },
  { label: "Myanmar", phone: "+95", code: "MM" },
  { label: "Namibia", phone: "+264", code: "NA" },
  { label: "Nauru", phone: "+674", code: "NR" },
  { label: "Nepal", phone: "+977", code: "NP" },
  { label: "Netherlands", phone: "+31", code: "NL" },
  { label: "Netherlands Antilles", phone: "+599", code: "AN" },
  { label: "New Caledonia", phone: "+687", code: "NC" },
  { label: "New Zealand", phone: "+64", code: "NZ" },
  { label: "Nicaragua", phone: "+505", code: "NI" },
  { label: "Niger", phone: "+227", code: "NE" },
  { label: "Nigeria", phone: "+234", code: "NG" },
  { label: "Niue", phone: "+683", code: "NU" },
  { label: "Norfolk Island", phone: "+672", code: "NF" },
  { label: "North Macedonia", phone: "+389", code: "MK" },
  { label: "Northern Mariana Islands", phone: "+1670", code: "MP" },
  { label: "Norway", phone: "+47", code: "NO" },
  { label: "Oman", phone: "+968", code: "OM" },
  { label: "Pakistan", phone: "+92", code: "PK" },
  { label: "Palau", phone: "+680", code: "PW" },
  { label: "Palestine", phone: "+970", code: "PS" },
  { label: "Panama", phone: "+507", code: "PA" },
  { label: "Papua New Guinea", phone: "+675", code: "PG" },
  { label: "Paraguay", phone: "+595", code: "PY" },
  { label: "Peru", phone: "+51", code: "PE" },
  { label: "Philippines", phone: "+63", code: "PH" },
  { label: "Pitcairn", phone: "+872", code: "PN" },
  { label: "Poland", phone: "+48", code: "PL" },
  { label: "Portugal", phone: "+351", code: "PT" },
  { label: "Puerto Rico", phone: "+1939", code: "PR" },
  { label: "Qatar", phone: "+974", code: "QA" },
  { label: "Reunion", phone: "+262", code: "RE" },
  { label: "Romania", phone: "+40", code: "RO" },
  { label: "Russia", phone: "+7", code: "RU" },
  { label: "Rwanda", phone: "+250", code: "RW" },
  { label: "Saint Barthelemy", phone: "+590", code: "BL" },
  {
    label: "Saint Helena, Ascension and Tristan Da Cunha",
    phone: "+290",
    code: "SH",
  },
  { label: "Saint Kitts and Nevis", phone: "+1869", code: "KN" },
  { label: "Saint Lucia", phone: "+1758", code: "LC" },
  { label: "Saint Martin", phone: "+590", code: "MF" },
  { label: "Saint Pierre and Miquelon", phone: "+508", code: "PM" },
  { label: "Saint Vincent and the Grenadines", phone: "+1784", code: "VC" },
  { label: "Samoa", phone: "+685", code: "WS" },
  { label: "San Marino", phone: "+378", code: "SM" },
  { label: "Sao Tome and Principe", phone: "+239", code: "ST" },
  { label: "Saudi Arabia", phone: "+966", code: "SA" },
  { label: "Senegal", phone: "+221", code: "SN" },
  { label: "Serbia", phone: "+381", code: "RS" },
  { label: "Seychelles", phone: "+248", code: "SC" },
  { label: "Sierra Leone", phone: "+232", code: "SL" },
  { label: "Singapore", phone: "+65", code: "SG" },
  { label: "Sint Maarten", phone: "+1721", code: "SX" },
  { label: "Slovakia", phone: "+421", code: "SK" },
  { label: "Slovenia", phone: "+386", code: "SI" },
  { label: "Solomon Islands", phone: "+677", code: "SB" },
  { label: "Somalia", phone: "+252", code: "SO" },
  { label: "South Africa", phone: "+27", code: "ZA" },
  {
    label: "South Georgia and the South Sandwich Islands",
    phone: "+500",
    code: "GS",
  },
  { label: "South Sudan", phone: "+211", code: "SS" },
  { label: "Spain", phone: "+34", code: "ES" },
  { label: "Sri Lanka", phone: "+94", code: "LK" },
  { label: "Sudan", phone: "+249", code: "SD" },
  { label: "Surilabel", phone: "+597", code: "SR" },
  { label: "Svalbard and Jan Mayen", phone: "+47", code: "SJ" },
  { label: "Sweden", phone: "+46", code: "SE" },
  { label: "Switzerland", phone: "+41", code: "CH" },
  { label: "Syrian Arab Republic", phone: "+963", code: "SY" },
  { label: "Taiwan", phone: "+886", code: "TW" },
  { label: "Tajikistan", phone: "+992", code: "TJ" },
  { label: "Tanzania, United Republic of Tanzania", phone: "+255", code: "TZ" },
  { label: "Thailand", phone: "+66", code: "TH" },
  { label: "Timor-Leste", phone: "+670", code: "TL" },
  { label: "Togo", phone: "+228", code: "TG" },
  { label: "Tokelau", phone: "+690", code: "TK" },
  { label: "Tonga", phone: "+676", code: "TO" },
  { label: "Trinidad and Tobago", phone: "+1868", code: "TT" },
  { label: "Tunisia", phone: "+216", code: "TN" },
  { label: "Turkey", phone: "+90", code: "TR" },
  { label: "Turkmenistan", phone: "+993", code: "TM" },
  { label: "Turks and Caicos Islands", phone: "+1649", code: "TC" },
  { label: "Tuvalu", phone: "+688", code: "TV" },
  { label: "Uganda", phone: "+256", code: "UG" },
  { label: "Ukraine", phone: "+380", code: "UA" },
  { label: "United Arab Emirates", phone: "+971", code: "AE" },
  { label: "United Kingdom", phone: "+44", code: "GB" },
  { label: "United States", phone: "+1", code: "US" },
  { label: "United States Minor Outlying Islands", phone: "+246", code: "UMI" },
  { label: "Uruguay", phone: "+598", code: "UY" },
  { label: "Uzbekistan", phone: "+998", code: "UZ" },
  { label: "Vanuatu", phone: "+678", code: "VU" },
  {
    label: "Venezuela, Bolivarian Republic of Venezuela",
    phone: "+58",
    code: "VE",
  },
  { label: "Vietnam", phone: "+84", code: "VN" },
  { label: "Virgin Islands, British", phone: "+1284", code: "VG" },
  { label: "Virgin Islands, U.S.", phone: "+1340", code: "VI" },
  { label: "Wallis and Futuna", phone: "+681", code: "WF" },
  { label: "Yemen", phone: "+967", code: "YE" },
  { label: "Zambia", phone: "+260", code: "ZM" },
  { label: "Zimbabwe", phone: "+263", code: "ZW" },
];

export const getCountry = (code: string) =>
  DATA_COUNTRIES.find((c) => c.code === code);