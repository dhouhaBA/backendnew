pipeline {
    agent any

    environment {
        SONAR_PROJECT_KEY = 'SelectIlLa_Backend' // Clé du projet SonarQube
        SONAR_SCANNER_HOME = 'sonarscanner' // Chemin vers le scanner SonarQube
        SONAR_TOKEN = credentials('sonar-token')  // 🔐 Token SonarQube (ID des credentials Jenkins)
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
                withSonarQubeEnv(credentialsId: 'sonar-token') {  // Utilise le même ID que SONAR_TOKEN
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