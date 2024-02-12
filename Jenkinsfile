pipeline {
	environment {}

    agent any
    
    stages {
        stage('Git checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                // Ajoutez ici vos tests de qualité de code si nécessaire
            }
        }
        
        stage('Deploy') {
            steps {
                // sh 'docker-compose up -d'
            }
        }
    }
}