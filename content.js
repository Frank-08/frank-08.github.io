/* =====================================================================
   Privileged User Training (PUT) - Bayside City Council
   COURSE CONTENT & SETTINGS
   ---------------------------------------------------------------------
   VIDEO LINKS: paste a SharePoint / Stream EMBED URL between the quotes
   in "video" for each module. Leave it empty ("") to show the
   placeholder panel. Nothing else needs to change.
   ---------------------------------------------------------------------
   HANDS-ON LAB: see the LAB block below. Paste the console URL for
   this training run into "consoleUrl" (leave empty to show a "your
   trainer will provide this" note instead). "flag" is the exact value
   learners must type in to pass this step - update it here only, it
   does not need to change anywhere else.
   ===================================================================== */

var COURSE = {
  title: "Privileged User Training (PUT)",
  org: "Bayside City Council",
  passMark: 80,           // percent required to pass the final exam
  contacts: [
    { name: "IT Service Desk", role: "First point of contact for reporting", email: "servicedesk@bayside.vic.gov.au" },
    { name: "Jacob Westley", role: "Coordinator IT Infrastructure", email: "jwestley@bayside.vic.gov.au" },
    { name: "Julian Adler", role: "Chief Information Officer", email: "jadler@bayside.vic.gov.au" }
  ]
};

var MODULES = [
  /* ------------------------------------------------------------------ */
  {
    id: "m1",
    title: "Introduction and Cyber Resilience",
    video: "https://baysidecitycouncil.sharepoint.com/sites/PUT/_layouts/15/embed.aspx?UniqueId=878a24a0-9983-4210-99c2-29cd858d8749&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
    videoFile: "1. Introduction and Cyber Resilience",
    intro: "This module introduces the cyber threat landscape, how quickly it changes, and why organisations must move from reacting to threats to proactively defending against them.",
    points: [
      ["You hold the keys to the kingdom", "Privileged users can make significant changes and access sensitive information. If your account is compromised, the damage can reach well beyond your own area of responsibility."],
      ["Exploitation is faster than ever", "The time it takes attackers to exploit a vulnerability once it is discovered has shrunk dramatically, leaving organisations less time to react."],
      ["More adversaries, more motives", "State-sponsored actors, organised crime, opportunistic hackers, thrill seekers and disgruntled insiders all target organisations. Their motives differ, but the impact can be equally devastating."],
      ["Be proactive, not reactive", "A proactive security mindset means anticipating and mitigating threats <em>before</em> an incident, by thinking like an attacker to find weaknesses in systems and processes."],
      ["Defence in depth is the gold standard", "No single control is infallible. Layering technical, administrative and physical controls creates multiple obstacles for attackers."],
      ["Test your resilience", "Awareness alone is not enough. Systems should undergo regular security assessments, penetration tests and incident response exercises."],
      ["Zero-days are serious, not hopeless", "A zero-day is a software or hardware flaw unknown to the vendor. Good practice will not stop every zero-day, but it limits damage and helps you detect, respond and recover faster."]
    ],
    forYou: "Cyber security is no longer just an IT problem. Whether you approve payments, manage payroll or administer a business system, the way you use your access every day matters.",
    check: {
      q: "Which statement best describes a proactive security mindset?",
      options: [
        "Anticipating threats and fixing weaknesses before an incident, by thinking like an attacker",
        "Putting new security measures in place after an incident has been investigated",
        "Leaving security decisions entirely to the IT team",
        "Relying on antivirus software to stop every attack"
      ],
      answer: 0,
      feedback: "A proactive mindset shifts us from reacting after an incident to anticipating and reducing threats beforehand, often by thinking like an adversary."
    }
  },
  /* ------------------------------------------------------------------ */
  {
    id: "m2",
    title: "Understanding How Attackers Think and Target Your Organisation",
    video: "https://baysidecitycouncil.sharepoint.com/sites/PUT/_layouts/15/embed.aspx?UniqueId=46158138-7451-4e46-b61c-5519ecabd3d7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
    videoFile: "2. Understanding how attackers think and target your organisation",
    intro: "This module asks you to view your organisation through an attacker's eyes, walking through the stages of a targeted intrusion and the easy paths attackers look for.",
    points: [
      ["Attackers take the easy path", "Rather than use a valuable zero-day, attackers will exploit poor security basics such as unpatched software or weak passwords. The tools and knowledge to attack are increasingly accessible."],
      ["Stage 0 - Reconnaissance", "Attackers research the organisation and its people: roles, online presence, suppliers and critical systems. They may watch a target for months."],
      ["Stage 1 - Breach", "Entry through unpatched systems, phishing emails with malicious links or attachments, or 'watering hole' websites that have been infected."],
      ["Stage 2 - Lateral movement", "Once inside, attackers use stolen passwords, password cracking or techniques like pass-the-hash to move around and hunt for valuable data."],
      ["Stage 3 - Execution", "Data is packaged and sent out through normal-looking channels, backdoors are planted for future access, and ransomware may lock data or destroy backups."],
      ["Favourite ways in", "Weak protocols, weak or reused passwords, misconfigured systems, missing patches and <strong>excessive privileges</strong> - giving people more access than they need is like handing out master keys."],
      ["Cyber worthiness", "The ability of an organisation to withstand and recover from cyber attacks while maintaining its current level of operations."],
      ["There is no silver bullet", "No single product stops every attack. Layered, complementary controls slow attackers down and trip them up."]
    ],
    forYou: "Information on the Council website, LinkedIn and social media can be used to target you personally. Suppliers and contractors with access to our systems are also a route in.",
    check: {
      q: "What is the typical order of stages in a targeted cyber intrusion?",
      options: [
        "Reconnaissance, breach, lateral movement, execution",
        "Breach, reconnaissance, execution, lateral movement",
        "Lateral movement, breach, reconnaissance, execution",
        "Execution, reconnaissance, breach, lateral movement"
      ],
      answer: 0,
      feedback: "Attackers first research the target (reconnaissance), get in (breach), move around the network (lateral movement) and then achieve their goal (execution)."
    }
  },
  /* ------------------------------------------------------------------ */
  {
    id: "m3",
    title: "Defence in Depth and Tool Management",
    video: "https://baysidecitycouncil.sharepoint.com/sites/PUT/_layouts/15/embed.aspx?UniqueId=b6e95fe8-5765-4efa-aff8-664c69908d87&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
    videoFile: "3. Defence in depth and tool management",
    intro: "Using the castle analogy, this module explains how overlapping layers of security slow attackers down, and why security tools must be selected, tuned and tested.",
    points: [
      ["The castle analogy", "A moat, drawbridge, several walls and guard towers - each layer an attacker must overcome slows them down and buys time to detect and respond."],
      ["Three kinds of controls", "<strong>Technical</strong> (firewalls, anti-malware, MFA), <strong>physical</strong> (access control, cameras, secure storage) and <strong>governance</strong> (policies, risk assessments, incident response plans)."],
      ["Assume breaches will happen", "Defence in depth is not only about prevention; it limits the impact of the breaches that do occur."],
      ["Tools are only one piece", "Tools must be considered, tuned and testable. What suits a multinational bank may be overkill for a small organisation - start from your own assets, threats and obligations."],
      ["Alert fatigue", "Too many false positives desensitise people, so a real event can be missed. Regularly review and fine-tune tool settings."],
      ["Don't set and forget", "A firewall with outdated rules or a scanner not updated for months is practically useless. Schedule maintenance and log reviews."],
      ["People and testing matter", "Tools cannot replace human expertise. Use penetration testing and red teaming, track meaningful metrics and keep clear lines of responsibility."]
    ],
    forYou: "Controls overlap outside IT too: a payment approval workflow, a locked office and a clear policy are all layers. Bypassing one 'just this once' removes a layer for everyone.",
    check: {
      q: "Apart from preventing attacks, what is a key benefit of defence in depth?",
      options: [
        "It slows attackers down, buying time to detect and respond",
        "It removes the need for staff training",
        "It means only one control needs to be maintained",
        "It guarantees no breach will ever occur"
      ],
      answer: 0,
      feedback: "Each layer an attacker must get through slows them down, giving the organisation more time to detect, react and limit the damage."
    }
  },
  /* ------------------------------------------------------------------ */
  {
    id: "m4",
    title: "Hardening Data and Reducing Risk",
    video: "https://baysidecitycouncil.sharepoint.com/sites/PUT/_layouts/15/embed.aspx?UniqueId=eaf8fdde-fb05-47d7-85e8-829a61d24110&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
    videoFile: "4. Hardening data and reducing risks",
    intro: "This module reviews common security failures, essential mitigation strategies such as ASD's Essential Eight, and how to manage privileged access safely.",
    points: [
      ["Common failures", "Missing patches, misconfigurations, <strong>shared administrator accounts</strong>, no network segmentation, legacy protocols, weak passwords, no antivirus/EDR, no testing, and key system passwords never changed."],
      ["Shared accounts hide accountability", "Shared admin accounts make it hard to track who did what, and if the shared password leaks, attackers gain widespread access."],
      ["Essential mitigations", "Based on frameworks including ASD's Essential Eight: application control, rapid patching (critical, actively exploited flaws within 24-48 hours - if you can't patch it, isolate it), vulnerability management and least privilege."],
      ["Universal, phishing-resistant MFA", "MFA is required for all user access, not just remote access - ideally phishing-resistant options like FIDO2 security keys or authenticator apps."],
      ["Separate your admin work", "Never do day-to-day tasks with an admin account. Use a separate privileged account on a dedicated admin workstation or jump server - no email or web browsing there."],
      ["Stop access creep", "Keeping access from previous roles ('gradual access accrual') is a risk. Privileged Access Management (PAM) stores admin credentials, logs their use, time-limits access and rotates passwords."],
      ["Backups: the 3-2-1-1-0 rule", "Three copies of data, on two different media, one offsite, one offline/air-gapped or immutable, and zero errors after recovery testing."]
    ],
    forYou: "Least privilege applies to everyone: if you change roles, ask for access you no longer need to be removed. Never share your login, and use your privileged access only for the task that needs it.",
    check: {
      q: "You're reading email on your everyday account and need to make a change that requires admin rights. What is best practice?",
      options: [
        "Use a separate privileged account, ideally on a dedicated admin workstation or jump server",
        "Give your everyday account permanent admin rights to save time",
        "Borrow a colleague's shared admin login",
        "Make the change quickly, then check email with the admin account afterwards"
      ],
      answer: 0,
      feedback: "Privileged tasks should use a separate account on a dedicated, locked-down machine. Everyday activities like email and browsing should never be done with admin rights."
    }
  },
  /* ------------------------------------------------------------------ */
  {
    id: "m5",
    title: "Risk Management and Compliance",
    video: "https://baysidecitycouncil.sharepoint.com/sites/PUT/_layouts/15/embed.aspx?UniqueId=fcbb76aa-c045-4e9b-a1e0-13ab525183cb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
    videoFile: "6. Risk management and compliance",
    intro: "This module shows how risk management supports decision-making, why compliance is not the same as security, and the range of adversaries organisations face.",
    points: [
      ["Why risk management matters", "It prioritises effort, formalises decision-making and gives a clear way to communicate technical risk to non-technical executives."],
      ["Who owns the risk", "The business (senior responsible officer) owns the overall risk. Cyber security specialists and privileged users provide the expertise, solutions and options."],
      ["Speak the business's language", "Avoid jargon, focus on business impact, and use visual aids like risk matrices and dashboards."],
      ["Risk appetite and ALARP", "ALARP - 'as low as reasonably practical' - is a common starting point for deciding how much risk is acceptable."],
      ["Compliance is not security", "Compliance shows you met a standard's requirements - often the minimum. It can create a false sense of security and does not remove the system owner's responsibility."],
      ["Know yourself", "Know the value of your data, who has access to it (including vendors), where it is located, who protects it and how well."],
      ["Know the adversary", "Foreign intelligence services and advanced persistent threats, cyber criminals, issue-motivated groups, trusted insiders and hackers."],
      ["Simple threat modelling", "What am I building? What can go wrong? What am I going to do about it? Did I do a decent job of analysis?"]
    ],
    forYou: "You know your systems and data best. If you're unsure about Council's risk arrangements, talk to the IT team, your risk manager or audit.",
    check: {
      q: "Your team's system passed a compliance audit. What does this mean?",
      options: [
        "It met the requirements of that standard, but that does not guarantee it is secure",
        "The system is now fully protected against all threats",
        "The team no longer needs to consider new risks",
        "Responsibility for the system passes to the auditor"
      ],
      answer: 0,
      feedback: "Compliance validates that a standard's requirements were met - often a minimum level. New threats outside the standard still need to be identified and managed."
    }
  },
  /* ------------------------------------------------------------------ */
  {
    id: "m6",
    title: "System Baselines, Logging Activity and Incident Response",
    video: "https://baysidecitycouncil.sharepoint.com/sites/PUT/_layouts/15/embed.aspx?UniqueId=b4d6b53e-18b3-4bb7-ae24-dcc8ce3af11b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
    videoFile: "7. System baselines, logging activity and incident response",
    intro: "This module covers knowing what 'normal' looks like, creating meaningful logs, the difference between events, alerts and incidents, and your role in incident response.",
    points: [
      ["Know your baseline", "A database administrator stopped a major attack because he knew what was normal for his system and spotted rogue queries. You see your systems every day - you know what looks wrong."],
      ["Share and standardise", "A baseline only in your head is no good - document it. Use standard builds and report deviations so they're tracked to resolution."],
      ["Central, meaningful logs", "Central log storage is better than local storage, because a compromised host's logs can be tampered with. Log what matters and give it context (e.g. who is 'user 74'?)."],
      ["Event", "A detectable occurrence - for example, a single failed login."],
      ["Alert", "Events that meet a threshold and need attention - for example, multiple failed logins in a short period."],
      ["Incident", "Something identified as bad that causes or may cause disruption. Not every alert is an incident - human analysis makes the final call."],
      ["Your role in an incident", "If something doesn't look right, contact security - incident response is not yours to lead. Don't log on to investigate or email the affected person; you could tip off the attacker."],
      ["Stay calm, be part of the team", "If security contacts you about your system, it's not a personal attack. Work through the problem together."]
    ],
    forYou: "At Bayside, report anything suspicious to the IT Service Desk (servicedesk@bayside.vic.gov.au), and follow the guidance you are given.",
    check: {
      q: "You notice unusual activity on a system you manage and suspect it may be compromised. What should you do first?",
      options: [
        "Report it to IT / the Service Desk and follow their guidance",
        "Email the affected user to tell them their account has been hacked",
        "Log on to the system yourself and start investigating",
        "Wait a few days to see whether it happens again"
      ],
      answer: 0,
      feedback: "Report it and let the security team lead the response. Acting alone - such as emailing the user or logging on to investigate - could alert the attacker."
    }
  },
  /* ------------------------------------------------------------------ */
  {
    id: "m7",
    title: "Security Culture and Operational Excellence",
    video: "https://baysidecitycouncil.sharepoint.com/sites/PUT/_layouts/15/embed.aspx?UniqueId=1c864304-cd42-4e65-b72b-a274ae00339c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
    videoFile: "8. Security culture and operational excellence",
    intro: "This module explores how shared values and behaviours shape security, and introduces the six pillars of operational excellence.",
    points: [
      ["What security culture is", "The shared values, beliefs and behaviours that shape how an organisation approaches security. 'Culture eats strategy for breakfast.'"],
      ["Why it matters", "It helps identify threats, protects trust and reputation, drives continuous improvement and reduces the cost of breaches."],
      ["How culture is built", "Role models, explicit messages in policies and procedures, incentives for good risk behaviour, and the everyday symbols and actions of senior leaders."],
      ["1. Formality", "Precise, standardised communication - e.g. asking for a penetration test and receiving a vulnerability assessment gives the wrong picture."],
      ["2. Procedural compliance", "Follow written procedures in the right order every time. If a procedure seems flawed, stop, investigate and formally correct it."],
      ["3. Level of knowledge", "Continuous learning, with clear knowledge standards assessed regardless of position."],
      ["4. Questioning attitude", "Ask: What's the expected outcome? What could go wrong? What are the early warning signs? How will I respond?"],
      ["5. Forceful backup", "Speak up about unsafe practices - even if it means challenging a senior team member or decision-maker."],
      ["6. Integrity", "Honesty, transparency and accountability - including readily admitting mistakes."]
    ],
    forYou: "Leaders and privileged users are role models. When you follow the process - even under pressure - others notice and follow.",
    check: {
      q: "Which pillar of operational excellence describes speaking up about an unsafe practice, even when it means challenging a senior person?",
      options: [
        "Forceful backup",
        "Formality",
        "Procedural compliance",
        "Level of knowledge"
      ],
      answer: 0,
      feedback: "Forceful backup means actively supporting teammates and intervening when you see a risk - regardless of seniority. Security is everyone's responsibility."
    }
  },
  /* ------------------------------------------------------------------ */
  {
    id: "m8",
    title: "Social Engineering, AI and Future Technologies",
    video: "https://baysidecitycouncil.sharepoint.com/sites/PUT/_layouts/15/embed.aspx?UniqueId=5368eca1-2717-4973-8897-1d99944fd9d8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create",
    videoFile: "9. Social engineering, AI and future technologies",
    intro: "This module explores how attackers exploit human psychology, defensive techniques such as sandboxing and OSINT, and emerging issues in AI security and quantum-safe cryptography.",
    points: [
      ["Phishing preys on good qualities", "Trust, fear of consequences, ambition and a sense of obligation. Even well-trained people won't spot every phish."],
      ["Cialdini's seven principles", "Reciprocation, commitment and consistency, social proof, liking, <strong>authority</strong>, <strong>scarcity</strong> (urgency) and unity - all used by attackers."],
      ["Your digital footprint", "Org charts, social media and innocent-looking posts help attackers craft targeted spear-phishing. Some build trust slowly over time (the 'long con')."],
      ["Privileged accounts are the prize", "If you read email or browse with a privileged account, any malicious code runs with your elevated rights."],
      ["Sandboxing", "Suspicious files are run in an isolated environment to observe what they do without risking real systems."],
      ["OSINT", "Open-source intelligence gives early warning of threats, finds exposed weaknesses and profiles attacker techniques."],
      ["AI security", "New risks include data poisoning, prompt injection and model stealing. Everyday users must <strong>not</strong> put non-public information into external AI services."],
      ["Quantum-safe cryptography", "'Harvest now, decrypt later' means data needing long-term confidentiality is already at risk. Legacy cryptography should be phased out by the end of 2030."]
    ],
    forYou: "Urgent requests that appear to come from a senior leader - especially to change bank details, make a payment or share staff data - are a classic attack. Verify using contact details you already know, not those in the message.",
    check: {
      q: "An email appearing to come from the CEO demands an urgent payment be made within 30 minutes. Which psychological triggers is it mainly using?",
      options: [
        "Authority and scarcity (urgency)",
        "Reciprocation and liking",
        "Social proof and unity",
        "Commitment and consistency"
      ],
      answer: 0,
      feedback: "Impersonating a senior leader uses authority, and the tight deadline creates urgency (scarcity) - pushing you to act before you think."
    }
  }
];

/* ---------------------------------------------------------------------
   FINAL EXAM - 15 questions. Order of questions and answers is
   shuffled on every attempt. "answer" is the index of the correct option.
   --------------------------------------------------------------------- */
var EXAM = [
  { topic: "Introduction and Cyber Resilience",
    q: "Why are privileged users a prime target for attackers?",
    options: ["Their elevated access means a compromised account can cause widespread damage",
              "They always use weaker passwords than other staff",
              "Their accounts are not protected by any security controls",
              "They are the only staff who receive email from outside the organisation"], answer: 0 },
  { topic: "Understanding How Attackers Think",
    q: "What is an 'N-day' vulnerability?",
    options: ["A flaw that is known to the vendor but has not yet been patched",
              "A flaw that is completely unknown to the vendor",
              "A flaw that can only be exploited on a specific day",
              "A flaw that has been patched on every system"], answer: 0 },
  { topic: "Understanding How Attackers Think",
    q: "What does 'cyber worthiness' mean?",
    options: ["The ability to withstand and recover from cyber attacks while maintaining current operations",
              "Having passed a cyber security compliance audit",
              "The dollar value of an organisation's security tools",
              "Having no known vulnerabilities in any system"], answer: 0 },
  { topic: "Hardening Data and Reducing Risk / Privileged access",
    q: "A staff member moved from Payroll to Customer Service six months ago but can still access the payroll system. What is the right action?",
    options: ["Request that the access they no longer need be removed",
              "Leave it in place in case they are asked to help Payroll",
              "Share their payroll login with the new payroll officer",
              "Nothing - access only matters if it is misused"], answer: 0 },
  { topic: "Defence in Depth",
    q: "Defence in depth combines which three types of controls?",
    options: ["Technical, physical and governance",
              "Antivirus, firewall and backup",
              "Internal, external and cloud",
              "Preventive, punitive and financial"], answer: 0 },
  { topic: "Defence in Depth and Tool Management",
    q: "What is the main risk of 'alert fatigue'?",
    options: ["People become desensitised by false positives and may miss a real attack",
              "Security tools stop generating alerts altogether",
              "Alerts are sent to the wrong email address",
              "The organisation runs out of storage for logs"], answer: 0 },
  { topic: "Hardening Data and Reducing Risk",
    q: "Why are shared administrator accounts a security problem?",
    options: ["You can't tell who did what, and one leaked password gives widespread access",
              "They are more expensive to licence",
              "They cannot be used with MFA under any circumstances",
              "They make systems run more slowly"], answer: 0 },
  { topic: "Hardening Data and Reducing Risk",
    q: "In the 3-2-1-1-0 backup rule, what does the '0' stand for?",
    options: ["Zero errors after automated recovery testing",
              "Zero copies kept onsite",
              "Zero days of data loss allowed",
              "Zero people with access to backups"], answer: 0 },
  { topic: "Hardening Data and Reducing Risk",
    q: "Which statement about multi-factor authentication (MFA) reflects current best practice?",
    options: ["MFA should apply to all user access, ideally phishing-resistant such as FIDO2 security keys",
              "MFA is only needed when working remotely",
              "MFA is only needed for IT staff",
              "SMS codes are the strongest form of MFA available"], answer: 0 },
  { topic: "Hardening Data and Reducing Risk",
    q: "A critical vulnerability is being actively exploited and a patch is available. What is the expectation?",
    options: ["Patch within 24-48 hours; if it can't be patched, isolate the system",
              "Patch at the next quarterly maintenance window",
              "Wait until another organisation reports being attacked",
              "Patch only if the system is internet-facing"], answer: 0 },
  { topic: "Risk Management and Compliance",
    q: "Who ultimately owns the overall risk to the organisation?",
    options: ["The business / senior responsible officer, with privileged users providing expertise and options",
              "The privileged user who administers the system",
              "The software vendor",
              "The external auditor"], answer: 0 },
  { topic: "Social Engineering",
    q: "You receive an urgent email, apparently from a known supplier, asking to update their bank account details today. What should you do?",
    options: ["Verify the request using contact details you already hold, and report it if suspicious",
              "Reply to the email to confirm the new details",
              "Update the details straight away so the supplier isn't paid late",
              "Call the phone number listed in the email"], answer: 0 },
  { topic: "System Baselines, Logging and Incident Response",
    q: "A system flags multiple failed logins on one account within five minutes. This is best described as:",
    options: ["An alert - a threshold has been met and it needs human analysis",
              "A confirmed incident requiring the system to be shut down",
              "A single event that can be ignored",
              "Proof that the account has been compromised"], answer: 0 },
  { topic: "System Baselines, Logging and Incident Response",
    q: "Why is storing logs centrally better than storing them only on the local system?",
    options: ["If the local system is compromised, its logs may be tampered with",
              "Central storage means no-one needs to review the logs",
              "Local logs cannot record failed logins",
              "Central storage removes the need for backups"], answer: 0 },
  { topic: "Social Engineering, AI and Future Technologies",
    q: "Which of these is appropriate when using external (public) AI tools?",
    options: ["Never enter non-public Council information such as staff, customer or financial data",
              "Paste in confidential reports to get a quicker summary",
              "Use your privileged account so the AI can access more systems",
              "Share passwords with the AI so it can help troubleshoot"], answer: 0 }
];

/* ---------------------------------------------------------------------
   ATTESTATION - learner must tick every statement to complete.
   --------------------------------------------------------------------- */
var ATTESTATION = [
  "I understand that my privileged access carries extra responsibility and that misuse or compromise of my account can seriously harm Council.",
  "I will use my privileged access only for authorised tasks that require it, and never for everyday activities such as email or web browsing.",
  "I will never share my credentials or use shared accounts, and I will use multi-factor authentication wherever it is available.",
  "I will request removal of any access I no longer need, including when I change roles.",
  "I will follow Council policies and procedures, and speak up when I see unsafe practices.",
  "I will promptly report suspected security incidents or suspicious requests to the IT Service Desk and follow the guidance I'm given."
];

/* ---------------------------------------------------------------------
   HANDS-ON LAB - "Follow the Attacker". consoleUrl: paste the link for
   this training run (leave "" to show a placeholder note). flag: the
   exact value learners must enter to complete this step.
   --------------------------------------------------------------------- */
var LAB = {
  title: "Hands-on: Follow the Attacker",
  consoleUrl: "http://192.168.5.69:8090/guacamole/",
  flag: "FLAG-LAB-COMPLETE-7CPYG6K",
  intro: "The modules covered how attackers think. Now do it yourself, against a safe, self-contained practice environment built for this course. Nothing here is a real system - every account, password and \"vulnerability\" is synthetic and exists only inside this lab.",
  steps: [
    ["1. Access the lab", "Open the console link above and sign in with the login your trainer gave you. You'll land directly in a terminal on the attacker machine - no setup required."],
    ["2. Find the web server", "Scan the lab network to find the exposed service:<pre>nmap -sV 10.50.10.0/24</pre>Look for the host with TCP port 8080 open - this is web01 (10.50.10.25 in the default lab instance; your trainer will confirm the address if yours differs)."],
    ["3. Inspect the application", "<pre>curl http://10.50.10.25:8080/ </pre>" "<pre> curl http://10.50.10.25:8080/cgi-bin/diagnostic?cmd=help </pre>"],
    ["4. Exploit the guided flaw", "Run a harmless identity command, then read the staged support note:<pre>curl \"http://10.50.10.25:8080/cgi-bin/diagnostic?cmd=whoami\"\ncurl \"http://10.50.10.25:8080/cgi-bin/diagnostic?cmd=read-support-note\"</pre>Record the returned <code>websupport</code> password."],
    ["5. Use the recovered credentials", "<pre>ssh websupport@10.50.10.25\ncat README.txt</pre>Accept the host key and enter the recovered password. README.txt gives the APP01 username and a password hash - it needs cracking before you can use it."],
    ["6. Crack the recovered hash", "Copy the hash into a file on the attacker host and run a dictionary attack against it:<pre>echo '&lt;paste the hash here&gt;' &gt; hash.txt\nhashcat -m 0 -a 0 hash.txt /usr/share/wordlists/common.txt</pre>This recovers the plain-text APP01 password in seconds."],
    ["7. Move to the internal server", "From your web01 session:<pre>ssh authority_sync@app01\ncat FINAL.txt</pre>FINAL.txt contains the completion flag - enter it below."]
  ],
  takeaways: [
    "Discover an exposed service.",
    "Exploit one weakness.",
    "Use access to find credentials.",
    "Crack a weak or reused password hash offline.",
    "Reuse credentials to reach another system.",
    "Several small gaps can form a complete attack path."
  ]
};
