pipeline {
    agent any

    tools {
        nodejs 'node18' }
    environment {
        SONAR_PROJECT_KEY = 'SelectIlLa_Backend'
        SONAR_SCANNER_HOME = 'sonarscanner'
        SONAR_TOKEN = credentials('sonar-token') // Doit correspondre à l'ID dans Jenkins
    }

    stages {
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
                withSonarQubeEnv(installationName: 'SonarQube', credentialsId: 'sonar-token') {
                    sh """
                        sonar-scanner \
                            -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://localhost:9100 \
                            -Dsonar.login=${SONAR_TOKEN}
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