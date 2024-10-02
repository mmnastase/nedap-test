# nedap-test

rsync -avz --exclude 'backend\node_modules' --exclude --exclude 'frontend\node_modules' '.git' --exclude '.env' \
-e "ssh -i ~/Downloads/marius-france-mac.pem" \
. ubuntu@ec2-16-171-44-154.eu-north-1.compute.amazonaws.com:~/app