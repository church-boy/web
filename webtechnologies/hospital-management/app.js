var app = angular.module('hospitalApp', []);

// Factory - Handles patient data operations
app.factory('PatientFactory', function($http) {
    var factory = {};
    
    factory.getPatients = function() {
        return $http.get('http://localhost:3000/api/patients')
            .then(function(response) {
                return response.data;
            });
    };

    factory.addPatient = function(patient) {
        return $http.post('http://localhost:3000/api/patients', patient);
    };

    factory.updatePatientStatus = function(patientId) {
        return $http.put('http://localhost:3000/api/patients/' + patientId);
    };

    return factory;
});

// Service - Handles hospital statistics
app.service('HospitalService', function() {
    this.calculateTotalPatients = function(patients) {
        return patients.length;
    };

    this.calculateActivePatients = function(patients) {
        return patients.filter(function(patient) {
            return patient.status === 'Active';
        }).length;
    };

    this.togglePatientStatus = function(patient) {
        patient.status = patient.status === 'Active' ? 'Discharged' : 'Active';
    };
});

// Filter - For searching patients
app.filter('patientFilter', function() {
    return function(patients, searchText) {
        if (!searchText) return patients;

        return patients.filter(function(patient) {
            searchText = searchText.toLowerCase();
            return patient.name.toLowerCase().includes(searchText) ||
                   patient.department.toLowerCase().includes(searchText);
        });
    };
});

// Controller
app.controller('HospitalController', function($scope, PatientFactory, HospitalService) {
    $scope.patients = [];
    $scope.newPatient = {};

    // Load initial patients
    function loadPatients() {
        PatientFactory.getPatients().then(function(data) {
            $scope.patients = data;
        });
    }

    loadPatients();

    $scope.addPatient = function() {
        if ($scope.newPatient.name && $scope.newPatient.age && $scope.newPatient.department) {
            PatientFactory.addPatient($scope.newPatient).then(function() {
                loadPatients();
                $scope.newPatient = {};
            });
        }
    };

    $scope.updateStatus = function(patient) {
        PatientFactory.updatePatientStatus(patient._id).then(function() {
            loadPatients();
        });
    };

    $scope.getTotalPatients = function() {
        return HospitalService.calculateTotalPatients($scope.patients);
    };

    $scope.getActivePatients = function() {
        return HospitalService.calculateActivePatients($scope.patients);
    };
});
