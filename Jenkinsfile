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
            when { branch "master" } 
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
                withCredentials([sshUserPrivateKey(credentialsId: "tacoSharedKey", keyFileVariable: "keyfile")]) {
                    sh 'scp -i ${keyfile} docker-compose.yml centos@34.216.218.113:docker-compose.yml'
                    sh 'scp -i ${keyfile} ecr-login.sh centos@34.216.218.113:ecr-login.sh'
                    sh 'ssh -i ${keyfile} centos@34.216.218.113 sh ecr-login.sh'
                    sh 'ssh -i ${keyfile} centos@34.216.218.113 UI_IMAGE_NAME=084735579641.dkr.ecr.us-west-2.amazonaws.com/vws_taco_ui UI_IMAGE_TAG=latest API_IMAGE_NAME=084735579641.dkr.ecr.us-west-2.amazonaws.com/vws_taco_api API_IMAGE_TAG=latest docker-compose pull'
                    sh 'ssh -i ${keyfile} centos@34.216.218.113 UI_IMAGE_NAME=084735579641.dkr.ecr.us-west-2.amazonaws.com/vws_taco_ui UI_IMAGE_TAG=latest API_IMAGE_NAME=084735579641.dkr.ecr.us-west-2.amazonaws.com/vws_taco_api API_IMAGE_TAG=latest docker-compose down'
                    sh 'ssh -i ${keyfile} centos@34.216.218.113 UI_IMAGE_NAME=084735579641.dkr.ecr.us-west-2.amazonaws.com/vws_taco_ui UI_IMAGE_TAG=latest API_IMAGE_NAME=084735579641.dkr.ecr.us-west-2.amazonaws.com/vws_taco_api API_IMAGE_TAG=latest docker-compose up -d'
                }
            }
        }
    }
    
}