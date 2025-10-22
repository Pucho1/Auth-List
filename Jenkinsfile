pipeline{
    agent any
    environment{
        PROJECT_NAME="Test-hiberus-login"
        REPO_URL="https://github.com/Pucho1/Auth-List.git"
        SCANNER_HOME=tool 'SonarScanner' // Name of the SonarQube Scanner installation in Jenkins
    }

    stages{
        stage('Checkout'){
            steps{
                echo "📥 Clonando o actualizando el repositorio..."
                git branch: 'main',
                    credentialsId: 'GitCredentials',
                    url: "${REPO_URL}"
            }
        }

        stage('install dependencis'){
            steps{
                echo  "📦 Instalando dependencias del proyecto..."
                sh 'npm ci || npm install'
            }
        }

        stage('Run Tests'){
            steps{
                echo "🧪 Ejecutando pruebas unitarias..."
                sh 'npm test -- --WatchAll=false --coverage'
            }
        }


        stage('SonarQube Analysis'){
            steps{
                echo "🔍 Analizando el código con SonarQube..."
                withSonarQubeEnv('SonarQube'){ // Name of the SonarQube server configuration in Jenkins
                    sh "${SCANNER_HOME}/bin/sonar-scanner"
                }
            }
        }
    }
}