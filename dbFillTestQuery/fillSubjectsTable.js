var dataSet = [
    'Advanced Data Analytics',
    'Advanced Data Analytics Algorithms',
    'Advanced Database',
    'Advanced Image Synthesis Techniques',
    'Advanced Interaction Design',
    'Advanced Interaction Design',
    'Advanced Internet Programming',
    'Advanced Internet Programming',
    'Advanced Project Management',
    'Advanced Routing Principles',
    'Advanced Software Modelling',
    'Advanced Topics in Computer Networks',
    'Advances in Requirements Engineering',
    'Analytics Capstone Project',
    'Analytics Capstone Project B',
    'Application Development in the iOS Environment',
    'Application Development with .NET',
    'Applying Network Security',
    'Network Design',
    'Network Management',
    'Network Management',
    'Network Security',
    'Network Security Appliances',
    'Network Servers',
    'Networked Enterprise Architecture',
    'Networked Enterprise Design',
    'Networking Essentials'
];
module.exports = function(db){
    for (var i=0; i<dataSet.length; i++) {
        db.query('INSERT INTO subjects (title) ' +
            'VALUES(\''+ dataSet[i] + '\');',
            function (error, results, fields) {
                console.log(error);
            });
    }
};

