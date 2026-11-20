/**
 * Bilingual plain-language translations dictionary for Arzi
 * English (en) and Hindi (hi)
 */
export const TRANSLATIONS = {
  en: {
    // Navigation
    reportAnIssue: 'Report an issue',
    myReports: 'My reports',
    howItWorks: 'How it works',
    city: 'City',
    screenView: 'Screen View:',
    jurisdictionLabel: 'Official Public Services Portal • Delhi NCT & Ghaziabad',
    
    // Common Actions
    continueToLocation: 'Continue to location',
    confirmLocation: 'Confirm location',
    prepareFiling: 'Prepare official portal filing',
    openPortal: 'Open official portal',
    enterTicketId: 'I have submitted • Enter ticket ID',
    startTrackingTicket: 'Start tracking this ticket',
    back: 'Back',
    copy: 'COPY',
    copied: 'COPIED',
    copyAll: 'Copy All Fields',
    paste: 'PASTE',
    pasted: 'PASTED!',
    yesFixed: 'Yes, fixed',
    stillBroken: 'Still broken',
    closeTimeline: 'Close timeline',
    viewTimeline: 'View timeline',
    hideTimeline: 'Hide timeline',

    // Privacy Disclosure (Plain language everywhere)
    privacyDisclosure:
      'Who can see this: Your photo and report details are sent only to the responsible municipal department and will be visible on the public registry without your personal contact info.',
    portalPrivacyDisclosure:
      'Who can see this: Once you paste this into the official government portal, the portal\'s administrative terms apply.',
    trackingPrivacyDisclosure:
      'Who can see this: Used by Arzi to check the official portal weekly and notify you of progress.',
    myReportsPrivacyDisclosure:
      'Who can see this: Stored on your device and linked to your registered mobile number for official verification.',

    // Prototype Simulation Notice
    prototypeNotice:
      'Prototype Notice: Automated reminders, SMS alerts, and 72-hour follow-up checks are simulated in this prototype for demonstration.',

    // Categories
    cat_damaged_road: 'Damaged road',
    cat_overflowing_garbage: 'Overflowing garbage',
    cat_fallen_tree: 'Fallen tree',
    cat_broken_traffic_signal: 'Broken traffic signal',

    // Severities
    sev_urgent: 'Urgent',
    sev_high: 'High',
    sev_moderate: 'Moderate',
    sev_routine: 'Routine',

    // Screen 1: Home
    homeTitle: 'Report a civic problem to the right authority.',
    homeSubtitle:
      'Delhi and Ghaziabad have multiple overlapping municipal departments, development authorities, and public works divisions. Arzi finds who is legally responsible for your exact spot, drafts the official complaint text, and hands you the portal fields ready to copy.',
    homePrimaryAction: 'Report an issue',
    homeLookupPrompt: 'Already have a portal reference number?',
    homeLookupSub: 'Check remediation status or log a ticket received from the government portal.',
    homeLookupButton: 'View my reports',

    // Screen 2: Capture
    captureStep: 'Step 1 of 4 • Photo & Issue Note',
    captureTitle: 'Tell us what you saw',
    captureSubtitle:
      'Take or attach a clear photo. Camera location and device tags are removed from your photo for privacy, and a plain complaint description is drafted for your review.',
    incidentPhotoLabel: 'Incident Photo',
    privacyCleanBadge: 'Privacy Protected (Device Tags Removed)',
    uploadNewPhoto: 'Upload / Snap New Photo',
    testSamples: 'Test Sample:',
    categoryLabel: 'What type of issue is this?',
    severityLabel: 'How urgent is this problem?',
    descriptionLabel: 'Complaint note for the authority',
    descriptionHint: 'Written in direct administrative language. You can change any word.',
    editableBadge: 'EDITABLE',

    // Screen 3: Location
    locationStep: 'Step 2 of 4 • Location & Ward',
    locationTitle: 'Confirm where this happened',
    locationSubtitle:
      'We matched the photo location to the official municipal map. Check that the street name and landmark are accurate.',
    presetLocationLabel: 'Preset Roadway in Directory',
    streetAddressLabel: 'Street Address / Road Name',
    landmarkLabel: 'Prominent Landmark',
    landmarkHelper: 'Helps the field junior engineer locate the exact road segment quickly.',

    // Screen 4: Review
    reviewStep: 'Step 3 of 4 • Check Filing Details',
    reviewTitle: 'Check your report before we find the authority',
    reviewSubtitle:
      'Arzi organized your photo and location into formal administrative language matched directly to the responsible body.',
    complaintSubjectLabel: 'Official Complaint Subject',
    formalTextLabel: 'Formal Complaint Text',
    responsibleBodyLabel: 'Legally Responsible Department',
    reasonLabel: 'Why this authority:',

    // Screen 5: Handoff
    handoffStep: 'Step 4 of 4 • Copy-Assist Mode',
    handoffTitle: 'Your filing is ready for the municipal portal',
    handoffSubtitle:
      'Use the copy-assist cards below to paste each prepared field directly into the official portal. The authority\'s portal link sits beside your fields for rapid completion.',
    fieldsDossierTitle: '5 Fields Ready for Official Portal',
    portalTargetLabel: 'Designated Portal Target',
    procedureHeading: 'Filing Procedure (3 Quick Steps)',
    procedure1: 'Click Open Official Portal to launch government intake form.',
    procedure2: 'Tap COPY on each field and paste into the matching box.',
    procedure3: 'Submit form on portal and note down the receipt/docket ID.',
    finishedPrompt: 'Finished submitting on portal?',

    // Screen 6: Log Ticket
    logTicketTitle: 'Enter the reference number from the portal',
    logTicketSubtitle:
      'After submitting your complaint on the municipal portal, paste the receipt or ticket number below so Arzi can track it and follow up until it is fixed.',
    ticketIdLabel: 'Portal Reference Number / Ticket ID',
    ticketIdHelper: 'Tap PASTE to insert the ticket ID copied from the government portal confirmation page.',
    dateSubmittedLabel: 'Date of Submission on Official Portal',
    phoneLabel: 'Citizen Mobile Phone for Status Alerts',

    // Screen 7: My Reports
    myReportsTitle: 'Issues you are tracking',
    myReportsSubtitle:
      'Track active municipal investigations, vertical audit timelines, and response deadlines.',
    simulateReminderLabel: 'Simulate Timed Notification:',
    triggerDay3: 'Trigger 72h Reminder ("Is it fixed?")',
    resetDockets: 'Reset Demo Dockets',
    filterAll: 'All Dockets',
    filterUrgent: 'Urgent / Reopened',
    filterReview: 'Under Review',
    filterResolved: 'Remediated & Closed',

    // Reminder Box
    reminderBadge: 'Simulated Reminder • 72 Hours Elapsed',
    isItFixedTitle: 'Is it fixed?',
    isItFixedQuestion:
      'Municipal field workers were dispatched 3 days ago. Have municipal teams completed the physical repair at this spot?',
    confirmedFixedTitle: 'Resolution Confirmed by Citizen',
    confirmedFixedSub:
      'You confirmed this issue has been remediated. Case docket marked verified in the public registry.',
    escalationStepTitle: 'Recommended Next Escalation Step',
    escalationStepHeading:
      'Formal Escalation to Superintending Engineer under Section 14 Public Works Charter',
    escalationStepDesc:
      'The mandatory 72-hour repair window has expired without on-site resolution. Under municipal public safety regulations, Arzi will draft and serve an immediate appellate docket to the Executive Engineer for contractor penalties.',
    serveEscalationButton: 'Serve Formal Escalation Docket →',
    fixedInMeantime: 'Issue was fixed in the meantime',
    timelineHeader: 'Official Vertical Status Timeline',

    // Screen: How It Works
    howItWorksBadge: 'Process Overview',
    howItWorksHeading: 'How Arzi works',
    howItWorksSub:
      'Arzi is not another social petition. It is an administrative routing tool that puts the right paperwork directly onto the desk of the responsible municipal officer.',
    howStep1Title: 'Snap a photo and confirm the location',
    howStep1Body:
      'Take a clear picture of the broken road, garbage pile, or water leak. Arzi extracts the GPS coordinates and matches them to official municipal ward maps in Delhi and Ghaziabad.',
    howStep2Title: 'Arzi finds who is responsible and drafts the complaint',
    howStep2Body:
      'Delhi and Ghaziabad have over ten overlapping civic bodies (MCD, PWD, DDA, GNN, GDA, DJB). Arzi determines the exact nodal division legally accountable for that square meter and turns your note into formal administrative language.',
    howStep3Title: 'Copy the prepared fields into the official portal',
    howStep3Body:
      'Arzi hands you the exact fields—category, ward, location, narrative—with 1-tap copy buttons. Paste them into the government portal (like GNN 311 or MCD 311) and submit.',
    howStep4Title: 'Enter your receipt number and Arzi follows up',
    howStep4Body:
      'Log your portal reference number in Arzi. We audit the government system every 48 hours. If the department marks it closed without proper field repair, we help you reopen it under the Citizen Charter.',
    howPrivacyDisclosure:
      'Who can see this: Your reports are private until you submit them to the government portal. Official submissions become matter of public record under the Public Records Act.',

    // Screen: City Coverage
    cityBadge: 'Territorial Coverage & Gazette',
    cityHeading: 'Municipal routing & city coverage',
    citySub:
      'Look up which municipal body holds legal responsibility for fallen trees, damaged roads, overflowing garbage, and broken traffic signals across Delhi and Ghaziabad.',
    citySummaryTitle: 'NCR Regional Status Summary',
    cityGazetteIndex: 'Official Gazette Index',
    cityDelhiActive: 'Active • 250 Wards',
    cityDelhiDesc:
      'MCD (Colony streets <60ft, sanitation, parks), PWD (Arterial corridors >60ft), Delhi Jal Board, Delhi Traffic Police.',
    cityGzbActive: 'Active • 100 Wards',
    cityGzbDesc:
      'Ghaziabad Nagar Nigam (Zones I–V), Ghaziabad Development Authority (Master plan layouts), UP Jal Nigam.',
    cityNoidaDesc:
      'NOIDA Authority sector administration and sanitation engineering wings currently being surveyed.',
    cityGurugramDesc:
      'Municipal Corporation of Gurugram (MCG) and GMDA road maintenance divisions in verification.',
    cityPrivacyDisclosure:
      'Who can see this: Official directories are sourced from municipal gazette notifications and citizen charters.',
    comingSoon: 'Coming soon',
  },

  hi: {
    // Navigation
    reportAnIssue: 'समस्या दर्ज करें',
    myReports: 'मेरी शिकायतें',
    howItWorks: 'यह कैसे काम करता है',
    city: 'शहर',
    screenView: 'स्क्रीन देखें:',
    jurisdictionLabel: 'नागरिक सेवा पोर्टल • दिल्ली राष्ट्रीय राजधानी क्षेत्र एवं गाज़ियाबाद',

    // Common Actions
    continueToLocation: 'स्थान की पुष्टि के लिए आगे बढ़ें',
    confirmLocation: 'स्थान की पुष्टि करें',
    prepareFiling: 'सरकारी पोर्टल के लिए दस्तावेज़ तैयार करें',
    openPortal: 'सरकारी पोर्टल खोलें',
    enterTicketId: 'फॉर्म जमा कर दिया • टिकट नंबर दर्ज करें',
    startTrackingTicket: 'इस टिकट को ट्रैक करना शुरू करें',
    back: 'वापस जाएं',
    copy: 'कॉपी करें',
    copied: 'कॉपी हो गया!',
    copyAll: 'सभी विवरण कॉपी करें',
    paste: 'पेस्ट करें',
    pasted: 'पेस्ट हो गया!',
    yesFixed: 'हाँ, ठीक हो गया',
    stillBroken: 'अभी भी टूटा हुआ है',
    closeTimeline: 'समय-रेखा बंद करें',
    viewTimeline: 'समय-रेखा देखें',
    hideTimeline: 'समय-रेखा छुपाएं',

    // Privacy Disclosure (Plain language everywhere)
    privacyDisclosure:
      'यह कौन देख सकता है: आपकी फ़ोटो और शिकायत का विवरण केवल संबंधित सरकारी विभाग को भेजा जाता है। आपका फ़ोन नंबर कभी सार्वजनिक नहीं किया जाएगा।',
    portalPrivacyDisclosure:
      'यह कौन देख सकता है: एक बार जब आप इसे सरकारी पोर्टल में पेस्ट कर देते हैं, तो पोर्टल के नियम लागू होते हैं।',
    trackingPrivacyDisclosure:
      'यह कौन देख सकता है: अर्ज़ी इसका उपयोग हर हफ़्ते सरकारी पोर्टल पर प्रगति की जांच करने और आपको सूचित करने के लिए करती है।',
    myReportsPrivacyDisclosure:
      'यह कौन देख सकता है: यह जानकारी आपके फ़ोन पर सुरक्षित है और सत्यापन के लिए आपके पंजीकृत मोबाइल नंबर से जुड़ी है।',

    // Prototype Simulation Notice
    prototypeNotice:
      'प्रोटोटाइप सूचना: स्वचालित 72-घंटे के रिमाइंडर, एसएमएस और प्रगति जांच इस प्रोटोटाइप में प्रदर्शन के लिए सिमुलेट किए गए हैं।',

    // Categories
    cat_damaged_road: 'टूटी सड़क / गड्ढा',
    cat_overflowing_garbage: 'कचरे का ढेर',
    cat_fallen_tree: 'गिरा हुआ पेड़',
    cat_broken_traffic_signal: 'खराब ट्रैफ़िक सिग्नल',

    // Severities
    sev_urgent: 'अति आवश्यक (खतरा)',
    sev_high: 'गंभीर',
    sev_moderate: 'सामान्य',
    sev_routine: 'नियमित',

    // Screen 1: Home
    homeTitle: 'नागरिक समस्याओं को सही सरकारी विभाग तक पहुंचाएं।',
    homeSubtitle:
      'दिल्ली और गाज़ियाबाद में कई अलग-अलग नगर निगम और विकास प्राधिकरण हैं। अर्ज़ी यह पता लगाती है कि आपकी जगह के लिए कौन सा विभाग ज़िम्मेदार है, शिकायत का सही मसौदा तैयार करती है, और आपको सीधे पोर्टल में भरने के लिए तैयार विवरण देती है।',
    homePrimaryAction: 'समस्या दर्ज करें',
    homeLookupPrompt: 'क्या आपके पास पहले से कोई टिकट या रसीद नंबर है?',
    homeLookupSub: 'अपनी पुरानी शिकायत की स्थिति जांचें या पोर्टल से मिला नंबर दर्ज करें।',
    homeLookupButton: 'मेरी शिकायतें देखें',

    // Screen 2: Capture
    captureStep: 'चरण 1 का 4 • फ़ोटो और विवरण',
    captureTitle: 'आपने क्या देखा, हमें बताएं',
    captureSubtitle:
      'समस्या की एक साफ़ फ़ोटो लें। आपकी गोपनीयता के लिए कैमरे की लोकेशन और डिवाइस की जानकारी हटा दी जाती है, और आपके लिए एक साफ़ शिकायत तैयार की जाती है।',
    incidentPhotoLabel: 'समस्या की फ़ोटो',
    privacyCleanBadge: 'गोपनीयता सुरक्षित (डिवाइस डेटा हटाया गया)',
    uploadNewPhoto: 'नई फ़ोटो अपलोड करें / खींचें',
    testSamples: 'उदाहरण जांचें:',
    categoryLabel: 'यह किस प्रकार की समस्या है?',
    severityLabel: 'यह समस्या कितनी गंभीर है?',
    descriptionLabel: 'अधिकारियों के लिए शिकायत का विवरण',
    descriptionHint: 'यह आधिकारिक भाषा में लिखा गया है। आप कोई भी शब्द बदल सकते हैं।',
    editableBadge: 'संपादन योग्य',

    // Screen 3: Location
    locationStep: 'चरण 2 का 4 • स्थान और वार्ड',
    locationTitle: 'स्थान की पुष्टि करें',
    locationSubtitle:
      'हमने फ़ोटो के स्थान का मिलान नगर निगम के वार्ड नक्शे से किया है। कृपया जांचें कि सड़क का नाम और नज़दीकी लैंडमार्क सही हैं।',
    presetLocationLabel: 'सत्यापित स्थानों में से चुनें',
    streetAddressLabel: 'सड़क या इलाके का नाम',
    landmarkLabel: 'नज़दीकी पहचान (लैंडमार्क)',
    landmarkHelper: 'इससे नगर निगम की टीम को सही जगह पहुंचने में आसानी होती है।',

    // Screen 4: Review
    reviewStep: 'चरण 3 का 4 • विवरण की समीक्षा',
    reviewTitle: 'विभाग को भेजने से पहले अपनी शिकायत जांचें',
    reviewSubtitle:
      'अर्ज़ी ने आपकी फ़ोटो और स्थान को औपचारिक सरकारी भाषा में बदल दिया है जो सीधे ज़िम्मेदार विभाग से मेल खाती है।',
    complaintSubjectLabel: 'शिकायत का विषय',
    formalTextLabel: 'तैयार किया गया शिकायत पत्र',
    responsibleBodyLabel: 'क़ानूनी रूप से ज़िम्मेदार विभाग',
    reasonLabel: 'यह विभाग क्यों ज़िम्मेदार है:',

    // Screen 5: Handoff
    handoffStep: 'चरण 4 का 4 • कॉपी-असिस्ट',
    handoffTitle: 'आपकी शिकायत सरकारी पोर्टल में दर्ज करने के लिए तैयार है',
    handoffSubtitle:
      'नीचे दिए गए विवरणों को 1-टैप में कॉपी करें और साथ में दिए गए सरकारी पोर्टल लिंक को खोलकर उसमें पेस्ट करें।',
    fieldsDossierTitle: 'सरकारी पोर्टल के लिए 5 तैयार विवरण',
    portalTargetLabel: 'अपेक्षित सरकारी पोर्टल',
    procedureHeading: 'जमा करने की 3 आसान प्रक्रियाएं',
    procedure1: 'सरकारी फॉर्म खोलने के लिए "सरकारी पोर्टल खोलें" पर क्लिक करें।',
    procedure2: 'प्रत्येक बॉक्स के आगे "कॉपी" दबाएं और पोर्टल के सही स्थान में पेस्ट करें।',
    procedure3: 'पोर्टल पर फॉर्म जमा करें और रसीद या टिकट नंबर नोट करें।',
    finishedPrompt: 'पोर्टल पर फॉर्म जमा कर दिया?',

    // Screen 6: Log Ticket
    logTicketTitle: 'पोर्टल से मिला रसीद नंबर दर्ज करें',
    logTicketSubtitle:
      'सरकारी पोर्टल पर शिकायत दर्ज करने के बाद मिली रसीद या एसएमएस का नंबर यहाँ पेस्ट करें ताकि अर्ज़ी समस्या हल होने तक इसका पालन कर सके।',
    ticketIdLabel: 'पोर्टल रसीद नंबर / टिकट आईडी',
    ticketIdHelper: 'सरकारी पोर्टल की रसीद से कॉपी किया गया नंबर डालने के लिए "पेस्ट करें" दबाएं।',
    dateSubmittedLabel: 'पोर्टल पर जमा करने की तारीख',
    phoneLabel: 'सूचना के लिए आपका मोबाइल नंबर',

    // Screen 7: My Reports
    myReportsTitle: 'आपकी दर्ज की गई शिकायतें',
    myReportsSubtitle:
      'सक्रिय जांच, समय-सीमा और सरकारी अधिकारियों द्वारा की गई कार्रवाई देखें।',
    simulateReminderLabel: 'सिमुलेटेड सूचना जांचें:',
    triggerDay3: '72-घंटे का रिमाइंडर शुरू करें ("क्या यह ठीक हुआ?")',
    resetDockets: 'डेमो रीसेट करें',
    filterAll: 'सभी शिकायतें',
    filterUrgent: 'अति आवश्यक / दोबारा खुली',
    filterReview: 'जांच जारी',
    filterResolved: 'हल की गई',

    // Reminder Box
    reminderBadge: 'सिमुलेटेड रिमाइंडर • 72 घंटे पूरे हुए',
    isItFixedTitle: 'क्या यह ठीक हो गया?',
    isItFixedQuestion:
      'नगर निगम की टीम को 3 दिन पहले भेजा गया था। क्या कर्मचारियों ने इस जगह पर मरम्मत का काम पूरा कर दिया है?',
    confirmedFixedTitle: 'नागरिक द्वारा समाधान की पुष्टि',
    confirmedFixedSub:
      'आपने पुष्टि की है कि समस्या हल हो गई है। इसे सरकारी रिकॉर्ड में बंद कर दिया गया है।',
    escalationStepTitle: 'अनुशंसित अगला कदम (अपील)',
    escalationStepHeading:
      'पब्लिक वर्क्स चार्टर की धारा 14 के तहत अधीक्षण अभियंता को औपचारिक शिकायत',
    escalationStepDesc:
      'अनिवार्य 72-घंटे की समय सीमा समाप्त हो गई है और काम पूरा नहीं हुआ। अर्ज़ी अब अधिशासी अभियंता को ठेकेदार पर कार्रवाई के लिए औपचारिक नोटिस भेजेगी।',
    serveEscalationButton: 'उच्च अधिकारी को औपचारिक शिकायत भेजें →',
    fixedInMeantime: 'इस बीच समस्या ठीक हो गई थी',
    timelineHeader: 'सरकारी प्रगति समय-रेखा',

    // Screen: How It Works
    howItWorksBadge: 'प्रक्रिया का संक्षिप्त विवरण',
    howItWorksHeading: 'अर्ज़ी कैसे काम करती है',
    howItWorksSub:
      'अर्ज़ी कोई साधारण सोशल मीडिया याचिका नहीं है। यह एक प्रशासनिक साधन है जो सही कागजी कार्रवाई सीधे ज़िम्मेदार नगर निगम अधिकारी की मेज़ पर पहुंचाती है।',
    howStep1Title: 'फ़ोटो खींचें और स्थान की पुष्टि करें',
    howStep1Body:
      'टूटी सड़क, कचरे के ढेर या पानी के रिसाव की एक साफ़ तस्वीर लें। अर्ज़ी इसके स्थान का दिल्ली और गाज़ियाबाद के आधिकारिक नगर निगम वार्ड के नक्शों से मिलान करती है।',
    howStep2Title: 'अर्ज़ी ज़िम्मेदार विभाग ढूंढती है और शिकायत तैयार करती है',
    howStep2Body:
      'दिल्ली और गाज़ियाबाद में 10 से अधिक अलग-अलग विभाग हैं (MCD, PWD, DDA, GNN, GDA, DJB)। अर्ज़ी सटीक ज़िम्मेदार विभाग को चिन्हित करती है और आपकी बात को औपचारिक प्रशासनिक भाषा में लिखती है।',
    howStep3Title: 'तैयार किए गए विवरणों को सरकारी पोर्टल में कॉपी करें',
    howStep3Body:
      'अर्ज़ी आपको श्रेणी, वार्ड, स्थान और शिकायत का विवरण 1-टैप कॉपी बटन के साथ देती है। इन्हें सरकारी पोर्टल (जैसे GNN 311 या MCD 311) में पेस्ट करें और जमा करें।',
    howStep4Title: 'रसीद नंबर दर्ज करें और अर्ज़ी कार्रवाई पर नज़र रखेगी',
    howStep4Body:
      'पोर्टल से मिला टिकट नंबर अर्ज़ी में दर्ज करें। हम हर 48 घंटे में प्रगति की जांच करते हैं। यदि विभाग बिना काम किए शिकायत बंद करता है, तो हम नागरिक चार्टर के तहत इसे दोबारा खुलवाते हैं।',
    howPrivacyDisclosure:
      'यह कौन देख सकता है: जब तक आप इसे सरकारी पोर्टल पर जमा नहीं करते, आपकी रिपोर्ट निजी रहती है। आधिकारिक प्रस्तुतियां लोक अभिलेख अधिनियम के तहत सार्वजनिक रिकॉर्ड का हिस्सा बनती हैं।',

    // Screen: City Coverage
    cityBadge: 'क्षेत्रीय अधिकार क्षेत्र एवं सरकारी राजपत्र',
    cityHeading: 'नगर निगम क्षेत्राधिकार एवं शहर की जानकारी',
    citySub:
      'जांचें कि दिल्ली और गाज़ियाबाद में गिरे पेड़, टूटी सड़क, कचरे के ढेर और खराब ट्रैफ़िक सिग्नल के लिए कौन सा नगर निगम विभाग क़ानूनी रूप से ज़िम्मेदार है।',
    citySummaryTitle: 'एनसीआर क्षेत्रीय स्थिति सारांश',
    cityGazetteIndex: 'आधिकारिक राजपत्र अनुक्रमणिका',
    cityDelhiActive: 'सक्रिय • 250 वार्ड',
    cityDelhiDesc:
      'एमसीडी (60 फीट से छोटी गलियां, सफाई, पार्क), पीडब्ल्यूडी (60 फीट से चौड़ी मुख्य सड़कें), दिल्ली जल बोर्ड, दिल्ली ट्रैफिक पुलिस।',
    cityGzbActive: 'सक्रिय • 100 वार्ड',
    cityGzbDesc:
      'गाज़ियाबाद नगर निगम (ज़ोन 1-5), गाज़ियाबाद विकास प्राधिकरण (मास्टर प्लान लेआउट), यूपी जल निगम।',
    cityNoidaDesc:
      'नोएडा प्राधिकरण के सेक्टर प्रशासन और स्वच्छता इंजीनियरिंग प्रभाग का सर्वेक्षण चल रहा है।',
    cityGurugramDesc:
      'गुरुग्राम नगर निगम (MCG) और जीएमडीए सड़क रखरखाव प्रभाग का सत्यापन जारी है।',
    cityPrivacyDisclosure:
      'यह कौन देख सकता है: आधिकारिक निर्देशिकाएं नगर निगम के राजपत्र और नागरिक अधिकार पत्र से ली गई हैं।',
    comingSoon: 'जल्द आ रहा है',
  },
};
