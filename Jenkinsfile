pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('sonar-token-id')  // 🔐 ID du token stocké dans Jenkins
  }

  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/dhouhaBA/backendnew.git'
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
        withSonarQubeEnv('MySonarQube') {
          sh '''
            sonar-scanner \
              -Dsonar.projectKey=SelectIlLa_Backend \
              -Dsonar.sources=. \
              -Dsonar.host.url=http://localhost:9100 \
              -Dsonar.login=$SONAR_TOKEN
          '''
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
        sh 'sonar-scanner'

      }
    }
  }
}
