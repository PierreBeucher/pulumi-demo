import * as pulumi from "@pulumi/pulumi";
import { PulumiExample } from "./componentresource"

let config = new pulumi.Config();

const hostedZone = config.require("hostedzone")
const count = config.requireObject<number>("count")

console.log(`Using hosted zone: ${hostedZone} with ${count} instances`)

for (let i=1; i<=count; i++){
  new PulumiExample(`ec2Instance${i}`, {
    hostedZone: hostedZone,
    fqdn: `pulumi${i}.${hostedZone}`,
  })
}

