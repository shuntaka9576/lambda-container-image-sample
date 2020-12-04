#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";

import { EcrStack } from "../lib/cdk-ecr-stack";
import { LambdaStack } from "../lib/cdk-lambda-stack";

const app = new cdk.App();
const stageName = app.node.tryGetContext("stageName");

new EcrStack(app, `ecr`);
new LambdaStack(app, `${stageName}-lambdas`);
