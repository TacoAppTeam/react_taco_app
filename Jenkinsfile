pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'make build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing, 123..'
            }
        }
        stage("Upload"){
            // when { branch "master" } 
            steps {
                sh 'sh ecr-login.sh'
                sh 'docker tag vws_taco_api:latest 084735579641.dkr.ecr.us-west-2.amazonaws.com/vws_taco_api:latest'
                sh 'docker push 084735579641.dkr.ecr.us-west-2.amazonaws.com/vws_taco_api:latest'
                sh 'docker tag vws_taco_ui:latest 084735579641.dkr.ecr.us-west-2.amazonaws.com/vws_taco_ui:latest'
                sh 'docker push 084735579641.dkr.ecr.us-west-2.amazonaws.com/vws_taco_ui:latest'
            }
        }
        stage("Deploy"){
            when { branch "master" }
            steps {
                sh 'ssh ec2-user@34.216.218.113 whoami'
            }
        } 
    }
    
}