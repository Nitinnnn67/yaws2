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
        'kavita': {
            name: 'Dr. Kavita R Laghate',
            position: 'Director / Professor',
            email: 'durkhan@college.edu',
            qualifications: 'Ph.D. in Management Studies',
            expertise: 'Human Resource Management, Organizational Behaviour',
            image: '/static/images/ceo.png',
            about: 'Dr. Kavita R Laghate has more than 9 years of teaching experience in the field of higher education. She started her career with Sydenham Institute of Management Studies, Mumbai as Faculty in HR. She is currently working as the Director at the institute.',
            teachings: [
                'Human Resource Management',
                'Organizational Behaviour',
                'Strategic HRM',
                'Performance Management System'
            ],
            publications: [
                'A Study on Association of Personality Traits with Graduation Stream and Specialization Choice of Management Students, 2018',
                'Study of impact of Personality Traits on Academic Performance of Management Students, 2018',
                'Gender Differences in Personality Traits in Relation to Academic Performance, 2020'
            ],
            awards: [
                'Best Professors in Human Resource Management by World HRD Congress, Mumbai in 2019',
                'Best Research Paper- Runner-Up award for research on Psychological well-being and gender differences, 2020'
            ]
        },
        'srinivasan': {
            name: 'Dr. Srinivasan R. Iyengar',
            position: 'Professor',
            email: 'srinivasan@college.edu',
            qualifications: 'Ph.D. in Management Studies, MBA',
            expertise: 'Strategic Management, Business Policy',
            image: '/static/images/faculty/prof1.jpg',
            about: 'Dr. Srinivasan R. Iyengar is an accomplished professor with extensive experience in strategic management and business policy. He has contributed significantly to the field through his research and teaching.',
            teachings: [
                'Strategic Management',
                'Business Policy',
                'Corporate Strategy',
                'International Business'
            ],
            publications: [
                'Strategic Management in Digital Era, 2023',
                'Corporate Strategy: A New Perspective, 2022',
                'Business Policy in Modern Organizations, 2021'
            ],
            awards: [
                'Excellence in Teaching Award, 2023',
                'Outstanding Research Contribution Award, 2022'
            ]
        },
        'chandrahauns': {
            name: 'Dr. Chandrahauns R. Chavan',
            position: 'Professor',
            email: 'chandrahauns@college.edu',
            qualifications: 'Ph.D. in Computer Science, M.Tech',
            expertise: 'Information Systems, Technology Management',
            image: '/static/images/faculty/prof2.jpg',
            about: 'Dr. Chandrahauns R. Chavan is a distinguished professor specializing in Information Systems and Technology Management. He brings vast industry experience to his academic role.',
            teachings: [
                'Information Systems Management',
                'Technology Strategy',
                'Digital Transformation',
                'IT Project Management'
            ],
            publications: [
                'Digital Transformation in Business Education, 2024',
                'Information Systems in Modern Organizations, 2023',
                'Technology Management: A Strategic Approach, 2022'
            ],
            awards: [
                'Best Technology Professor Award, 2024',
                'Innovation in Teaching Award, 2023'
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
