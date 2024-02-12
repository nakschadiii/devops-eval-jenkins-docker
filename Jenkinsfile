pipeline {
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

		stage('Build image') {
            steps {
                docker.build('dev')
            }
        }
    }
}