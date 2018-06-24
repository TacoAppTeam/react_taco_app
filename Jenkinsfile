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
    }

    stages{
        stage("Upload"){
            when { branch "master" } 
            steps {
                echo 'Uploading....'
            }
        }
        stage("Deploy"){
            when { branch "master" }
            steps {
                echo 'Deploying....'
            }
        } 
    }
    
}