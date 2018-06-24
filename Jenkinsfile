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
        if(env.BRANCH_NAME == 'master'){
            stage("Upload"){
                steps {
                    echo 'Uploading....'
                }
            }
            stage("Deploy"){
                steps {
                    echo 'Deploying....'
                }
            }
        }
    }
}