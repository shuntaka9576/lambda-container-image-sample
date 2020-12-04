import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as ecr from "@aws-cdk/aws-ecr";
import { Role, ServicePrincipal, ManagedPolicy } from "@aws-cdk/aws-iam";

export class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stageName: string = this.node.tryGetContext("stageName");
    const env: { repositoryArn: string } = this.node.tryGetContext(stageName);

    const sampleNodeAppRepository = ecr.Repository.fromRepositoryArn(
      this,
      id,
      env.repositoryArn
    );

    const execLambdaRole = new Role(this, "execRole", {
      roleName: `${stageName}lambdaExecRole`,
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });

    new lambda.Function(this, "aLambda", {
      code: lambda.Code.fromEcrImage(sampleNodeAppRepository, {
        cmd: ["/functions/a/index.handler"],
        tag: "latest",
        entrypoint: ["/lambda-entrypoint.sh"],
      }),
      role: execLambdaRole,
      functionName: `${stageName}-a-lambda`,
      runtime: lambda.Runtime.FROM_IMAGE,
      handler: lambda.Handler.FROM_IMAGE,
      timeout: cdk.Duration.seconds(10),
    });

    new lambda.Function(this, "bLambda", {
      code: lambda.Code.fromEcrImage(sampleNodeAppRepository, {
        cmd: ["/functions/b/index.handler"],
        tag: "latest",
        entrypoint: ["/lambda-entrypoint.sh"],
      }),
      role: execLambdaRole,
      functionName: `${stageName}-b-lambda`,
      runtime: lambda.Runtime.FROM_IMAGE,
      handler: lambda.Handler.FROM_IMAGE,
      timeout: cdk.Duration.seconds(10),
    });
  }
}
