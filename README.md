# Pulumi demo

Demo comparing a Pulumi stack with CloudFormation equivalent

Pulumi usage:

```
# pulumi new aws-typescript
# ssh-keygen -f ./sshkey
pulumi up -y 
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