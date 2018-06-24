pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing, 123..'
            }
        }
        stage("Upload"){            
            steps {
                if(env.BRANCH_NAME == 'master'){
                    echo 'Uploading....'
                }
            }
        }
        stage("Deploy"){
            steps {
                if(env.BRANCH_NAME == 'master'){
                    echo 'Deploying....'
                }
            }
        }
    }
}