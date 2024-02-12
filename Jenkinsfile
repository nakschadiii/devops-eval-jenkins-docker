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
				script {
	                docker.build('7b7ca01d3b6894691a7a1a0605d3e49aa1364f5c34775c335d38ae65c18418a9')
				}
            }
        }
    }
}