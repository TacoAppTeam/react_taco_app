#!/bin/bash -ex

aws_login=$(aws ecr get-login --region us-west-2 --no-include-email);
echo "Login is ${aws_login}"
# if echo "$aws_login" | grep -q -E '^docker login -u AWS -p \S{1092} -e none https://[0-9]{12}.dkr.ecr.\S+.amazonaws.com'; then $aws_login; fi
$aws_login