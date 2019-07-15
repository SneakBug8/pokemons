#!groovy

def remote = [:];
remote.host = "oreolek.ru";
remote.name = remote.host;
remote.allowAnyHosts = false;
remote.knownHosts = "/var/lib/jenkins/.ssh/known_hosts";

node {
  currentBuild.result = "SUCCESS";
  try {
    stage('Deploy'){
      def branch = env.BRANCH_NAME;
      if (branch == 'master') {
        withCredentials([sshUserPrivateKey(
          credentialsId: 'f8d69fad-cd63-43ca-8e4e-411f4cf8ac73',
          keyFileVariable: 'identity',
          passphraseVariable: 'passPhrase',
          usernameVariable: 'userName'
        )]) {
          echo 'Pull on web server';
          remote.user = userName;
          remote.passphrase = passPhrase;
          remote.identityFile = identity;
          sshCommand remote: remote, command:'cd /var/www/frontend-sos; git pull; pnpm install;pnpm run build';
        }
      }
    }
  }
  catch (err) {
    currentBuild.result = "FAILURE";

    emailext (
      subject: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
      <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
      recipientProviders: [developers()]
    );
    throw err;
  }
}
