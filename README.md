# Pulumi demo

Demo comparing a Pulumi stack with CloudFormation equivalent

Demo infrastructure:

```mermaid
graph LR
  HZ[Route53 Hosted Zone<br>devops.crafteo.io]
  DNS[DNS A Record<br>pulumi.devops.crafteo.io]
  EC2[EC2 Instance]
  SSH[SSH Key Pair]

  HZ-.-DNS
  DNS-->EC2
  EC2-.-SSH
```

Pulumi usage:

```
# Create new project
pulumi new aws-typescript --force

# Create ssh key
ssh-keygen -f ./sshkey

# Up stack
pulumi up -y 

# Access Pulumi website to see stack and backend
# https://app.pulumi.com/


```

CloudFormation usage:

```
aws cloudformation create-stack \
 --stack-name cloudformation-vs-pulumi \
 --template-body file://cloudformation.yml \
 --parameters='[
   {
    "ParameterKey": "HostedZone",
    "ParameterValue": "devops.crafteo.io."
  },
  {
    "ParameterKey": "KeyPair",
    "ParameterValue": "pulumi-vs-cf"
  }
 ]'
```