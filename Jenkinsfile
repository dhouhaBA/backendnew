pipeline {
    agent any

    tools {
        nodejs 'node18'
    }
    environment {
        SONAR_PROJECT_KEY = 'My-Backend-Job'
        SONAR_SCANNER_HOME = 'sonarscanner'
        SONAR_TOKEN = credentials('sonar-token') // Doit correspondre à l'ID dans Jenkins
    }

    stages {


      stage('Checkout') {
      steps {
        echo 'Checking out source code...'
        checkout scm
      }
    }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }

       stage('SonarQube Analysis') {
            steps {
                // Correction clé : ajout de 'installationName' (configuré dans Jenkins)
                withSonarQubeEnv(installationName: 'sonarqube', credentialsId: 'sonar-token') {
                    sh """
                    
                     npm install -g sonar-scanner
                        sonar-scanner \
                            -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                            
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t selectilla-backend .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
