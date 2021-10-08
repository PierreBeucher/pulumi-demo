import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export class PulumiExample extends pulumi.ComponentResource {
  constructor(name: string, args: any, opts? : pulumi.ComponentResourceOptions) {
    super("crafteo:PulumiExample", name, {}, opts);

    const fqdn = args.fqdn

    // Retrieve a recent Ubuntu AMI
    // 099720109477 is the owner of Ubuntu Cloud Image user on AWS 
    // see https://ubuntu.com/server/docs/cloud-images/amazon-ec2
    const ubuntuAmi = aws.ec2.getAmi({
      mostRecent: true,
      filters: [
          {
              name: "name",
              values: ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"],
          },
          {
              name: "virtualization-type",
              values: ["hvm"],
          },
      ],
      owners: ["099720109477"],
    });

    // Create a key pair to connect to our instance
    const keyPair = new aws.ec2.KeyPair(`keyPair-${name}`, {
      publicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCv4XL9DyTk2h9NyaGdDaCN92938KA94E5xLBXOV3b4PDPLGsvXBO2PQoRSR2A1d1476uuJMCfcw6w00g2++L2S6LFqECHA+61xEaijnysZga3LPfaigHl9BGZtrpR8Oz9xB4mpmiDMVpJEnOLD+tNw+bQxqMzBuxUD9SpFJNDZVf8Pd98IJKKrMdlzqprIEJ83ogESUSHI8w63m6x+XG18yXuZlMX9BmQnqodeJLOCyU9cZNxLzpOs6zlHkx7G+mEuDLMGtQPHT6WYBozzqqmgEjWQGclLY3LDH+ERLmyDCuDU0b5DQpJciIDVYoNfQrxo0U95AugiZIEqqUv41jo5vS3mzklwXyVSnK5ca9yv+JRYfN1yim+71Ku/uTnvcDrGbnfGF8GvzGSu4tyeTsAU4zGeGsTzEilIqY0MBf85KxqAKuof81WEasK6mmH2JGZldbinerZIKKVr0qkiJY/L/lFOA295AiiAOM7XExvq2MFBmJslMsmi1CDddJromyc= pbeucher@pbeucher"
    });

    // Create an EC2 instance
    const ec2Instance = new aws.ec2.Instance(`ec2Instance-${name}`, {
      ami: ubuntuAmi.then(ami => ami.id),
      instanceType: "t3.nano",
      tags: {
          Name: "MyEC2Instance",
      },
      keyName: keyPair.keyName
    });

    // Retrieve an existing Route53 Hosted Zone
    // And attach our instance public IP to a DNS record via Route53
    const hostedZone = aws.route53.getZone({ name: "devops.crafteo.io." })

    const route53Record = new aws.route53.Record(`route53Record-${name}`, {
      zoneId: hostedZone.then(hz => hz.id),
      name: fqdn,
      type: "A",
      ttl: 30,
      records: [ec2Instance.publicIp],
    });

  }
}