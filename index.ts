import * as aws from "@pulumi/aws";
import { PulumiExample } from "./componentresource"

new PulumiExample("ec2Instance1", {
  fqdn: "pulumi1.devops.crafteo.io",
})

new PulumiExample("ec2Instance2", {
  fqdn: "pulumi2.devops.crafteo.io",
})

new PulumiExample("ec2Instance3", {
  fqdn: "pulumi3.devops.crafteo.io",
})