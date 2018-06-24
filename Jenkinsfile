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
            if(env.BRANCH_NAME == 'master'){
                steps {
                    echo 'Uploading....'
                }                
            }
        }
        stage("Deploy"){
            if(env.BRANCH_NAME == 'master'){
                steps {
                    echo 'Deploying....'
                }
            }
        }
    }
}