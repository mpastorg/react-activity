/*
Puedo separar nginx de la aplicacion vuejs o react?
*/
pipeline {
  agent any
  environment {
    ENV = 'pre'
    MPGHTTP_PORT = 32209
    MPGHTTPS_PORT = 32206
    RELEASE = '0.1'
    registry = "mpastorg/react-activity"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  stages {
    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
      steps {
        script {
          dockerImage = docker.build("mpastorg/react-activity:$RELEASE.$ENV.$BUILD_NUMBER")
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('prepare for kubernetes') {
      steps{
        sh "sed 's/MPGRELEASE.MPGENV.MPGBUILD_NUMBER/$RELEASE.$ENV.$BUILD_NUMBER/' react-deplo.yml > deplo_1.yml"
        sh "sed 's/MPGENV/pre/' deplo_1.yml > deplo_1b.yml"
        sh "sed 's/MPGHTTP_PORT/$MPGHTTP_PORT/' deplo_1b.yml > deplo_2c.yml"
        sh "sed 's/MPGHTTPS_PORT/$MPGHTTPS_PORT/' deplo_2c.yml > deplo_2d.yml"
      }
    }
    stage('SSH Into k8s Server') {
      steps{
        script{
            def remote = [:]
            remote.name = 'mpg4ras01'
            remote.host = 'mpg4ras01'
            remote.allowAnyHosts = true
            withCredentials([usernamePassword(credentialsId: 'mpgubumac01', usernameVariable: 'USERNAME'
            , passwordVariable: 'PASSWORD')])
            {
                remote.user = "$USERNAME"
                remote.password = "$PASSWORD"
                sshPut remote: remote, from: 'deplo_2d.yml', into: '.'
                sshCommand remote: remote, command: "kubectl apply -f deplo_2d.yml"
                sshRemove remote: remote, path: 'deplo_2d.yml'
            }
        }
      }
    }
  }
}
