document.addEventListener('DOMContentLoaded', function() {
    const facultyMembers = document.querySelectorAll('.faculty-member');
    const modal = document.getElementById('facultyModal');
    const closeModal = document.querySelector('.close-modal');
    const sectionBtns = document.querySelectorAll('.section-btn');
    
    // Section switching functionality
    sectionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.dataset.section;
            
            // Update button states
            sectionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update section visibility
            document.querySelectorAll('.staff-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // Faculty data matching the HTML structure
    const facultyData = {
        'prashant': {
            name: 'Dr. Prashant Mishra',
            position: 'Assistant Professor',
            email: 'prashant@prutismedu.in',
            qualifications: 'Ph.D. from Shri JJT University, Rajasthan',
            expertise: 'Management Studies, Research Methodology',
            image: '/static/images/default-profile.png',
            about: 'Dr. Prashant Mishra has 7 years of teaching experience and 2 years in the labelling & packaging industry. He started as a management trainee and switched to the education industry. Currently serving as Assistant Professor at PRUTISM.',
            teachings: [
                'Management Studies',
                'Research Methodology',
                'Business Strategy',
                'Operations Management'
            ],
            publications: [
                'Research papers published in national journals',
                'Research papers published in international journals',
                'Various academic contributions in management studies'
            ],
            awards: [
                'Attended many Faculty Development Programs (FDP)',
                'Ph.D. completion from prestigious university',
                'Industry-Academia transition achievement'
            ]
        },
        'duvannahdan': {
            name: 'Mr. Duvannahdan Nadar',
            position: 'Assistant Professor',
            email: 'duvannahdan@prutismedu.in',
            qualifications: 'BMS (Marketing), LLB, MBA, Ph.D. in progress (Dayanand College), NET qualified',
            expertise: 'Marketing, Teaching, Research',
            image: '/static/images/default-profile.png',
            about: 'Mr. Duvannahdan Nadar is an educator and researcher with 8 years of total experience in academic and corporate sectors. He is NET qualified and currently pursuing Ph.D. from Dayanand College.',
            teachings: [
                'Marketing Management',
                'Business Law',
                'Research Methodology',
                'Consumer Behavior'
            ],
            publications: [
                'Research contributions in marketing domain',
                'Academic papers in progress',
                'Conference presentations'
            ],
            awards: [
                'NET Qualification',
                'Academic Excellence Recognition',
                'Research Scholar Status'
            ]
        },
        'anil': {
            name: 'Mr. Anil Yadav',
            position: 'Assistant Professor - Finance',
            email: 'anil@prutismedu.in',
            qualifications: 'M.Com in Finance, MBA in Finance, CFA Level 2 candidate, UGC NET qualified',
            expertise: 'Equity Valuations, Derivatives, Financial Modelling',
            image: '/static/images/default-profile.png',
            about: 'Mr. Anil Yadav has 7 years of teaching experience and 2 years in corporate sector specializing in Equity Research & Derivatives Valuation. He is a CFA Level 2 candidate and UGC NET qualified.',
            teachings: [
                'Equity Valuations',
                'Python for Finance',
                'Derivatives Valuation',
                'Financial Modelling',
                'Investment Analysis'
            ],
            publications: [
                'Research in Financial Markets',
                'Papers on Equity Valuation Methods',
                'Studies in Derivatives Trading'
            ],
            awards: [
                'UGC NET Qualification',
                'CFA Level 2 Candidacy',
                'Corporate Finance Excellence'
            ]
        },
        'brijesh': {
            name: 'Mr. Brijesh Poojari',
            position: 'Assistant Professor - Operations',
            email: 'brijesh.poojari@prutismkalyan.edu.in',
            qualifications: 'Master\'s in Management Studies (Welingkar Institute), Bachelor\'s in Engineering',
            expertise: 'Strategic Management, Project Management, Process Improvement, Operations Management & IT',
            image: '/static/images/default-profile.png',
            about: 'Mr. Brijesh Poojari brings 21+ years of experience in IT & Operations spanning both industry and teaching. He has worked with renowned organizations like Wipro, Cummins, and TATA Technologies.',
            teachings: [
                'Strategic Management',
                'Project Management',
                'Operations Management',
                'Process Improvement',
                'IT Management'
            ],
            publications: [
                'Strategic Management in IT Industry',
                'Process Improvement Methodologies',
                'Project Management Best Practices'
            ],
            awards: [
                'Industry Excellence at Wipro',
                'Process Innovation at Cummins',
                'Technology Leadership at TATA Technologies'
            ]
        },
        'diana': {
            name: 'Ms. Diana Fernandes',
            position: 'Assistant Professor - HR',
            email: 'diana@prutismkalyan.edu.in',
            qualifications: 'M.S.M in Human Resource Management (Pramod Ram Ujagar Tiwari Institute), M.Com (Accountancy & Finance), B.Com (Saket College)',
            expertise: 'Executive Talent Acquisition, Human Resources, Workplace Culture & Retention Techniques',
            image: '/static/images/default-profile.png',
            about: 'Ms. Diana Fernandes has 3 years of combined industry and academic experience. She specializes in Executive Talent Acquisition and Human Resources with focus on workplace culture and retention techniques.',
            teachings: [
                'Human Resource Management',
                'Talent Acquisition',
                'Workplace Culture',
                'Employee Retention',
                'Performance Management'
            ],
            publications: [
                'Studies in Talent Acquisition',
                'Research on Workplace Culture',
                'Employee Retention Strategies'
            ],
            awards: [
                'Excellence in HR Practices',
                'Talent Acquisition Specialist Recognition',
                'Academic Achievement Awards'
            ]
        },
        'samreen': {
            name: 'Ms. Samreen Patel',
            position: 'Assistant Professor - Finance',
            email: 'samreen.patel@prutismkalyan.edu.in',
            qualifications: 'Bachelor of Commerce (B.Com), Master\'s in Management Studies (Finance), Certified in Universal Human Values (UHV) and Financial Literacy',
            expertise: 'Finance, Universal Human Values, Financial Literacy, Corporate Training',
            image: '/static/images/default-profile.png',
            about: 'Ms. Samreen Patel is a dedicated academician and mentor with expertise in Finance and Universal Human Values. She conducts FDPs, corporate training, workshops, and knowledge-sharing sessions with passion for student learning and engagement.',
            teachings: [
                'Financial Management',
                'Universal Human Values',
                'Financial Literacy',
                'Investment Analysis',
                'Corporate Finance'
            ],
            publications: [
                'Research in Financial Literacy',
                'Studies on Universal Human Values',
                'Corporate Training Methodologies'
            ],
            awards: [
                'UHV Certification',
                'Financial Literacy Specialist',
                'Excellence in Student Engagement'
            ]
        }
    };

    function updateModalContent(facultyId) {
        const faculty = facultyData[facultyId];
        if (!faculty) {
            console.error('Faculty data not found for ID:', facultyId);
            return;
        }
        
        // Reset active tab to 'About'
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.tab-btn[data-tab="about"]').classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById('about').classList.add('active');
        
        // Update modal content
        document.getElementById('modalFacultyImage').src = faculty.image;
        document.getElementById('modalFacultyName').textContent = faculty.name;
        document.getElementById('modalFacultyPosition').textContent = faculty.position;
        document.getElementById('modalFacultyEmail').href = `mailto:${faculty.email}`;
        document.getElementById('modalFacultyEmail').textContent = faculty.email;
        document.getElementById('modalFacultyQualifications').textContent = faculty.qualifications;
        document.getElementById('modalFacultyExpertise').textContent = faculty.expertise;
        document.getElementById('modalFacultyAbout').textContent = faculty.about;

        // Update lists with clear formatting
        const teachingsList = document.getElementById('modalFacultyTeachings');
        teachingsList.innerHTML = faculty.teachings.map(item => `<li>${item}</li>`).join('');

        const publicationsList = document.getElementById('modalFacultyPublications');
        publicationsList.innerHTML = faculty.publications.map(item => `<li>${item}</li>`).join('');

        const awardsList = document.getElementById('modalFacultyAwards');
        awardsList.innerHTML = faculty.awards.map(item => `<li>${item}</li>`).join('');
    }

    // Click handlers for faculty members
    facultyMembers.forEach(member => {
        member.addEventListener('click', () => {
            const facultyId = member.dataset.facultyId;
            updateModalContent(facultyId);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Modal close handlers
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Tab switching functionality
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;
            
            // Remove active class from all buttons and content
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tab).classList.add('active');
        });
    });
});
