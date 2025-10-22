pipeline {
    agent any
    
    environment {
        // Opcional: variables que quieras exponer
        REPO_URL = "git@github.com:Pucho1/Auth-List.git"
        NODE_ENV = "production"
        SCANNER_HOME = tool 'SonarScanner'   // nombre igual al configurado en Global Tool Configuration
    }
    
    stages{

        stage("Checkout"){
             // Paso git nativo de Jenkins
             // Solo clona o actualiza, sin borrar todo
             steps{
                 echo "📥 Clonando o actualizando el repositorio..."
                 git branch: "main",
                    credentialsId: "GitCredentials",
                    url: "${env.REPO_URL}"
             }
        }
        
        stage("Install Dependencies") {
            steps {
                echo "📦 Instalando dependencias del proyecto..."
                // npm ci es ideal para entornos de CI (más rápido y limpio que npm install)
                sh "npm ci || npm install"
            }
        }
        
        stage("Run Tests") {
            steps {
                echo "🧪 Ejecutando tests de React..."
                // Evita que jest quede esperando input
                sh "npm test -- --watchAll=false"
            }
            post {
                always {
                    echo "✅ Tests finalizados."
                    // Si usas jest-junit puedes publicar reportes aquí:
                    // junit "reports/junit/*.xml"
                }
            }
        }
        
        
        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        sh "${SCANNER_HOME}/bin/sonar-scanner"
                    }
                }
            }
        }
    
        stage("Triget Pipeline"){
             steps{
                 script{
                     build job: "trigered_job", parameters: [
                        string(name: "NOMBRE_PIPELINE", value: "$JOB_NAME"),
                        string(name: "ID_JOB", value: "$BUILD_ID")
                    ]
                 }
             }
        }
    }
}